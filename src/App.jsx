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
    { id: 1, name: 'Букет "Весенний"', price: 2500, image: 'https://i.pinimg.com/1200x/96/c9/3a/96c93aaa5dd8fb394dc6a485c5e40e3f.jpg', category: 'Цветы', description: '15 роз' },
    { id: 2, name: 'Тюльпаны микс', price: 1800, image: 'https://i.pinimg.com/1200x/66/48/dd/6648dd528b2df7c0e165e618a59f56ff.jpg', category: 'Цветы', description: '25 тюльпанов' },
    { id: 3, name: 'Букет "Нежность"', price: 3200, image: 'https://i.pinimg.com/1200x/ef/08/18/ef0818c701078f12780fd3b44e22bcd0.jpg', category: 'Цветы', description: 'Пионы и розы' },
    { id: 4, name: 'Мишка плюшевый', price: 1500, image: 'https://i.pinimg.com/736x/7d/19/94/7d1994335954552456be16f72b53fbfc.jpg', category: 'Подарки', description: 'Высота 40 см' },
    { id: 5, name: 'Клубника в шоколаде', price: 2200, image: 'https://i.pinimg.com/736x/d9/ba/d1/d9bad1dec85cfd4ba0dfcfb328399245.jpg', category: 'Сладости', description: '12 ягод' },
    { id: 6, name: 'Розы белые', price: 2700, image: 'https://i.pinimg.com/736x/3c/b9/2e/3cb92efd0dabffae294f86d047f6f999.jpg', category: 'Цветы', description: '21 роза' },
    { id: 7, name: 'Коробка с макарунами', price: 1200, image: 'https://i.pinimg.com/736x/64/72/61/64726104f8baf47c486a6dfcd1a57f5e.jpg', category: 'Сладости', description: '16 шт' },
    { id: 8, name: 'Композиция "Романтика"', price: 4500, image: 'https://i.pinimg.com/736x/3f/b4/90/3fb490336008c34e15c418929e8b1690.jpg', category: 'Цветы', description: 'Шляпная коробка' },
    { id: 9, name: 'Орхидея в горшке', price: 3500, image: 'https://i.pinimg.com/736x/87/b1/4e/87b14e42798a5ac1697fb5a664ddfdf1.jpg', category: 'Цветы', description: 'Фаленопсис' },
    { id: 10, name: 'Букет "Солнечный"', price: 2800, image: 'https://i.pinimg.com/1200x/eb/46/5b/eb465b4134c07abae923617b54e9d66e.jpg', category: 'Цветы', description: 'Подсолнухи и зелень' },
    { id: 11, name: 'Набор конфет ассорти', price: 1900, image: 'https://i.pinimg.com/736x/50/d4/ed/50d4ed847496c21bcd21c533c228f3ca.jpg', category: 'Сладости', description: '20 конфет' },
    { id: 12, name: 'Воздушные шары (5 шт)', price: 800, image: 'https://i.pinimg.com/1200x/c7/40/1b/c7401b7320e552c7280dfdcd99605ff7.jpg', category: 'Подарки', description: 'Гелиевые' },
    { id: 13, name: 'Букет "Лавандовый вечер"', price: 3100, image: 'https://i.pinimg.com/736x/db/b2/35/dbb23537481e9763671928cce9fc5434.jpg', category: 'Цветы', description: 'Лаванда и розы' },
    { id: 14, name: 'Подарочная корзина', price: 5000, image: 'https://i.pinimg.com/736x/73/25/19/73251939ad9f133662e103d017ca0589.jpg', category: 'Подарки', description: 'Фрукты и сладости' },
    { id: 15, name: 'Букет "Экзотика"', price: 4700, image: 'https://i.pinimg.com/736x/35/29/76/35297669c4125aeb301aa8019e699af8.jpg', category: 'Цветы', description: 'Тропические цветы' },
    { id: 16, name: 'Букет "Аромат весны"', price: 2900, image: 'https://i.pinimg.com/736x/9f/3c/86/9f3c86c64f102366c5790cba82e82652.jpg', category: 'Цветы', description: 'Розы и альстромерии' },
    { id: 17, name: 'Гортензия в коробке', price: 3800, image: 'https://i.pinimg.com/736x/d1/a2/3e/d1a23e0b063c1d470ae403fbbbe57666.jpg', category: 'Цветы', description: 'Голубая гортензия' },
    { id: 18, name: 'Шоколад ручной работы', price: 1600, image: 'https://i.pinimg.com/736x/01/5d/29/015d2968aae4d10b8bf0306564ad0413.jpg', category: 'Сладости', description: 'Набор 12 плиток' },
    { id: 19, name: 'Коробка "Сладкая любовь"', price: 2400, image: 'https://i.pinimg.com/736x/df/0c/94/df0c94f9e3bbc7a3d19085d295fd7355.jpg', category: 'Сладости', description: 'Клубника и макаруны' },
    { id: 20, name: 'Плюшевый зайчик', price: 1700, image: 'https://i.pinimg.com/736x/f7/2d/de/f72dde940ab947a374730db8962f0f2a.jpg', category: 'Подарки', description: 'Высота 35 см' },
    { id: 21, name: 'Букет "Элегантность"', price: 4100, image: 'https://i.pinimg.com/1200x/70/4c/54/704c54b17316e1788c8b9e629646f29a.jpg', category: 'Цветы', description: 'Белые розы и эвкалипт' },
    { id: 22, name: 'Фруктовый бокс', price: 3300, image: 'https://i.pinimg.com/1200x/aa/e5/1e/aae51e82ac284b67e178989b0719a7b3.jpg', category: 'Подарки', description: 'Сезонные фрукты' },
    { id: 23, name: 'Букет "Париж"', price: 3600, image: 'https://i.pinimg.com/736x/51/56/b0/5156b094fba8e543b15f2550d6907ae3.jpg', category: 'Цветы', description: 'Розы и пионы' },
    { id: 24, name: 'Маршмеллоу набор', price: 1100, image: 'https://i.pinimg.com/736x/9a/7c/54/9a7c54189853118c9a06dfeabc44bdfe.jpg', category: 'Сладости', description: '15 шт' },
    { id: 25, name: 'Композиция "Сердце"', price: 5200, image: 'https://i.pinimg.com/1200x/e9/3e/1c/e93e1c84762a9c3f6da8d250a6ca5472.jpg', category: 'Цветы', description: 'Розы в форме сердца' },

  ];
  

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