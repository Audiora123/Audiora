
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AudioLines, Heart, PlayCircle, Search, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Explore = () => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState('');
  
  const handlePlay = (trackName: string) => {
    toast({
      title: "Now Playing",
      description: `Playing ${trackName}`,
    });
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Explore Music</h1>
            <p className="text-muted-foreground mt-1">Discover trending tracks across chains</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search tracks, artists, or genres..."
            className="pl-10"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New Releases</TabsTrigger>
            <TabsTrigger value="rewards">Social Rewards</TabsTrigger>
            <TabsTrigger value="featured">Featured DAOs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.slice(0, 6).map((track, index) => (
                <AudioCard 
                  key={index}
                  track={track}
                  onPlay={() => handlePlay(track.title)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.slice(3, 9).map((track, index) => (
                <AudioCard 
                  key={index}
                  track={track}
                  onPlay={() => handlePlay(track.title)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.filter(track => track.hasRewards).map((track, index) => (
                <AudioCard 
                  key={index}
                  track={track}
                  onPlay={() => handlePlay(track.title)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daosList.slice(0, 3).map((dao, index) => (
                <DaoFeaturedCard 
                  key={index}
                  dao={dao}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist, index) => (
              <Card key={index} className="overflow-hidden group border-audiora-secondary/20 hover:border-audiora-primary/50 transition-all">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img 
                    src={playlist.image} 
                    alt={playlist.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                      <PlayCircle className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold truncate">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground">{playlist.trackCount} tracks</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface Track {
  title: string;
  artist: string;
  coverArt: string;
  chain: string;
  chainColor: string;
  duration: string;
  hasRewards: boolean;
  rewardAmount?: number;
}

interface AudioCardProps {
  track: Track;
  onPlay: () => void;
}

const AudioCard = ({ track, onPlay }: AudioCardProps) => {
  return (
    <Card className="overflow-hidden group border-audiora-secondary/20 hover:border-audiora-primary/50 transition-all">
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img 
          src={track.coverArt} 
          alt={track.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium truncate">{track.title}</p>
              <p className="text-white/70 text-sm">{track.artist}</p>
            </div>
            <Button size="icon" variant="secondary" onClick={onPlay} className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <div 
            className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 bg-black/60 text-white"
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: track.chainColor }}
            ></div>
            {track.chain}
          </div>
          {track.hasRewards && (
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-audiora-primary/90 text-white">
              {track.rewardAmount} AUDI
            </div>
          )}
        </div>
      </div>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AudioLines className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{track.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {Math.floor(Math.random() * 500) + 50}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface Dao {
  name: string;
  description: string;
  members: number;
  tracks: number;
  image: string;
}

interface DaoFeaturedCardProps {
  dao: Dao;
}

const DaoFeaturedCard = ({ dao }: DaoFeaturedCardProps) => {
  return (
    <Card className="overflow-hidden group border-audiora-secondary/20 hover:border-audiora-primary/50 transition-all">
      <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url(${dao.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white font-semibold text-lg">{dao.name}</h3>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <Users className="h-3 w-3" />
            <span>{dao.members} members</span>
          </div>
        </div>
      </div>
      <CardContent className="py-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{dao.description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-audiora-primary border-audiora-primary/30">
            {dao.tracks} tracks
          </Badge>
          <Button size="sm" variant="outline">View DAO</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const tracks: Track[] = [
  {
    title: "Ethereal Dreams",
    artist: "Digital Harmony",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop",
    chain: "Ethereum",
    chainColor: "#627EEA",
    duration: "3:45",
    hasRewards: true,
    rewardAmount: 25
  },
  {
    title: "Polygon Pulse",
    artist: "Chain Beats",
    coverArt: "https://images.unsplash.com/photo-1614149162883-504ce46d48ac?q=80&w=500&auto=format&fit=crop",
    chain: "Polygon",
    chainColor: "#8247E5",
    duration: "4:12",
    hasRewards: false
  },
  {
    title: "Midnight Layer",
    artist: "Arbitrary Sounds",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop",
    chain: "Arbitrum",
    chainColor: "#12AAFF",
    duration: "3:21",
    hasRewards: true,
    rewardAmount: 50
  },
  {
    title: "Optimistic Future",
    artist: "Roll Ups",
    coverArt: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?q=80&w=500&auto=format&fit=crop",
    chain: "Optimism",
    chainColor: "#FF0420",
    duration: "2:58",
    hasRewards: false
  },
  {
    title: "Solar Flare",
    artist: "Program Collective",
    coverArt: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop",
    chain: "Solana",
    chainColor: "#14F195",
    duration: "3:33",
    hasRewards: true,
    rewardAmount: 35
  },
  {
    title: "Cascading Harmony",
    artist: "Avalanche Protocol",
    coverArt: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=500&auto=format&fit=crop",
    chain: "Avalanche",
    chainColor: "#E84142",
    duration: "4:05",
    hasRewards: false
  },
  {
    title: "Zero Knowledge",
    artist: "The Provers",
    coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500&auto=format&fit=crop",
    chain: "Ethereum",
    chainColor: "#627EEA",
    duration: "3:17",
    hasRewards: true,
    rewardAmount: 40
  },
  {
    title: "Summer Nights",
    artist: "Cryptic Melodies",
    coverArt: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?q=80&w=500&auto=format&fit=crop",
    chain: "Polygon",
    chainColor: "#8247E5",
    duration: "3:50",
    hasRewards: true,
    rewardAmount: 30
  },
  {
    title: "Neural Network",
    artist: "AI Symphony",
    coverArt: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=500&auto=format&fit=crop",
    chain: "Arbitrum",
    chainColor: "#12AAFF",
    duration: "5:22",
    hasRewards: false
  },
];

const daosList = [
  {
    name: "Electronic Collective",
    description: "Community of electronic music producers and fans exploring the boundaries of sound design and cross-chain audio experiences.",
    members: 1458,
    tracks: 42,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Jazz Innovators",
    description: "Supporting jazz musicians and new compositions through decentralized funding and cross-chain royalty distribution.",
    members: 872,
    tracks: 28,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Hip Hop United",
    description: "Promoting hip hop artists and culture globally with blockchain-powered distribution and community-led curation.",
    members: 3240,
    tracks: 76,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=500&auto=format&fit=crop"
  }
];

const playlists = [
  {
    title: "Cross-Chain Vibes",
    trackCount: 24,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "DAO Curated: Electronic",
    trackCount: 18,
    image: "https://images.unsplash.com/photo-1425342605259-25d80e320565?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Top Reward Earners",
    trackCount: 15,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop"
  },
  {
    title: "Audiora Staff Picks",
    trackCount: 32,
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop"
  }
];

export default Explore;
