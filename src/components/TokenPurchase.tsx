import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from '../hooks/use-toast';
import { ArrowDown } from 'lucide-react';

const EXCHANGE_RATE = 1.0247;

// simple token purchase / redemption UI reused on Redeem page
export const TokenPurchase: React.FC = () => {
  const { connected } = useWallet();
  const [amount, setAmount] = useState('');

  const estimatedOutput = amount ? (parseFloat(amount) * EXCHANGE_RATE).toFixed(6) : '0.00';

  const handleRedeem = () => {
    if (!connected) {
      toast({ title: 'Wallet not connected', description: 'Please connect your wallet first.', variant: 'destructive' });
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast({ title: 'Invalid amount', description: 'Enter a valid amount to redeem.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Redemption initiated', description: `Redeeming ${amount} fragSOL for ~${estimatedOutput} SOL` });
  };

  return (
    <div className="space-y-6">
      {/* From */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">You redeem</label>
        <div className="flex items-center gap-3 rounded-lg bg-secondary/60 px-4 py-3">
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-0 bg-transparent text-lg font-semibold text-foreground placeholder:text-muted-foreground focus-visible:ring-0 p-0 h-auto"
          />
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">fragSOL</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Balance: 0.00 fragSOL</p>
      </div>

      <div className="flex justify-center">
        <div className="rounded-full bg-secondary p-2">
          <ArrowDown className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* To */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-2 block">You receive</label>
        <div className="flex items-center gap-3 rounded-lg bg-secondary/60 px-4 py-3">
          <span className="text-lg font-semibold text-foreground flex-1">{estimatedOutput}</span>
          <span className="text-sm font-medium text-muted-foreground">SOL</span>
        </div>
      </div>

      {/* Rate */}
      <div className="flex justify-between text-xs text-muted-foreground border-t border-border/40 pt-3">
        <span>Exchange Rate</span>
        <span>1 fragSOL ≈ {EXCHANGE_RATE} SOL</span>
      </div>

      <Button onClick={handleRedeem} className="w-full" size="lg">
        {connected ? 'Redeem' : 'Connect Wallet to Redeem'}
      </Button>
    </div>
  );
};
