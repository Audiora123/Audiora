
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { AudioLines, Link2, Upload } from 'lucide-react';

const Create = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [chain, setChain] = useState('');
  const [enableRewards, setEnableRewards] = useState(false);
  const [rewardAmount, setRewardAmount] = useState([50]);
  const [socialActions, setSocialActions] = useState({
    shares: true,
    comments: true,
    playlists: false,
    remix: false
  });
  
  const handleEnableRewardsChange = (checked: boolean) => {
    setEnableRewards(checked);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Content Created!",
      description: "Your audio content has been uploaded with social rewards enabled.",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Creator Studio</h1>
          <p className="text-muted-foreground mt-1">Upload your audio and set up rewards for your fans</p>
        </div>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="upload">Upload Audio</TabsTrigger>
            <TabsTrigger value="rewards">Social Rewards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Audio</CardTitle>
                <CardDescription>
                  Share your music with the world and earn AUDIORA tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-10 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Drag and drop your audio file</p>
                    <p className="text-muted-foreground mb-4">Supports WAV, MP3, FLAC up to 100MB</p>
                    <Button variant="outline" type="button">Select File</Button>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Track Title</Label>
                      <Input 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title of your track"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about your track"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="chain">Primary Blockchain</Label>
                      <Select value={chain} onValueChange={setChain}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blockchain" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="solana">Solana</SelectItem>
                          <SelectItem value="polygon">Polygon</SelectItem>
                          <SelectItem value="arbitrum">Arbitrum</SelectItem>
                          <SelectItem value="optimism">Optimism</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your content will be primarily stored on this chain
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="social-rewards">Enable Social Rewards</Label>
                        <p className="text-sm text-muted-foreground">
                          Reward listeners who help promote your content
                        </p>
                      </div>
                      <Switch 
                        id="social-rewards" 
                        checked={enableRewards} 
                        onCheckedChange={handleEnableRewardsChange} 
                      />
                    </div>
                    
                    {enableRewards && (
                      <div className="border border-border rounded-lg p-4 space-y-4 bg-card">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="reward-amount">Reward Pool Amount (AUDIORA)</Label>
                            <span className="text-audiora-primary font-medium">{rewardAmount[0]} AUDI</span>
                          </div>
                          <Slider 
                            id="reward-amount"
                            defaultValue={[50]} 
                            max={500} 
                            min={10}
                            step={5}
                            value={rewardAmount}
                            onValueChange={setRewardAmount}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Total amount of tokens to be distributed to fans
                          </p>
                        </div>
                        
                        <div>
                          <Label className="mb-2 block">Reward Triggers</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="shares" 
                                checked={socialActions.shares} 
                                onCheckedChange={(checked) => setSocialActions({...socialActions, shares: checked})} 
                              />
                              <Label htmlFor="shares">Shares</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="comments" 
                                checked={socialActions.comments} 
                                onCheckedChange={(checked) => setSocialActions({...socialActions, comments: checked})} 
                              />
                              <Label htmlFor="comments">Comments</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="playlists" 
                                checked={socialActions.playlists} 
                                onCheckedChange={(checked) => setSocialActions({...socialActions, playlists: checked})} 
                              />
                              <Label htmlFor="playlists">Add to Playlist</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="remix" 
                                checked={socialActions.remix} 
                                onCheckedChange={(checked) => setSocialActions({...socialActions, remix: checked})} 
                              />
                              <Label htmlFor="remix">Remixes</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Create Track</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Social Rewards</CardTitle>
                <CardDescription>
                  Set up rewards for listeners who engage with your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="border border-border rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-medium">How Social Rewards Work</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                          <AudioLines className="h-6 w-6 text-audiora-primary" />
                        </div>
                        <h4 className="font-medium mb-2">1. Create a Reward Pool</h4>
                        <p className="text-sm text-muted-foreground">Set aside AUDIORA tokens for your listeners</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                          <svg className="h-6 w-6 text-audiora-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">2. Define Social Actions</h4>
                        <p className="text-sm text-muted-foreground">Choose which actions earn rewards</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-audiora-primary/20 flex items-center justify-center mb-4">
                          <svg className="h-6 w-6 text-audiora-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">3. Automatic Distribution</h4>
                        <p className="text-sm text-muted-foreground">Rewards are distributed as actions occur</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Create your first track to set up rewards</p>
                    <Button 
                      onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new Event('click'))}
                    >
                      Upload Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics</CardTitle>
                <CardDescription>
                  Track performance and engagement with your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <svg className="h-16 w-16 mx-auto text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">No analytics yet</h3>
                  <p className="text-muted-foreground mb-6">Upload your first track to start seeing analytics</p>
                  <Button 
                    onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new Event('click'))}
                    variant="outline"
                  >
                    Upload Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Create;
