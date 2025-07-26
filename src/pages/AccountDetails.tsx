import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Shield, CheckCircle, Heart, Share2, AlertTriangle, MessageCircle, Clock } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

interface AccountDetailsProps {
  onAddToCart: (account: any) => void
}

export default function AccountDetails({ onAddToCart }: AccountDetailsProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState(0)
  const [account, setAccount] = useState<any>(null)
  const [seller, setSeller] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const loadAccount = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      
      // Load account data
      const accounts = await blink.db.robloxAccounts.list({
        where: { id },
        limit: 1
      })

      if (accounts.length === 0) {
        navigate('/accounts')
        return
      }

      const accountData = accounts[0]
      
      // Load seller data
      const sellers = await blink.db.users.list({
        where: { userId: accountData.sellerId },
        limit: 1
      })

      const sellerData = sellers[0]

      setAccount({
        ...accountData,
        images: JSON.parse(accountData.images || '[]'),
        items: JSON.parse(accountData.items || '[]'),
        price: Number(accountData.price)
      })

      setSeller(sellerData)
    } catch (error) {
      console.error('Error loading account:', error)
      navigate('/accounts')
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    loadAccount()
  }, [loadAccount])

  const handlePurchase = async () => {
    if (!user) {
      alert('Please sign in to purchase an account')
      return
    }

    if (!account) return

    try {
      // Create transaction
      await blink.db.transactions.create({
        id: `txn_${Date.now()}`,
        buyerId: user.id,
        sellerId: account.sellerId,
        accountId: account.id,
        amount: account.price,
        status: 'pending',
        escrowStatus: 'holding'
      })

      // Update account status
      await blink.db.robloxAccounts.update(account.id, {
        status: 'pending'
      })

      alert('Purchase initiated! Your payment is being held in escrow. You will receive account details once the seller confirms the transfer.')
      navigate('/accounts')
    } catch (error) {
      console.error('Error creating purchase:', error)
      alert('Failed to initiate purchase. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account details...</p>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Not Found</h2>
          <p className="text-gray-600 mb-4">The account you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/accounts')}>
            Browse Other Accounts
          </Button>
        </div>
      </div>
    )
  }

  // Mock data for features not yet implemented
  const mockAccount = {
    id: 1,
    game: 'Adopt Me!',
    title: 'Mega Neon Shadow Dragon + Rare Pets Collection',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
    ],
    seller: {
      username: 'ProTrader123',
      rating: 4.9,
      totalSales: 156,
      memberSince: '2022',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    description: 'This premium Adopt Me account features some of the rarest and most valuable pets in the game. Perfect for collectors and serious players looking to dominate the trading scene.',
    items: [
      { name: 'Mega Neon Shadow Dragon', rarity: 'Legendary', value: '$150' },
      { name: 'Neon Frost Dragon', rarity: 'Legendary', value: '$80' },
      { name: 'Mega Neon Unicorn', rarity: 'Legendary', value: '$45' },
      { name: 'Neon Owl', rarity: 'Legendary', value: '$35' },
      { name: 'Candy Cannon', rarity: 'Legendary', value: '$25' },
      { name: '500,000+ Adopt Me Cash', rarity: 'Currency', value: '$20' },
      { name: '20+ Other Legendary Pets', rarity: 'Various', value: '$40+' }
    ],
    stats: {
      level: 'Max Level',
      playtime: '2000+ hours',
      achievements: '95% Complete',
      lastActive: '2 days ago'
    },
    trustScore: 98,
    verified: true,
    escrowProtected: true,
    reviews: [
      {
        id: 1,
        buyer: 'RobloxFan2023',
        rating: 5,
        comment: 'Amazing account! Exactly as described. Fast and secure transaction.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 2,
        buyer: 'PetCollector',
        rating: 5,
        comment: 'Great seller, very responsive and helpful throughout the process.',
        date: '2024-01-10',
        verified: true
      },
      {
        id: 3,
        buyer: 'AdoptMePlayer',
        rating: 4,
        comment: 'Good account, had a small issue but seller resolved it quickly.',
        date: '2024-01-05',
        verified: true
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={account.images[selectedImage]}
                    alt={account.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {account.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-primary' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="items">Items</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Account Description</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {account.description}
                      </p>
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Account Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-blue-700">Username:</span>
                            <span className="ml-2 font-medium">@{account.robloxUsername}</span>
                          </div>
                          <div>
                            <span className="text-blue-700">Level:</span>
                            <span className="ml-2 font-medium">{account.accountLevel}</span>
                          </div>
                          <div>
                            <span className="text-blue-700">Robux:</span>
                            <span className="ml-2 font-medium">{account.robuxAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div>
                            <span className="text-blue-700">Premium:</span>
                            <span className="ml-2 font-medium">{account.premiumStatus === 'active' ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-green-500 mr-2" />
                          <span className="text-sm">Escrow Protected</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="text-sm">Account Verified</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-purple-500 mr-2" />
                          <span className="text-sm">Instant Delivery</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-5 h-5 text-orange-500 mr-2" />
                          <span className="text-sm">24/7 Support</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="items" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Included Items</h3>
                      <div className="space-y-3">
                        {account.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                              <div>
                                <p className="font-medium">{item}</p>
                                <p className="text-sm text-gray-500">Included Item</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-blue-600 border-blue-600">
                              ✓ Included
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="stats" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Account Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Level</p>
                          <p className="text-lg font-semibold">{account.stats.level}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Playtime</p>
                          <p className="text-lg font-semibold">{account.stats.playtime}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Achievements</p>
                          <p className="text-lg font-semibold">{account.stats.achievements}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Last Active</p>
                          <p className="text-lg font-semibold">{account.stats.lastActive}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <div className="space-y-4">
                        {account.reviews.map((review) => (
                          <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="font-medium">{review.buyer}</span>
                                {review.verified && (
                                  <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                                )}
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{review.comment}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase & Seller Info */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary text-white">{account.gameCategory}</Badge>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl">{account.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">${account.price}</span>
                    <span className="text-lg text-gray-500 line-through">${account.originalPrice}</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {Math.round(((account.originalPrice - account.price) / account.originalPrice) * 100)}% OFF
                  </Badge>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    onClick={() => onAddToCart(account)}
                  >
                    Add to Cart - ${account.price}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handlePurchase}
                    disabled={account.status !== 'active'}
                  >
                    {account.status === 'active' ? 'Buy Now with Escrow' : 'Account Unavailable'}
                  </Button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      Protected by Escrow
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your payment is held safely until you receive your account
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">
                      Safety Reminder
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Never share your payment details outside of our platform
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={seller?.avatarUrl} />
                    <AvatarFallback>{seller?.displayName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold">{seller?.displayName || 'Unknown Seller'}</h3>
                      <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">Trust Score: {seller?.trustScore || 100}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Total Sales</p>
                    <p className="font-medium">{seller?.totalSales || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Robux Amount</p>
                    <p className="font-medium">{account.robuxAmount?.toLocaleString() || 0}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}