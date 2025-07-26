import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Grid, List, Star, Shield, CheckCircle, Plus } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

interface RobloxAccount {
  id: string
  sellerId: string
  title: string
  description: string
  robloxUsername: string
  gameCategory: string
  price: number
  images: string[]
  items: string[]
  accountLevel: number
  robuxAmount: number
  premiumStatus: string
  status: string
  verificationStatus: string
  createdAt: string
}

export default function AccountListings() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [accounts, setAccounts] = useState<RobloxAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [gameFilter, setGameFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const games = ['All Games', 'Adopt Me!', 'Murder Mystery 2', 'Bloxburg', 'Arsenal', 'Jailbreak', 'Royale High', 'Pet Simulator X', 'Brookhaven']
  const priceRanges = ['All Prices', '$0 - $50', '$50 - $100', '$100 - $200', '$200+']
  const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular']

  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true)
      
      // Build query filters
      const filters: any = {
        status: 'active',
        verificationStatus: 'verified'
      }

      if (gameFilter !== 'all') {
        filters.gameCategory = gameFilter
      }

      // Build order by
      let orderBy: any = { createdAt: 'desc' }
      if (sortBy === 'price-low') {
        orderBy = { price: 'asc' }
      } else if (sortBy === 'price-high') {
        orderBy = { price: 'desc' }
      }

      const accountsData = await blink.db.robloxAccounts.list({
        where: filters,
        orderBy,
        limit: 50
      })

      // Parse JSON fields and filter by price if needed
      let processedAccounts = accountsData.map(account => ({
        ...account,
        images: JSON.parse(account.images || '[]'),
        items: JSON.parse(account.items || '[]'),
        price: Number(account.price)
      }))

      // Apply price filter
      if (priceFilter !== 'all') {
        processedAccounts = processedAccounts.filter(account => {
          const price = account.price
          switch (priceFilter) {
            case '$0 - $50': return price <= 50
            case '$50 - $100': return price > 50 && price <= 100
            case '$100 - $200': return price > 100 && price <= 200
            case '$200+': return price > 200
            default: return true
          }
        })
      }

      // Apply search filter
      if (searchQuery.trim()) {
        processedAccounts = processedAccounts.filter(account =>
          account.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.gameCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          account.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }

      setAccounts(processedAccounts)
    } catch (error) {
      console.error('Error loading accounts:', error)
    } finally {
      setLoading(false)
    }
  }, [gameFilter, priceFilter, sortBy, searchQuery])

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      loadAccounts()
    }, 300)
    return () => clearTimeout(timer)
  }, [loadAccounts, searchQuery])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Roblox Accounts
            </h1>
            <p className="text-lg text-gray-600">
              Find the perfect account with rare items, pets, and in-game currency
            </p>
          </div>
          
          {user && (
            <Link to="/sell">
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Sell Account
              </Button>
            </Link>
          )}
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
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Game" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Games</SelectItem>
                {games.slice(1).map((game) => (
                  <SelectItem key={game} value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.slice(1).map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
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
        {accounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No accounts found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all accounts
            </p>
            {user && (
              <Link to="/sell">
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Be the first to sell!
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {accounts.map((account) => (
              <Card key={account.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative">
                  <img
                    src={account.images[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'}
                    alt={account.title}
                    className={`w-full object-cover rounded-t-lg ${viewMode === 'grid' ? 'h-48' : 'h-32'}`}
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-white">
                    {account.gameCategory}
                  </Badge>
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {account.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">${account.price}</span>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Level {account.accountLevel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">@{account.robloxUsername}</span>
                      {account.robuxAmount > 0 && (
                        <span className="text-yellow-600 font-medium">
                          {account.robuxAmount.toLocaleString()} Robux
                        </span>
                      )}
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
                        <span className="text-sm text-gray-600">Escrow Protected</span>
                      </div>
                      {account.premiumStatus === 'active' && (
                        <Badge className="bg-yellow-500 text-white text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>

                    <div className={`flex gap-2 mt-4 ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}>
                      <Link to={`/account/${account.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}