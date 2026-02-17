import { useState } from 'react'
import './ChangePassword.css'

function ChangePassword({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('Пароль должен быть минимум 6 символов')
      return
    }

    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal change-password-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔒 Изменить пароль</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          {error && <div className="error-message">⚠️ {error}</div>}

          <div className="form-group">
            <label>Текущий пароль</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Введите текущий пароль"
              required
            />
          </div>

          <div className="form-group">
            <label>Новый пароль</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Введите новый пароль"
              required
            />
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите новый пароль"
              required
            />
          </div>

          <div className="password-requirements">
            <p>Требования к паролю:</p>
            <ul>
              <li className={formData.newPassword.length >= 6 ? 'valid' : ''}>
                Минимум 6 символов
              </li>
              <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : ''}>
                Одна заглавная буква
              </li>
              <li className={/[0-9]/.test(formData.newPassword) ? 'valid' : ''}>
                Одна цифра
              </li>
            </ul>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary btn-submit">
              Изменить пароль
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword