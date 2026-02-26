import { useState } from 'react'
import EditProfile from '../EditProfile/EditProfile'
import ChangePassword from '../ChangePassword/ChangePassword'
import './Profile.css'

function Profile({ user, onClose, orderHistory, onUpdateUser }) {
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleSaveProfile = (updatedData) => {
    onUpdateUser(updatedData)
    setShowEditProfile(false)
    alert('Профиль успешно обновлен!')
  }

  const handleChangePassword = (passwordData) => {
    console.log('Смена пароля:', passwordData)
    setShowChangePassword(false)
    alert('Пароль успешно изменен!')
  }

  // ⭐ ПРОВЕРКА: если user не загружен - не рендерим
  if (!user || !user.name) {
    console.error(' User не загружен:', user)
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2> Ошибка загрузки</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Не удалось загрузить данные пользователя</p>
            <button className="btn btn-primary" onClick={onClose}>Закрыть</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal profile-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Личный кабинет</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>

          <div className="profile-content">
            <div className="profile-info">
              <div className="profile-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  // ⭐ БЕЗОПАСНОЕ ПОЛУЧЕНИЕ ПЕРВОЙ БУКВЫ
                  (user.name && user.name.charAt(0).toUpperCase()) || '?'
                )}
              </div>
              <h3>{user.name || 'Пользователь'}</h3>
              <p className="profile-email">{user.email || ''}</p>
              {user.phone && <p className="profile-phone">📱 {user.phone}</p>}
              {user.address && <p className="profile-address">📍 {user.address}</p>}
              {user.provider === 'google' && (
                <span className="provider-badge">
                   Вход через Google
                </span>
              )}
              <p className="profile-status"> Активный пользователь</p>
              
              <button 
                className="btn btn-edit-profile"
                onClick={() => setShowEditProfile(true)}
              >
                Редактировать профиль
              </button>
            </div>

            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-icon"></div>
                <div className="stat-info">
                  <span className="stat-value">{orderHistory?.length || 0}</span>
                  <span className="stat-label">Заказов</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"></div>
                <div className="stat-info">
                  <span className="stat-value">
                    {orderHistory?.reduce((sum, order) => sum + order.total, 0) || 0} ₽
                  </span>
                  <span className="stat-label">Потрачено</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"></div>
                <div className="stat-info">
                  <span className="stat-value">VIP</span>
                  <span className="stat-label">Статус</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h4> История заказов</h4>
              {!orderHistory || orderHistory.length === 0 ? (
                <div className="empty-orders">
                  <p>У вас пока нет заказов</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orderHistory.map((order, index) => (
                    <div key={index} className="order-item">
                      <div className="order-header">
                        <span className="order-number">Заказ #{order.id}</span>
                        <span className={`order-status ${order.status}`}>
                          {order.status === 'completed' && ' Доставлен'}
                          {order.status === 'processing' && ' В обработке'}
                          {order.status === 'delivery' && ' В доставке'}
                        </span>
                      </div>
                      <div className="order-details">
                        <p> {order.date}</p>
                        <p> Товаров: {order.items}</p>
                        <p className="order-total"> {order.total} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-section">
              <h4> Настройки</h4>
              <div className="settings-list">
                <button className="setting-btn" onClick={() => setShowEditProfile(true)}>
                  <span> Редактировать профиль</span>
                  <span>→</span>
                </button>
                <button className="setting-btn" onClick={() => setShowChangePassword(true)}>
                  <span> Изменить пароль</span>
                  <span>→</span>
                </button>
                <button className="setting-btn">
                  <span> Мои адреса</span>
                  <span>→</span>
                </button>
                <button className="setting-btn">
                  <span> Уведомления</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditProfile && (
        <EditProfile
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showChangePassword && (
        <ChangePassword
          onSave={handleChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
      )}
    </>
  )
}

export default Profile