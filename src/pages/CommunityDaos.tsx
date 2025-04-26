import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AudioLines, Users, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CommunityDaos = () => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState('');
  
  const handleJoinDao = (daoName: string) => {
    toast({
      title: "DAO Joined",
      description: `You have successfully joined the ${daoName} DAO.`,
    });
  };
  
  const handleCreateDao = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Community DAOs</h1>
            <p className="text-muted-foreground mt-1">Form DAOs and restake audio as a group</p>
          </div>
          <Button onClick={handleCreateDao} className="w-full md:w-auto">
            <Users className="mr-2 h-4 w-4" />
            Create New DAO
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search for DAOs..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* DAO Categories */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="highest-yield">Highest Yield</TabsTrigger>
            <TabsTrigger value="your-daos">Your DAOs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daosList.slice(0, 6).map((dao, index) => (
                <DaoCard 
                  key={index}
                  name={dao.name}
                  description={dao.description}
                  members={dao.members}
                  staked={dao.staked}
                  apy={dao.apy}
                  backgroundImage={dao.backgroundImage}
                  onJoin={() => handleJoinDao(dao.name)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="newest" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daosList.slice(3, 9).map((dao, index) => (
                <DaoCard 
                  key={index}
                  name={dao.name}
                  description={dao.description}
                  members={dao.members}
                  staked={dao.staked}
                  apy={dao.apy}
                  backgroundImage={dao.backgroundImage}
                  onJoin={() => handleJoinDao(dao.name)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="highest-yield" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...daosList].sort((a, b) => b.apy - a.apy).slice(0, 6).map((dao, index) => (
                <DaoCard 
                  key={index}
                  name={dao.name}
                  description={dao.description}
                  members={dao.members}
                  staked={dao.staked}
                  apy={dao.apy}
                  backgroundImage={dao.backgroundImage}
                  onJoin={() => handleJoinDao(dao.name)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="your-daos" className="mt-6">
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium mb-2">No DAOs Joined Yet</h3>
              <p className="text-muted-foreground mb-6">Join a DAO to see it listed here</p>
              <Button onClick={() => document.querySelector('[value="trending"]')?.dispatchEvent(new Event('click'))}>
                Explore DAOs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Feature Explanation */}
        <div className="border border-border rounded-lg p-6 bg-card/50 mt-10">
          <h2 className="text-2xl font-semibold mb-4">How Cross-Chain DAO Staking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-audiora-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Join a DAO</h3>
              <p className="text-muted-foreground">Connect with like-minded audio enthusiasts and join a community DAO</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <AudioLines className="h-6 w-6 text-audiora-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Group Staking</h3>
              <p className="text-muted-foreground">Pool your AUDIORA tokens with the community to earn higher yields</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-audiora-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Cross-Chain Benefits</h3>
              <p className="text-muted-foreground">DAOs can move rewards across chains to maximize yields</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface DaoCardProps {
  name: string;
  description: string;
  members: number;
  staked: string;
  apy: number;
  backgroundImage: string;
  onJoin: () => void;
}

const DaoCard = ({ name, description, members, staked, apy, backgroundImage, onJoin }: DaoCardProps) => {
  return (
    <Card className="overflow-hidden border-audiora-secondary/20 hover:border-audiora-primary/50 transition-all">
      <div 
        className="h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <p className="text-muted-foreground">Members</p>
            <p className="font-medium">{members}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Staked</p>
            <p className="font-medium">{staked}</p>
          </div>
          <div>
            <p className="text-muted-foreground">APY</p>
            <p className="font-medium text-audiora-primary">{apy}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onJoin} className="w-full">Join DAO</Button>
      </CardFooter>
    </Card>
  );
};

const daosList = [
  {
    name: "Electronic Collective",
    description: "Community of electronic music producers and fans",
    members: 1458,
    staked: "245K AUDI",
    apy: 18.5,
    backgroundImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Jazz Innovators",
    description: "Supporting jazz musicians and new compositions",
    members: 872,
    staked: "183K AUDI",
    apy: 15.2,
    backgroundImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Hip Hop United",
    description: "Promoting hip hop artists and culture globally",
    members: 3240,
    staked: "412K AUDI",
    apy: 21.7,
    backgroundImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Indie Rock Alliance",
    description: "Supporting independent rock bands and venues",
    members: 967,
    staked: "156K AUDI",
    apy: 14.8,
    backgroundImage: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Classical Ensemble",
    description: "Preserving and promoting classical music compositions",
    members: 581,
    staked: "210K AUDI",
    apy: 16.3,
    backgroundImage: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Future Bass Collective",
    description: "Pushing the boundaries of future bass and electronic music",
    members: 1205,
    staked: "192K AUDI",
    apy: 19.4,
    backgroundImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Folk Traditions",
    description: "Celebrating folk music from around the world",
    members: 723,
    staked: "118K AUDI",
    apy: 13.2,
    backgroundImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Ambient Soundscapes",
    description: "Creating and sharing ambient and atmospheric music",
    members: 495,
    staked: "87K AUDI",
    apy: 12.8,
    backgroundImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Metal Masters",
    description: "United community of metal musicians and fans",
    members: 1658,
    staked: "278K AUDI",
    apy: 17.9,
    backgroundImage: "https://images.unsplash.com/photo-1528489496900-d841974f5290?q=80&w=500&auto=format&fit=crop"
  },
];

export default CommunityDaos;
