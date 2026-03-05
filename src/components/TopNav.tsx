import { SidebarTrigger } from "@/components/ui/sidebar";
import { CustomWalletButton } from "@/components/CustomWalletButton";

export function TopNav() {
  return (
    <header className="h-14 border-b border-border/50 flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
      <SidebarTrigger className="md:hidden text-muted-foreground" />
      <CustomWalletButton />
    </header>
  );
}
