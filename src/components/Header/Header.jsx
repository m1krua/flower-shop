import './Header.css'

function Header({ user, onLoginClick, onLogoutClick, onProfileClick, cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="logo">
        🌸 Цветочный Рай
      </div>
      <nav className="nav">
        <a href="#catalog">Каталог</a>
        <a href="#about">О нас</a>
        <a href="#contacts">Контакты</a>
      </nav>
      <div className="nav-buttons">
        <button className="btn cart-btn" onClick={onCartClick}>
          🛒 Корзина
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        {user ? (
          <>
            <button className="btn btn-profile" onClick={onProfileClick}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              ) : (
                '👤'
              )}
              {' '}{user.name}
            </button>
            <button className="btn btn-danger" onClick={onLogoutClick}>
              Выйти
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onLoginClick}>
            Войти
          </button>
        )}
      </div>
    </header>
  )
}

export default Header