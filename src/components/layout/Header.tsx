import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Shield, Star, Users, LogIn, LogOut, User } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, loading, login, logout } = useAuth()

  const gameCategories = [
    'Adopt Me!',
    'Bloxburg',
    'Arsenal',
    'Jailbreak',
    'Murder Mystery 2',
    'Royale High',
    'Pet Simulator X',
    'Brookhaven'
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center text-sm">
          <Shield className="w-4 h-4 mr-2" />
          <span className="font-medium">100% Secure Trading with Escrow Protection</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RobloxHub</h1>
              <p className="text-xs text-gray-500">Safe Account Trading</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search accounts by game, items, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Trust Indicators */}
            <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 text-green-500 mr-1" />
                <span>50k+ Users</span>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth Buttons */}
            <div className="hidden sm:flex space-x-2">
              {loading ? (
                <Button variant="outline" size="sm" disabled>Loading...</Button>
              ) : user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.displayName}</span>
                    <Badge variant="secondary" className="text-xs">
                      {user.trustScore || 100}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={login}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Button 
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Game Categories - Desktop */}
        <div className="hidden lg:flex mt-4 space-x-6 text-sm">
          {gameCategories.map((game) => (
            <Link
              key={game}
              to={`/accounts?game=${encodeURIComponent(game)}`}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {game}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Auth */}
            <div className="flex space-x-2">
              {loading ? (
                <Button variant="outline" size="sm" className="flex-1" disabled>Loading...</Button>
              ) : user ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.displayName}</span>
                    <Badge variant="secondary" className="text-xs">
                      {user.trustScore || 100}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="flex-1" onClick={login}>
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Browse by Game</h3>
              <div className="grid grid-cols-2 gap-2">
                {gameCategories.map((game) => (
                  <Link
                    key={game}
                    to={`/accounts?game=${encodeURIComponent(game)}`}
                    className="text-sm text-gray-600 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {game}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}