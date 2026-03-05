import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface CustomWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WALLET_ICONS: Record<string, string> = {
  Phantom: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg',
  Solflare: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg',
};

export const CustomWalletModal: React.FC<CustomWalletModalProps> = ({ open, onOpenChange }) => {
  const { wallets, select } = useWallet();
  const [hardwareWallet, setHardwareWallet] = React.useState(false);

  const recommendedWallets = wallets.filter(
    (w) => w.adapter.name === 'Phantom' || w.adapter.name === 'Solflare'
  );

  const handleSelect = (walletName: WalletName) => {
    select(walletName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-sm border-border/30 p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-5 pb-0">
          <DialogTitle className="text-sm font-bold tracking-widest uppercase text-foreground">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="sr-only">Select a wallet to connect</DialogDescription>
        </DialogHeader>

        {/* Recommended label */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            Recommended Wallets
          </div>
        </div>

        {/* Wallet list */}
        <div className="px-3 pb-2 flex flex-col gap-1">
          {recommendedWallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => handleSelect(wallet.adapter.name as WalletName)}
              className="flex items-center gap-3 w-full rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
            >
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                className="w-8 h-8 rounded-lg"
              />
              {wallet.adapter.name}
            </button>
          ))}
        </div>

        {/* More wallets */}
        <div className="px-3 pb-3">
          <button className="w-full rounded-lg py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors border border-border/40">
            More Wallets
          </button>
        </div>
        {/* Hardware Wallet toggle */}
        <div className="px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Hardware Wallet</span>
          <Switch checked={hardwareWallet} onCheckedChange={setHardwareWallet} />
        </div>

        {/* Footer */}
        <div className="border-t border-border/30 px-5 py-3 text-center text-[11px] text-muted-foreground">
          By connecting, you agree to the{' '}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
