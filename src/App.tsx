import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import Header from './components/layout/Header'
import Homepage from './pages/Homepage'
import AccountListings from './pages/AccountListings'
import AccountDetails from './pages/AccountDetails'
import Cart from './pages/Cart'
import SellAccount from './pages/SellAccount'
import Footer from './components/layout/Footer'

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (account) => {
    setCartItems(prev => [...prev, account])
  }

  const removeFromCart = (accountId) => {
    setCartItems(prev => prev.filter(item => item.id !== accountId))
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <Header cartCount={cartItems.length} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/accounts" element={<AccountListings />} />
              <Route path="/account/:id" element={<AccountDetails onAddToCart={addToCart} />} />
              <Route path="/cart" element={<Cart items={cartItems} onRemoveFromCart={removeFromCart} />} />
              <Route path="/sell" element={<SellAccount />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App