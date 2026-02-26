import { useState } from 'react'
import './EditProfile.css'

function EditProfile({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    avatar: user.avatar
  })
  const [previewImage, setPreviewImage] = useState(user.avatar)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setFormData({
          ...formData,
          avatar: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    setFormData({
      ...formData,
      avatar: null
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2> Редактировать профиль</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          {/* Аватар */}
          <div className="avatar-section">
            <div className="avatar-preview">
              {previewImage ? (
                <img src={previewImage} alt="Аватар" />
              ) : (
                <div className="avatar-placeholder">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="avatar-buttons">
              <label htmlFor="avatar-input" className="btn btn-primary">
                Загрузить фото
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {previewImage && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleRemoveImage}
                >
                   Удалить
                </button>
              )}
            </div>
            <p className="avatar-hint">JPG, PNG, GIF до 5MB</p>
          </div>

          {/* Имя */}
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Телефон */}
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+966 (___) __-__-__"
            />
          </div>

          {/* Адрес */}
          <div className="form-group">
            <label>Адрес доставки</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Улица, дом, квартира"
              rows="3"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary btn-submit">
              Сохранить изменения
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

export default EditProfile