import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price} сом</span>
          <button 
            className="btn-add-cart" 
            onClick={() => onAddToCart(product)}
          >
            + В корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard