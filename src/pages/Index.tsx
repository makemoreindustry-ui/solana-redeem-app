import { AppLayout } from "@/components/AppLayout";
import { RestakeHero } from "@/components/RestakeHero";
import { VaultCard } from "@/components/VaultCard";
import { vaults } from "@/data/vaults";

const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RestakeHero />

        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-foreground mb-5">
            Restaking Vaults
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
