import { useState, useEffect } from 'react'
import './LoginModal.css'

function LoginModal({ onLogin, onClose }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [googleLoaded, setGoogleLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: '781014842823-419dl1k6k7nbq0qefv70glka8l9dapke.apps.googleusercontent.com',
            callback: handleGoogleLogin,
            auto_select: false,
            cancel_on_tap_outside: true,
          })

          window.google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { 
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
              shape: 'rectangular',
              width: 320,
              locale: 'ru'
            }
          )
          
          setGoogleLoaded(true)
          console.log('✅ Google Sign-In загружен')
        } catch (err) {
          console.error('❌ Ошибка инициализации Google:', err)
        }
      }
    }

    script.onerror = () => {
      console.error('❌ Не удалось загрузить Google Sign-In')
      setError('Не удалось загрузить вход через Google')
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleGoogleLogin = (response) => {
    try {
      const userObject = parseJwt(response.credential)
      
      console.log('✅ Данные от Google:', {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture
      })
      
      onLogin({
        name: userObject.name,
        email: userObject.email,
        avatar: userObject.picture,
        provider: 'google'
      })
    } catch (error) {
      console.error('❌ Ошибка обработки Google login:', error)
      setError('Ошибка входа через Google. Попробуйте ещё раз.')
    }
  }

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Ошибка парсинга JWT:', error)
      throw error
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (isRegister && !username.trim()) {
      setError('Введите имя')
      return
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '{}')
    
    if (isRegister) {
      if (users[email]) {
        setError('Пользователь с таким email уже существует')
        return
      }
      
      onLogin({
        name: username.trim(),
        email: email.trim(),
        password: password,
        provider: 'local'
      })
    } else {
      if (!users[email]) {
        setError('Пользователь с таким email не найден')
        return
      }
      
      const user = users[email]
      
      if (user.provider === 'local' && user.password !== password) {
        setError('Неверный пароль')
        return
      }
      
      onLogin({
        name: user.name || 'Пользователь',
        email: user.email,
        provider: user.provider
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isRegister ? '📝 Регистрация' : '🔐 Вход'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">⚠️ {error}</div>}

          <div className="google-signin-wrapper">
            {!googleLoaded && (
              <div className="google-loading">Загрузка Google Sign-In...</div>
            )}
            <div id="googleSignInButton"></div>
          </div>

          <div className="divider">
            <span>или</span>
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Имя *</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите имя"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary btn-submit">
              {isRegister ? 'Зарегистрироваться' : 'Войти'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
          </div>

          <div className="toggle-mode">
            {isRegister ? (
              <p>
                Уже есть аккаунт?{' '}
                <button type="button" onClick={() => {
                  setIsRegister(false)
                  setError('')
                }}>
                  Войти
                </button>
              </p>
            ) : (
              <p>
                Нет аккаунта?{' '}
                <button type="button" onClick={() => {
                  setIsRegister(true)
                  setError('')
                }}>
                  Зарегистрироваться
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginModal