import { useState } from 'react'
import './OrderForm.css'

function OrderForm({ onSubmit, onClose, totalPrice, cart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
    delivery: 'courier'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Формируем сообщение для WhatsApp
    const deliveryCost = formData.delivery === 'courier' ? 300 : 0
    const total = totalPrice + deliveryCost

    // Список товаров
    const itemsList = cart.map(item =>
      `${item.name} x${item.quantity} - ${item.price * item.quantity} сом`
    ).join('\n')

    const message = `
🌸 *НОВЫЙ ЗАКАЗ*

👤 *Имя:* ${formData.name}
📱 *Телефон:* +996${formData.phone}
📍 *Адрес:* ${formData.address}
🚚 *Доставка:* ${formData.delivery === 'courier' ? 'Курьером' : 'Самовывоз'}

🛍️ *ТОВАРЫ:*
${itemsList}

💰 *Товары:* ${totalPrice} сом
💰 *Доставка:* ${deliveryCost} сом
💰 *ИТОГО:* ${total} сом

${formData.comment ? `💬 *Комментарий:* ${formData.comment}` : ''}
    `.trim()

    // Ваш номер WhatsApp (замените на свой!)
    const whatsappNumber = '996500331063' // ⭐ ВСТАВЬТЕ СЮДА ВАШ НОМЕР

    // Открываем WhatsApp с сообщением
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Сохраняем заказ локально
    onSubmit(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📝 Оформление заказа</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Ваше имя *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите имя"
              required
            />
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <div className="phone-input-wrapper">
              <span className="phone-prefix">🇰🇬 +996</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="555 123 456"
                required
                pattern="[0-9]{9}"
                maxLength="9"
                title="Введите 9 цифр (например: 555123456)"
              />
            </div>
            <small className="input-hint">Формат: 555 123 456 (9 цифр)</small>
          </div>

          <div className="form-group">
            <label>Адрес доставки *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Улица, дом, квартира"
              required
            />
          </div>

          <div className="form-group">
            <label>Способ доставки</label>
            <select name="delivery" value={formData.delivery} onChange={handleChange}>
              <option value="courier">Курьером (300 сом)</option>
              <option value="pickup">Самовывоз (бесплатно)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Комментарий к заказу</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Пожелания к заказу..."
              rows="3"
            ></textarea>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Товары:</span>
              <span>{totalPrice} сом</span>
            </div>
            <div className="summary-row">
              <span>Доставка:</span>
              <span>{formData.delivery === 'courier' ? '300 сом' : 'Бесплатно'}</span>
            </div>
            <div className="summary-total">
              <span>Итого:</span>
              <span>{totalPrice + (formData.delivery === 'courier' ? 300 : 0)} сом</span>
            </div>
          </div>

          <div className="whatsapp-notice">
            <p>✅ После нажатия кнопки откроется WhatsApp с готовым сообщением</p>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary btn-submit btn-whatsapp">
              <span className="whatsapp-icon">📱</span>
              Отправить в WhatsApp
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

export default OrderForm