import { Link } from 'react-router-dom'
import { Shield, Star, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Homepage() {
  const featuredAccounts = [
    {
      id: 1,
      game: 'Adopt Me!',
      title: 'Mega Neon Shadow Dragon + More',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      seller: 'ProTrader123',
      rating: 4.9,
      verified: true,
      items: ['Mega Neon Shadow Dragon', 'Neon Frost Dragon', '500k+ AMC'],
      trustScore: 98
    },
    {
      id: 2,
      game: 'Murder Mystery 2',
      title: 'Godly Knife Collection',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      seller: 'MM2Master',
      rating: 5.0,
      verified: true,
      items: ['Chroma Luger', 'Chroma Shark', 'Elderwood Scythe'],
      trustScore: 100
    },
    {
      id: 3,
      game: 'Bloxburg',
      title: 'Premium House + 10M Cash',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      seller: 'BuilderPro',
      rating: 4.8,
      verified: true,
      items: ['Luxury Mansion', '10M+ Cash', 'All Gamepasses'],
      trustScore: 95
    }
  ]

  const gameCategories = [
    { name: 'Adopt Me!', accounts: 1250, icon: '🐾', popular: true },
    { name: 'Murder Mystery 2', accounts: 890, icon: '🔪', popular: true },
    { name: 'Bloxburg', accounts: 650, icon: '🏠', popular: true },
    { name: 'Arsenal', accounts: 420, icon: '🔫', popular: false },
    { name: 'Jailbreak', accounts: 380, icon: '🚗', popular: false },
    { name: 'Royale High', accounts: 320, icon: '👑', popular: false },
    { name: 'Pet Simulator X', accounts: 280, icon: '🐕', popular: false },
    { name: 'Brookhaven', accounts: 190, icon: '🏘️', popular: false }
  ]

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Escrow Protection',
      description: 'Your payment is held safely until you receive your account'
    },
    {
      icon: CheckCircle,
      title: 'Account Verification',
      description: 'Every account is verified with screenshots and proof of ownership'
    },
    {
      icon: Star,
      title: 'Seller Ratings',
      description: 'Community-driven ratings ensure you trade with trusted sellers'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our team is always here to help with any trading questions'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trade Roblox Accounts
              <span className="text-primary block">Safely & Securely</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              The most trusted marketplace for buying and selling Roblox accounts with rare items, 
              pets, and in-game currency. Protected by escrow and verified by our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                Browse Accounts
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                How It Works
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">50,000+</div>
                <div className="text-sm text-gray-600">Happy Traders</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">$2M+</div>
                <div className="text-sm text-gray-600">Safely Traded</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Trust Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accounts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Premium Accounts
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked accounts with the rarest items and highest value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAccounts.map((account) => (
              <Card key={account.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative">
                  <img
                    src={account.image}
                    alt={account.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-white">
                    {account.game}
                  </Badge>
                  {account.verified && (
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
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
                      <ul className="text-sm text-gray-600 space-y-1">
                        {account.items.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-primary mr-1" />
                        <span className="text-sm text-gray-600">Trust Score: {account.trustScore}%</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 mt-4">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/accounts">
              <Button size="lg" variant="outline" className="px-8">
                View All Accounts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Game Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Game
            </h2>
            <p className="text-lg text-gray-600">
              Find accounts for your favorite Roblox games
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameCategories.map((category) => (
              <Link
                key={category.name}
                to={`/accounts?game=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.accounts.toLocaleString()} accounts
                    </p>
                    {category.popular && (
                      <Badge className="bg-accent text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RobloxHub?
            </h2>
            <p className="text-lg text-gray-600">
              We prioritize your safety and security above everything else
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied traders who trust RobloxHub for their account needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Browse Accounts
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-primary">
              Sell Your Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}