
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { Headphones, Wallet } from 'lucide-react';

const Navbar = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // Simulating wallet connection
    setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      });
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
      variant: "destructive",
    });
  };

  return (
    <nav className="border-b border-border sticky top-0 z-20 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2 md:hidden" />
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-audiora-primary rounded-full flex items-center justify-center">
                  <Headphones size={18} className="text-audiora-dark" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent audio-gradient">Audiora</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full flex gap-2">
                    <span className="hidden sm:inline">0x8f...3a42</span>
                    <Avatar className="h-8 w-8 bg-muted">
                      <AvatarFallback className="text-xs bg-audiora-primary text-primary-foreground">AU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Transactions</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleConnectWallet} className="flex items-center gap-2">
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
