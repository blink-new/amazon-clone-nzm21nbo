import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, Shield, CreditCard } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'

interface CartProps {
  items: any[]
  onRemoveFromCart: (accountId: number) => void
}

export default function Cart({ items, onRemoveFromCart }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const escrowFee = subtotal * 0.05 // 5% escrow fee
  const total = subtotal + escrowFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Discover amazing Roblox accounts with rare items and start building your collection!
          </p>
          <Link to="/accounts">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Browse Accounts
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600">
            Review your selected accounts before checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Item Image */}
                    <div className="md:w-48 h-48 md:h-auto">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge className="bg-primary text-white mb-2">
                            {item.game}
                          </Badge>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            Seller: {item.seller}
                          </p>
                          
                          {/* Key Items Preview */}
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">Key Items:</p>
                            <ul className="text-sm text-gray-600">
                              {item.items.slice(0, 3).map((subItem, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                  {subItem}
                                </li>
                              ))}
                              {item.items.length > 3 && (
                                <li className="text-gray-500">
                                  +{item.items.length - 3} more items
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Link to={`/account/${item.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({items.length} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Escrow Protection Fee</span>
                    <span className="font-medium">${escrowFee.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Link to="/accounts" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Features */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span>Protected by Escrow Service</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Secure Payment Processing</span>
                  </div>
                </div>

                {/* Escrow Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    How Escrow Protection Works
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your payment is held securely</li>
                    <li>• Seller delivers the account</li>
                    <li>• You verify and approve</li>
                    <li>• Payment is released to seller</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Shop with RobloxHub?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 text-green-500 mr-3" />
                  <span>100% Secure Transactions</span>
                </div>
                <div className="flex items-center text-sm">
                  <CreditCard className="w-4 h-4 text-blue-500 mr-3" />
                  <span>Verified Sellers Only</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag className="w-4 h-4 text-purple-500 mr-3" />
                  <span>24/7 Customer Support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}