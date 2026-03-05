import fragsolLogo from "@/assets/fragsol-logo.png";
// placeholder: additional logos unavailable locally
// import fragjtoLogo from "@/assets/fragjto-logo.png";
// import fragbtcLogo from "@/assets/fragbtc-logo.png";
// import frag2Logo from "@/assets/frag2-logo.png";
// import fragswtchLogo from "@/assets/fragswtch-logo.png";

export interface Vault {
  id: string;
  name: string;
  tagline: string;
  tvl: string;
  apy: string;
  apyBreakdown: { label: string; value: string }[];
  supportedTokens: string[];
  rewards: string[];
  ctaLabel: string;
  logo?: string;
}

export const vaults: Vault[] = [
  {
    id: "fragsol",
    name: "fragSOL",
    tagline: "Solana liquid restaking",
    tvl: "$8.2M",
    apy: "8.4%",
    apyBreakdown: [
      { label: "Staking APY", value: "6.8%" },
      { label: "Restaking APY", value: "1.2%" },
      { label: "Points Boost", value: "0.4%" },
    ],
    supportedTokens: ["SOL", "mSOL", "jitoSOL"],
    rewards: ["FRAG", "SOL"],
    ctaLabel: "Restake SOL",
    logo: fragsolLogo,
  },
  {
    id: "fragjto",
    name: "fragJTO",
    tagline: "Jito restaking vault",
    tvl: "$2.1M",
    apy: "12.6%",
    apyBreakdown: [
      { label: "Staking APY", value: "7.2%" },
      { label: "Restaking APY", value: "3.8%" },
      { label: "Points Boost", value: "1.6%" },
    ],
    supportedTokens: ["JTO", "jitoSOL"],
    rewards: ["FRAG", "JTO"],
    ctaLabel: "Restake JTO",
    // logo: fragjtoLogo,
  },
  {
    id: "fragbtc",
    name: "fragBTC",
    tagline: "Bitcoin restaking on Solana",
    tvl: "$1.8M",
    apy: "5.2%",
    apyBreakdown: [
      { label: "Staking APY", value: "3.1%" },
      { label: "Restaking APY", value: "1.4%" },
      { label: "Points Boost", value: "0.7%" },
    ],
    supportedTokens: ["tBTC", "wBTC"],
    rewards: ["FRAG", "BTC"],
    ctaLabel: "Restake BTC",
    // logo: fragbtcLogo,
  },
  {
    id: "frag2",
    name: "FRAG²",
    tagline: "Double-staked FRAG governance",
    tvl: "$920K",
    apy: "22.1%",
    apyBreakdown: [
      { label: "Base APY", value: "10.5%" },
      { label: "Governance Boost", value: "8.2%" },
      { label: "Points Boost", value: "3.4%" },
    ],
    supportedTokens: ["FRAG"],
    rewards: ["FRAG", "xFRAG"],
    ctaLabel: "Restake FRAG",
    // logo: frag2Logo,
  },
  {
    id: "fragswtch",
    name: "fragSWTCH",
    tagline: "Switchboard restaking",
    tvl: "$540K",
    apy: "15.8%",
    apyBreakdown: [
      { label: "Staking APY", value: "9.3%" },
      { label: "Restaking APY", value: "4.1%" },
      { label: "Points Boost", value: "2.4%" },
    ],
    supportedTokens: ["SWTCH"],
    rewards: ["FRAG", "SWTCH"],
    ctaLabel: "Restake SWTCH",
    // logo: fragswtchLogo,
  },
  {
    id: "fragusdc",
    name: "fragUSDC",
    tagline: "Stable yield restaking",
    tvl: "$1.4M",
    apy: "9.7%",
    apyBreakdown: [
      { label: "Lending APY", value: "5.2%" },
      { label: "Restaking APY", value: "3.0%" },
      { label: "Points Boost", value: "1.5%" },
    ],
    supportedTokens: ["USDC", "USDT"],
    rewards: ["FRAG", "USDC"],
    ctaLabel: "Restake USDC",
  },
];
