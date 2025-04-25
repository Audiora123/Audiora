
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Wallet as WalletIcon, ArrowUp, ArrowDown, Download, Copy, RefreshCw } from 'lucide-react';

const Wallet = () => {
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
  
  const handleCopyAddress = () => {
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard.",
    });
  };
  
  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: "Your AUDIORA tokens are being withdrawn to your wallet.",
    });
  };
  
  if (!isConnected) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <WalletIcon className="h-16 w-16 text-audiora-primary mb-6" />
          <h1 className="text-3xl font-bold mb-3">Connect Your Wallet</h1>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Connect your wallet to view your balance, withdraw tokens, and manage your audio assets
          </p>
          <Button onClick={handleConnectWallet} size="lg" className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            Connect Wallet
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground mt-1">Manage your AUDIORA tokens and assets</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Connected</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyAddress} className="flex items-center gap-2">
              <span className="text-xs">0x8f...3a42</span>
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-3">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-audiora-primary/20 flex items-center justify-center">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEyIDE0LjVDMTAuNjIgMTQuNSA5LjUgMTMuMzggOS41IDEyQzkuNSAxMC42MiAxMC42MiA5LjUgMTIgOS41QzEzLjM4IDkuNSAxNC41IDEwLjYyIDE0LjUgMTJDMTQuNSAxMy4zOCAxMy4zOCAxNC41IDEyIDE0LjVaIiBmaWxsPSIjOWI4N2Y1Ii8+PC9zdmc+" alt="AUDI" className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <h2 className="text-3xl font-bold">475.32 AUDIORA</h2>
                    <p className="text-sm text-muted-foreground mt-1">≈ $2,376.60 USD</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowDown className="h-4 w-4" />
                    Deposit
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4" />
                    Send
                  </Button>
                  <Button onClick={handleWithdraw} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Network Balances</CardTitle>
              <CardDescription>
                Your AUDIORA tokens across chains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(chainBalances).map(([chain, balance]) => (
                  <div key={chain} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: networks[chain].color }}
                      ></div>
                      <span>{networks[chain].name}</span>
                    </div>
                    <span className="font-medium">{balance} AUDI</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex justify-center">
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="h-3.5 w-3.5 mr-2" />
                  Refresh Balances
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>
                Recent transactions and rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="rewards">Rewards</TabsTrigger>
                  <TabsTrigger value="staking">Staking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transactions" className="space-y-4">
                  <EmptyState 
                    title="No transactions yet" 
                    description="Your transaction history will appear here"
                    icon={
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    }
                  />
                </TabsContent>
                
                <TabsContent value="rewards" className="space-y-4">
                  <EmptyState 
                    title="No rewards yet" 
                    description="Earn rewards by staking your audio and participating in the Audiora ecosystem"
                    icon={
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                </TabsContent>
                
                <TabsContent value="staking" className="space-y-4">
                  <EmptyState 
                    title="No staking activity" 
                    description="Stake your AUDIORA tokens to earn rewards"
                    icon={
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

const EmptyState = ({ title, description, icon }) => (
  <div className="text-center py-12">
    <div className="mx-auto text-muted-foreground mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
      {description}
    </p>
  </div>
);

const networks = {
  ethereum: {
    name: "Ethereum",
    color: "#627EEA"
  },
  polygon: {
    name: "Polygon",
    color: "#8247E5"
  },
  arbitrum: {
    name: "Arbitrum",
    color: "#12AAFF"
  },
  optimism: {
    name: "Optimism",
    color: "#FF0420"
  },
  solana: {
    name: "Solana",
    color: "#14F195"
  }
};

const chainBalances = {
  ethereum: 325,
  polygon: 75.32,
  arbitrum: 50,
  optimism: 25,
  solana: 0
};

export default Wallet;
