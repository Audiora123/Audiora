
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Users, AudioLines, Layers } from 'lucide-react';

const DaoDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [stakeAmount, setStakeAmount] = useState('');
  
  const daoData = {
    electronic: {
      name: "Electronic Collective",
      description: "Community of electronic music producers and fans",
      totalStaked: "245K AUDI",
      members: 1458,
      apy: 18.5,
      tracks: 156,
    },
    jazz: {
      name: "Jazz Innovators",
      description: "Supporting jazz musicians and new compositions",
      totalStaked: "183K AUDI",
      members: 872,
      apy: 15.2,
      tracks: 98,
    },
    hiphop: {
      name: "Hip Hop United",
      description: "Promoting hip hop artists and culture globally",
      totalStaked: "412K AUDI",
      members: 3240,
      apy: 21.7,
      tracks: 284,
    }
  };

  const currentDao = daoData[id as keyof typeof daoData];

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to stake.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tokens Staked",
      description: `Successfully staked ${stakeAmount} AUDI tokens in ${currentDao.name}.`,
    });
    setStakeAmount('');
  };

  if (!currentDao) {
    return <Layout>DAO not found</Layout>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{currentDao.name}</h1>
          <p className="text-muted-foreground mt-1">{currentDao.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>DAO Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="text-2xl font-bold">{currentDao.members}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">APY</p>
                  <p className="text-2xl font-bold text-audiora-primary">{currentDao.apy}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Staked</p>
                  <p className="text-2xl font-bold">{currentDao.totalStaked}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tracks</p>
                  <p className="text-2xl font-bold">{currentDao.tracks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Stake Tokens</CardTitle>
              <CardDescription>Stake your AUDIORA tokens to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    placeholder="Amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <Button onClick={handleStake}>Stake</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Available Balance: 1,000 AUDI
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="audio">
          <TabsList>
            <TabsTrigger value="audio">Audio Content</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((track) => (
                <Card key={track}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 bg-audiora-primary/20 rounded-lg flex items-center justify-center">
                      <AudioLines className="h-6 w-6 text-audiora-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Track {track}</h3>
                      <p className="text-sm text-muted-foreground">2.5K streams</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((member) => (
                    <div key={member} className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-audiora-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-audiora-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Member {member}</p>
                        <p className="text-sm text-muted-foreground">Staked: {50 * member}K AUDI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-audiora-primary/20 rounded-lg flex items-center justify-center">
                      <Layers className="h-6 w-6 text-audiora-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Your Rewards</h3>
                      <p className="text-2xl font-bold text-audiora-primary">125.5 AUDI</p>
                    </div>
                  </div>
                  <Button className="w-full">Claim Rewards</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DaoDetails;
