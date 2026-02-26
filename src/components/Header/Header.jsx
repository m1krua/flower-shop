import './Header.css'
import shop from "../../assets/shop.svg"
import logout from "../../assets/logout.svg"

function Header({ user, onLoginClick, onLogoutClick, onProfileClick, cartCount, onCartClick, onHomeClick, onAboutClick, onContactClick }) {
  return (
    <header className="header">
      <div className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
        Flore
      </div>
      <nav className="nav">
        <button className="nav-link" onClick={onHomeClick}>Каталог</button>
        <button className="nav-link" onClick={onAboutClick}>О нас</button>
        <button className="nav-link" onClick={onContactClick}>Контакты</button>
      </nav>
      <div className="nav-buttons">
        <button className="btn cart-btn" onClick={onCartClick}>
          <img src={shop} alt="" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        {user ? (
          <>
            <button className="btn btn-profile" onClick={onProfileClick}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              ) : (
                ''
              )}
            </button>
            <button className="btn btn-danger" onClick={onLogoutClick}>
              <img src={logout} alt="" />
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