
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { AudioWaveform, Community, Link2, Mic, Users, Volume2, Wallet } from 'lucide-react';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Home",
    icon: AudioWaveform,
    path: "/"
  },
  {
    title: "Explore",
    icon: Volume2,
    path: "/explore"
  },
  {
    title: "Create",
    icon: Mic,
    path: "/create"
  },
  {
    title: "Community DAOs",
    icon: Community,
    path: "/community-daos"
  },
  {
    title: "Cross-Chain Bridge",
    icon: Link2,
    path: "/cross-chain"
  },
  {
    title: "Wallet",
    icon: Wallet,
    path: "/wallet"
  },
];

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <SidebarComponent>
      <div className="hidden md:block h-16 border-b border-border flex-shrink-0 px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-audiora-primary rounded-full flex items-center justify-center">
            <AudioWaveform size={18} className="text-audiora-dark" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent audio-gradient">Audiora</span>
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-2", 
                      location.pathname === item.path && "text-audiora-primary"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Featured DAOs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/community-daos/electronic" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Electronic Collective</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/community-daos/jazz" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Jazz Innovators</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/community-daos/hiphop" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Hip Hop United</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
