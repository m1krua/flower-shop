import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Slider from './components/Slider/Slider'
import ProductCard from './components/ProductCard/ProductCard'
import Cart from './components/Cart/Cart'
import OrderForm from './components/OrderForm/OrderForm'
import LoginModal from './components/LoginModal/LoginModal'
import Profile from './components/Profile/Profile'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([])
  const [orderHistory, setOrderHistory] = useState([])
  const [showLogin, setShowLogin] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Все')

  useEffect(() => {
    const savedCurrentUser = localStorage.getItem('currentUser')

    if (savedCurrentUser) {
      const currentUserEmail = JSON.parse(savedCurrentUser).email
      const users = JSON.parse(localStorage.getItem('users') || '{}')

      if (users[currentUserEmail]) {
        const userData = users[currentUserEmail]
        setCurrentUser({
          name: userData.name || 'Пользователь',
          email: userData.email,
          phone: userData.phone || '',
          address: userData.address || '',
          avatar: userData.avatar || null,
          provider: userData.provider || 'local'
        })
        setCart(userData.cart || [])
        setOrderHistory(userData.orderHistory || [])
      }
    }
  }, [])

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      users[currentUser.email] = {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        avatar: currentUser.avatar,
        provider: currentUser.provider,
        password: users[currentUser.email]?.password,
        cart,
        orderHistory
      }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [currentUser, cart, orderHistory])

  const products = [
    { id: 1, name: 'Букет "Весенний"', price: 2500, image: '/images/roses.png', category: 'Цветы', description: '15 роз' },
    { id: 2, name: 'Тюльпаны микс', price: 1800, image: '/images/tulips.png', category: 'Цветы', description: '25 тюльпанов' },
    { id: 3, name: 'Букет "Нежность"', price: 3200, image: '/images/bouquet.png', category: 'Цветы', description: 'Пионы и розы' },
    { id: 4, name: 'Мишка плюшевый', price: 1500, image: '/images/bear.png', category: 'Подарки', description: 'Высота 40 см' },
    { id: 5, name: 'Клубника в шоколаде', price: 2200, image: '/images/strawberry.png', category: 'Сладости', description: '12 ягод' },
    { id: 6, name: 'Розы белые', price: 2700, image: '/images/white-roses.png', category: 'Цветы', description: '21 роза' },
    { id: 7, name: 'Коробка с макарунами', price: 1200, image: '/images/macarons.png', category: 'Сладости', description: '16 шт' },
    { id: 8, name: 'Композиция "Романтика"', price: 4500, image: '/images/composition.png', category: 'Цветы', description: 'Шляпная коробка' },
  ]

  const categories = ['Все', 'Цветы', 'Подарки', 'Сладости']

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleLogin = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}')

    if (!userData.name || userData.name.trim() === '') {
      userData.name = 'Пользователь'
    }

    if (users[userData.email]) {
      const existingUser = users[userData.email]

      if (existingUser.provider === 'local' && userData.password) {
        if (existingUser.password !== userData.password) {
          alert('Неверный пароль')
          return
        }
      }

      setCurrentUser({
        name: existingUser.name || userData.name || 'Пользователь',
        email: existingUser.email,
        phone: existingUser.phone || '',
        address: existingUser.address || '',
        avatar: existingUser.avatar || null,
        provider: existingUser.provider
      })
      setCart(existingUser.cart || [])
      setOrderHistory(existingUser.orderHistory || [])
    } else {
      const newUser = {
        name: userData.name || 'Пользователь',
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
        avatar: userData.avatar || null,
        provider: userData.provider || 'local',
        password: userData.password || null,
        cart: [],
        orderHistory: []
      }
      users[userData.email] = newUser
      localStorage.setItem('users', JSON.stringify(users))

      setCurrentUser({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        avatar: newUser.avatar,
        provider: newUser.provider
      })
      setCart([])
      setOrderHistory([])
    }

    localStorage.setItem('currentUser', JSON.stringify({ email: userData.email }))
    setShowLogin(false)
  }

  const handleLogout = () => {
    if (currentUser && currentUser.email) {
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      users[currentUser.email] = {
        ...users[currentUser.email],
        cart,
        orderHistory
      }
      localStorage.setItem('users', JSON.stringify(users))
    }

    setCurrentUser(null)
    setCart([])
    setOrderHistory([])
    localStorage.removeItem('currentUser')
    setShowProfile(false)
  }

  const handleUpdateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData }
    setCurrentUser(updatedUser)

    const users = JSON.parse(localStorage.getItem('users') || '{}')
    if (users[currentUser.email]) {
      users[currentUser.email] = {
        ...users[currentUser.email],
        ...updatedData
      }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  const handleOrder = (orderData) => {
    const newOrder = {
      id: String(orderHistory.length + 1).padStart(3, '0'),
      date: new Date().toLocaleDateString('ru-RU'),
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      total: getTotalPrice() + (orderData.delivery === 'courier' ? 300 : 0),
      status: 'processing'
    }

    setOrderHistory([newOrder, ...orderHistory])
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.')
    setCart([])
    setShowOrder(false)
  }

  return (
    <div className="app">
      <Header
        user={currentUser}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
        onProfileClick={() => setShowProfile(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <Slider />

      <main className="main-content">
        <section className="categories">
          <h2>Категории</h2>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="products">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </section>
      </main>

      {showLogin && (
        <LoginModal
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showProfile && currentUser && (
        <Profile
          user={currentUser}
          onClose={() => setShowProfile(false)}
          orderHistory={orderHistory}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          totalPrice={getTotalPrice()}
          onCheckout={() => {
            setShowCart(false)
            setShowOrder(true)
          }}
        />
      )}

      {showOrder && (
        <OrderForm
          onSubmit={handleOrder}
          onClose={() => setShowOrder(false)}
          totalPrice={getTotalPrice()}
          cart={cart}  // ⭐ ДОБАВЬТЕ ЭТО
        />
      )}
    </div>
  )
}

export default App