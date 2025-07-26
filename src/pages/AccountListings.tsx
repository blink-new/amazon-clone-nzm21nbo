import { useState } from 'react'
import { Search, Filter, Grid, List, Star, Shield, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

export default function AccountListings() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const accounts = [
    {
      id: 1,
      game: 'Adopt Me!',
      title: 'Mega Neon Shadow Dragon + Rare Pets',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      seller: 'ProTrader123',
      rating: 4.9,
      verified: true,
      items: ['Mega Neon Shadow Dragon', 'Neon Frost Dragon', '500k+ AMC', '20+ Legendary Pets'],
      trustScore: 98,
      featured: true
    },
    {
      id: 2,
      game: 'Murder Mystery 2',
      title: 'Complete Godly Collection',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      seller: 'MM2Master',
      rating: 5.0,
      verified: true,
      items: ['Chroma Luger', 'Chroma Shark', 'Elderwood Scythe', '15+ Godly Knives'],
      trustScore: 100,
      featured: true
    },
    {
      id: 3,
      game: 'Bloxburg',
      title: 'Luxury Mansion + 10M Cash',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      seller: 'BuilderPro',
      rating: 4.8,
      verified: true,
      items: ['5-Story Mansion', '10M+ Cash', 'All Gamepasses', 'Premium Plot'],
      trustScore: 95,
      featured: false
    },
    {
      id: 4,
      game: 'Arsenal',
      title: 'High Level Account + Skins',
      price: 45.99,
      originalPrice: 65.99,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      seller: 'ArsenalPro',
      rating: 4.7,
      verified: true,
      items: ['Level 150+', '50+ Skins', 'Golden Knife', 'Rare Emotes'],
      trustScore: 92,
      featured: false
    },
    {
      id: 5,
      game: 'Jailbreak',
      title: 'All Vehicles + 5M Cash',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      seller: 'JailbreakKing',
      rating: 4.9,
      verified: true,
      items: ['All Limited Vehicles', '5M+ Cash', 'VIP Gamepass', 'Rare Textures'],
      trustScore: 96,
      featured: false
    },
    {
      id: 6,
      game: 'Royale High',
      title: 'Rare Halo Collection',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      seller: 'RoyaleQueen',
      rating: 4.8,
      verified: true,
      items: ['5+ Rare Halos', '2M+ Diamonds', 'Rare Sets', 'Limited Items'],
      trustScore: 94,
      featured: false
    }
  ]

  const games = ['All Games', 'Adopt Me!', 'Murder Mystery 2', 'Bloxburg', 'Arsenal', 'Jailbreak', 'Royale High']
  const priceRanges = ['All Prices', '$0 - $50', '$50 - $100', '$100 - $200', '$200+']
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rating']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Roblox Accounts
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect account with rare items, pets, and in-game currency
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Game Filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Game" />
              </SelectTrigger>
              <SelectContent>
                {games.map((game) => (
                  <SelectItem key={game} value={game.toLowerCase()}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range.toLowerCase()}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Toggle & Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {accounts.length} accounts
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Account Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {accounts.map((account) => (
            <Card key={account.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="relative">
                <img
                  src={account.image}
                  alt={account.title}
                  className={`w-full object-cover rounded-t-lg ${viewMode === 'grid' ? 'h-48' : 'h-32'}`}
                />
                <Badge className="absolute top-3 left-3 bg-primary text-white">
                  {account.game}
                </Badge>
                {account.featured && (
                  <Badge className="absolute top-3 right-3 bg-accent text-white">
                    Featured
                  </Badge>
                )}
                {account.verified && (
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {account.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">${account.price}</span>
                    <span className="text-sm text-gray-500 line-through">${account.originalPrice}</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {Math.round(((account.originalPrice - account.price) / account.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Seller: {account.seller}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{account.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Includes:</p>
                    <div className={`grid gap-1 ${viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {account.items.slice(0, viewMode === 'grid' ? 3 : 4).map((item, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                      {account.items.length > (viewMode === 'grid' ? 3 : 4) && (
                        <p className="text-sm text-gray-500">
                          +{account.items.length - (viewMode === 'grid' ? 3 : 4)} more items
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-primary mr-1" />
                      <span className="text-sm text-gray-600">Trust Score: {account.trustScore}%</span>
                    </div>
                  </div>

                  <div className={`flex gap-2 mt-4 ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Load More Accounts
          </Button>
        </div>
      </div>
    </div>
  )
}