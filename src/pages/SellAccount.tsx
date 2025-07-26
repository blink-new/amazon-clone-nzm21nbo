import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Plus, X, Shield, DollarSign, Camera } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../blink/client'

const gameCategories = [
  'Adopt Me!',
  'Bloxburg',
  'Arsenal',
  'Jailbreak',
  'Murder Mystery 2',
  'Royale High',
  'Pet Simulator X',
  'Brookhaven',
  'Tower of Hell',
  'Piggy'
]

export default function SellAccount() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    robloxUsername: '',
    robloxUserId: '',
    gameCategory: '',
    price: '',
    accountLevel: '',
    robuxAmount: '',
    premiumStatus: 'none',
    items: ['']
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 8) {
      alert('Maximum 8 images allowed')
      return
    }
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, '']
    }))
  }

  const updateItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? value : item)
    }))
  }

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to sell an account')
      return
    }

    setLoading(true)
    try {
      // Upload images to storage
      const imageUrls = []
      for (const image of images) {
        const { publicUrl } = await blink.storage.upload(
          image,
          `account-images/${user.id}/${Date.now()}-${image.name}`,
          { upsert: true }
        )
        imageUrls.push(publicUrl)
      }

      // Create account listing
      await blink.db.robloxAccounts.create({
        id: `acc_${Date.now()}`,
        sellerId: user.id,
        title: formData.title,
        description: formData.description,
        robloxUsername: formData.robloxUsername,
        robloxUserId: formData.robloxUserId,
        gameCategory: formData.gameCategory,
        price: parseFloat(formData.price),
        images: JSON.stringify(imageUrls),
        items: JSON.stringify(formData.items.filter(item => item.trim())),
        accountLevel: parseInt(formData.accountLevel) || 1,
        robuxAmount: parseInt(formData.robuxAmount) || 0,
        premiumStatus: formData.premiumStatus,
        status: 'active',
        verificationStatus: 'pending'
      })

      alert('Account listing created successfully! It will be reviewed before going live.')
      navigate('/accounts')
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Failed to create listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-4">
              You need to sign in to sell your Roblox account safely on our platform.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Roblox Account</h1>
          <p className="text-gray-600">
            List your account safely with our escrow protection system. All listings are verified before going live.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Listing Title *
                </label>
                <Input
                  required
                  placeholder="e.g., High Level Adopt Me Account with Rare Pets"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  required
                  placeholder="Describe your account, items, achievements, and why it's valuable..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Game Category *
                  </label>
                  <Select
                    required
                    value={formData.gameCategory}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gameCategory: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary game" />
                    </SelectTrigger>
                    <SelectContent>
                      {gameCategories.map((game) => (
                        <SelectItem key={game} value={game}>
                          {game}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (USD) *
                  </label>
                  <Input
                    required
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roblox Username *
                  </label>
                  <Input
                    required
                    placeholder="YourRobloxUsername"
                    value={formData.robloxUsername}
                    onChange={(e) => setFormData(prev => ({ ...prev, robloxUsername: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roblox User ID *
                  </label>
                  <Input
                    required
                    placeholder="123456789"
                    value={formData.robloxUserId}
                    onChange={(e) => setFormData(prev => ({ ...prev, robloxUserId: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Level
                  </label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.accountLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, accountLevel: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Robux Amount
                  </label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.robuxAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, robuxAmount: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Status
                  </label>
                  <Select
                    value={formData.premiumStatus}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, premiumStatus: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Premium</SelectItem>
                      <SelectItem value="active">Active Premium</SelectItem>
                      <SelectItem value="expired">Expired Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items/Pets */}
          <Card>
            <CardHeader>
              <CardTitle>Items & Pets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="e.g., Shadow Dragon, Mega Neon Unicorn, etc."
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                    />
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Account Screenshots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images (Max 8) *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload screenshots of your account, inventory, and rare items
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Choose Images
                    </Button>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Safety Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Safety & Verification</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your listing will be reviewed before going live</li>
                    <li>• All transactions are protected by our escrow system</li>
                    <li>• You'll receive payment only after successful account transfer</li>
                    <li>• Never share account details outside our platform</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/accounts')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || images.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? 'Creating Listing...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}