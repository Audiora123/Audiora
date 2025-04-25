
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Link2 } from 'lucide-react';

const CrossChain = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleBridgeTokens = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to bridge.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Tokens Bridged",
        description: `Successfully bridged ${amount} AUDIORA from ${networks[fromChain].name} to ${networks[toChain].name}.`,
      });
      setAmount('');
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Cross-Chain Bridge</h1>
          <p className="text-muted-foreground mt-1">Move your audio assets and tokens across blockchains</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bridge AUDIORA Tokens</CardTitle>
                <CardDescription>
                  Move your tokens between supported blockchains
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from-chain">From Chain</Label>
                    <Select value={fromChain} onValueChange={setFromChain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(networks).map((network) => (
                          <SelectItem 
                            key={network} 
                            value={network}
                            disabled={network === toChain}
                          >
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: networks[network].color }}
                              ></div>
                              {networks[network].name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Balance: 325 AUDIORA
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="to-chain">To Chain</Label>
                    <Select value={toChain} onValueChange={setToChain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(networks).map((network) => (
                          <SelectItem 
                            key={network} 
                            value={network}
                            disabled={network === fromChain}
                          >
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: networks[network].color }}
                              ></div>
                              {networks[network].name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Balance: 150 AUDIORA
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center my-4">
                  <div className="rounded-full border border-border w-10 h-10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button variant="outline" onClick={() => setAmount('325')}>Max</Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-border bg-card/50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bridge Fee</span>
                    <span>0.1% (0.325 AUDIORA)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Gas</span>
                    <span>~0.002 ETH</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>You Will Receive</span>
                    <span>{amount ? (parseFloat(amount) * 0.999).toFixed(3) : '0'} AUDIORA</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleBridgeTokens} 
                  className="w-full"
                  disabled={!amount || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Bridge Tokens"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Supported Networks</CardTitle>
                <CardDescription>
                  Audiora supports multiple blockchain networks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(networks).map((network) => (
                  <div key={network} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: networks[network].color }}
                    ></div>
                    <div>
                      <p className="font-medium">{networks[network].name}</p>
                      <p className="text-xs text-muted-foreground">{networks[network].status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground text-center w-full">
                  More networks coming soon
                </p>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EmptyTransactions />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* How it works section */}
        <div className="border border-border rounded-lg p-6 bg-card/50 mt-10">
          <h2 className="text-2xl font-semibold mb-4">How Cross-Chain Audio Works</h2>
          <p className="text-muted-foreground mb-6">
            Audiora uses advanced cross-chain technology to enable seamless movement of audio assets and tokens
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <Link2 className="h-6 w-6 text-audiora-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Bridge Assets</h3>
              <p className="text-muted-foreground">Move your audio NFTs and AUDIORA tokens between supported blockchains</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-audiora-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Dynamic Yield Routing</h3>
              <p className="text-muted-foreground">Automatically direct your earnings to the highest yielding chains</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-audiora-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Multi-Chain Presence</h3>
              <p className="text-muted-foreground">Reach more listeners by having your content available across multiple ecosystems</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const EmptyTransactions = () => (
  <div className="text-center py-6">
    <svg className="h-12 w-12 mx-auto text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <h3 className="font-medium mb-1">No Recent Transactions</h3>
    <p className="text-sm text-muted-foreground">
      Your cross-chain transactions will appear here
    </p>
  </div>
);

const networks = {
  ethereum: {
    name: "Ethereum",
    color: "#627EEA",
    status: "Fully Supported"
  },
  polygon: {
    name: "Polygon",
    color: "#8247E5",
    status: "Fully Supported"
  },
  arbitrum: {
    name: "Arbitrum",
    color: "#12AAFF",
    status: "Fully Supported"
  },
  optimism: {
    name: "Optimism",
    color: "#FF0420",
    status: "Fully Supported"
  },
  solana: {
    name: "Solana",
    color: "#14F195",
    status: "Limited Support"
  },
  avalanche: {
    name: "Avalanche",
    color: "#E84142",
    status: "Coming Soon"
  },
};

export default CrossChain;
