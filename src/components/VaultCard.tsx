import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Vault } from "@/data/vaults";

interface VaultCardProps {
  vault: Vault;
}

export function VaultCard({ vault }: VaultCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card p-5 flex flex-col gap-4 hover:border-primary/30 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            {vault.name}
          </h3>
          <p className="text-xs text-muted-foreground">{vault.tagline}</p>
        </div>
        {vault.logo ? (
          <img src={vault.logo} alt={vault.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-xs font-bold shrink-0">
            {vault.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">TVL</p>
          <p className="font-display text-lg font-semibold text-foreground">{vault.tvl}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">APY</p>
          <p className="font-display text-lg font-semibold text-primary">{vault.apy}</p>
        </div>
      </div>

      {/* Supported tokens */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
          Supported Tokens
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {vault.supportedTokens.map((token) => (
            <span
              key={token}
              className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium"
            >
              {token}
            </span>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
          Rewards
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {vault.rewards.map((r) => (
            <span
              key={r}
              className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* APY Breakdown */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        APY Breakdown
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {expanded && (
        <div className="flex flex-col gap-1.5 pl-1">
          {vault.apyBreakdown.map((item) => (
            <div key={item.label} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="text-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <Button className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold tracking-wide">
        {vault.ctaLabel}
      </Button>
    </div>
  );
}
