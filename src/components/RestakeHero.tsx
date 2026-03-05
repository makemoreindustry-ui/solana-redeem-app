import { Lock } from "lucide-react";

export function RestakeHero() {
  return (
    <section className="relative py-12 px-2 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          STAKE TWICE,{" "}
          <span className="text-gradient-teal">EARN MORE.</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
          Maximize your yield by restaking across Solana's top validators and protocols. Earn compounding rewards with liquid restaking tokens.
        </p>

        <div className="inline-flex items-center gap-3 glass-card px-6 py-3">
          <Lock className="h-4 w-4 text-primary" />
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">
              Total Value Locked
            </p>
            <p className="font-display text-2xl font-bold text-foreground">
              $14.98M
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
