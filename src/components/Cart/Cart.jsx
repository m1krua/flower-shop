import './Cart.css'
import trash from "../../assets/trash.svg"

function Cart({ cart, onClose, onUpdateQuantity, onRemove, totalPrice, onCheckout }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Корзина</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Корзина пуста</p>
            <p>Добавьте товары из каталога</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price} сом</p>
                  </div>
                  <div className="cart-item-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    <img src={trash} alt="" />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>Итого: {totalPrice} сом</h3>
            </div>

            <div className="cart-buttons">
              <button className="btn btn-primary btn-checkout" onClick={onCheckout}>
                Оформить заказ
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Продолжить покупки
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart