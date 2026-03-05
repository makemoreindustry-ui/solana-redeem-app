import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { CustomWalletModal } from './CustomWalletModal';

export const CustomWalletButton: React.FC = () => {
  const { connected, publicKey, connecting, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (!connected) {
      setModalOpen(true);
    }
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    disconnect();
  };

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : '';

  return (
    <div>
      {!connected ? (
        <button onClick={handleClick} className="connect-wallet-btn">
          {connecting ? (
            <>
              <span className="spinner" />
              Connecting...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
              Connect Wallet
            </>
          )}
        </button>
      ) : (
        <div className="connected-wallet">
          <button className="wallet-address-btn" onClick={copyAddress}>
            <span className="address-dot" />
            {formattedAddress}
            <span className="copy-icon">{copied ? '✓' : '📋'}</span>
          </button>
          <button className="disconnect-btn" onClick={handleDisconnect}>
            ✕
          </button>
        </div>
      )}

      <CustomWalletModal open={modalOpen} onOpenChange={setModalOpen} />

      <style>{`
        .connect-wallet-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid hsl(var(--primary) / 0.3);
          background: transparent;
          color: hsl(var(--primary));
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .connect-wallet-btn:hover {
          background: hsl(var(--primary) / 0.1);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid hsl(var(--primary) / 0.3);
          border-top-color: hsl(var(--primary));
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .connected-wallet {
          display: flex;
          align-items: center;
          gap: 8px;
          background: hsl(var(--card));
          border-radius: 12px;
          padding: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .wallet-address-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: hsl(var(--muted));
          border: none;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: hsl(var(--foreground));
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .wallet-address-btn:hover {
          background: hsl(var(--accent));
        }

        .address-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          display: inline-block;
        }

        .copy-icon {
          font-size: 14px;
          margin-left: 4px;
        }

        .disconnect-btn {
          background: hsl(var(--muted));
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: hsl(var(--muted-foreground));
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .disconnect-btn:hover {
          background: hsl(var(--destructive) / 0.1);
          color: hsl(var(--destructive));
        }
      `}</style>
    </div>
  );
};
