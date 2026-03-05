import {
  Layers,
  ArrowUpFromLine,
  BadgeDollarSign,
  Gift,
  TrendingUp,
  RefreshCw,
  Gem,
  BarChart3,
} from "lucide-react";
import fragmetricLogo from "@/assets/fragmetric-logo.png";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Restake", url: "/", icon: Layers },
  { title: "Unstake", url: "/unstake", icon: ArrowUpFromLine },
  { title: "Redeem", url: "/redeem", icon: BadgeDollarSign },
  { title: "Rewards", url: "/rewards", icon: Gift },
  { title: "DeFi", url: "/defi", icon: TrendingUp },
  { title: "Wrap", url: "/wrap", icon: RefreshCw },
  { title: "FRAG²", url: "/frag2", icon: Gem },
  { title: "FragStats", url: "/stats", icon: BarChart3 },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={fragmetricLogo} alt="Fragmetric" className="h-6 w-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold tracking-wider text-foreground">
              FRAGMETRIC
            </span>
            <span className="text-[10px] font-medium tracking-widest text-primary uppercase">
              Restake
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/60 transition-colors"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-[10px] text-muted-foreground text-center">
          © 2026 Fragmetric
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
