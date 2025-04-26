
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { AudioWaveform, Users, Link2, Wallet, Mic2 } from 'lucide-react';
import AudioVisualizer from '@/components/audio/AudioVisualizer';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("platform");

  return (
    <Layout>
      <div className="space-y-12 pb-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20 text-center relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
            <AudioVisualizer />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent audio-gradient">Cross-Chain</span> Audio Platform
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground">
              Stake, earn, and bridge your music across multiple blockchains
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/explore')} size="lg" className="text-lg">
                Explore Music
              </Button>
              <Button onClick={() => navigate('/create')} variant="outline" size="lg" className="text-lg">
                Start Creating
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How Audiora Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing the audio industry with blockchain technology
            </p>
          </div>

          <Tabs defaultValue="platform" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="platform">Cross-Chain Platform</TabsTrigger>
              <TabsTrigger value="community">Community DAOs</TabsTrigger>
              <TabsTrigger value="creators">For Creators</TabsTrigger>
            </TabsList>
            <TabsContent value="platform" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={<Link2 className="h-10 w-10 text-audiora-primary" />}
                  title="Cross-Chain Bridge" 
                  description="Transfer your audio assets and AUDIORA tokens across multiple blockchain networks seamlessly."
                />
                <FeatureCard 
                  icon={<AudioWaveform className="h-10 w-10 text-audiora-primary" />}
                  title="Audio Staking" 
                  description="Stake your music to earn AUDIORA tokens while your content generates value across platforms."
                />
                <FeatureCard 
                  icon={<Wallet className="h-10 w-10 text-audiora-primary" />}
                  title="Dynamic Yield" 
                  description="Route earnings automatically to maximize returns across different blockchain ecosystems."
                />
              </div>
              <div className="text-center mt-6">
                <Button onClick={() => navigate('/cross-chain')} variant="outline">
                  Learn about Cross-Chain Features
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="community" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={<Users className="h-10 w-10 text-audiora-primary" />}
                  title="Audio DAOs" 
                  description="Form decentralized autonomous organizations around music genres or artist collectives."
                />
                <FeatureCard 
                  icon={<AudioWaveform className="h-10 w-10 text-audiora-primary" />}
                  title="Group Staking" 
                  description="Pool resources with other fans and creators to generate higher yields through collective staking."
                />
                <FeatureCard 
                  icon={<Link2 className="h-10 w-10 text-audiora-primary" />}
                  title="Cross-Chain Governance" 
                  description="Vote on proposals and manage community assets across multiple blockchain networks."
                />
              </div>
              <div className="text-center mt-6">
                <Button onClick={() => navigate('/community-daos')} variant="outline">
                  Explore Community DAOs
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="creators" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard 
                  icon={<Mic2 className="h-10 w-10 text-audiora-primary" />}
                  title="Social Rewards" 
                  description="Lock rewards behind social actions and pay out listeners and promoters from bounty pools."
                />
                <FeatureCard 
                  icon={<AudioWaveform className="h-10 w-10 text-audiora-primary" />}
                  title="Creator Earnings" 
                  description="Earn AUDIORA tokens directly from listeners, without intermediaries taking large cuts of your revenue."
                />
                <FeatureCard 
                  icon={<Users className="h-10 w-10 text-audiora-primary" />}
                  title="Fan Communities" 
                  description="Build and engage with your own community of supporters through token-gated exclusive content."
                />
              </div>
              <div className="text-center mt-6">
                <Button onClick={() => navigate('/create')} variant="outline">
                  Start Creating
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* CTA Section */}
        <section className="py-12 rounded-2xl overflow-hidden relative bg-gradient-to-r from-audiora-secondary to-audiora-primary">
          <div className="absolute inset-0 opacity-10 bg-audio-pattern"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Transform Your Audio Experience?</h2>
            <p className="text-lg mb-8 text-white/80">
              Join thousands of creators and listeners already using Audiora to engage with music in a whole new way.
            </p>
            <Button onClick={() => navigate('/explore')} size="lg" variant="secondary" className="text-audiora-primary font-semibold">
              Get Started Now
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="bg-card/50 hover:bg-card/80 transition-all border-audiora-secondary/20">
    <CardContent className="p-6 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default Index;
