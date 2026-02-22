import { useState, useEffect } from 'react'
import './Slider.css'

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://i.pinimg.com/1200x/11/16/e7/1116e7f57a02aead23b085c9ebe4fa17.jpg',
      title: 'Свежие цветы каждый день',
      subtitle: 'Доставка по городу за 2 часа'
    },
    {
      image: 'https://i.pinimg.com/1200x/5f/c7/21/5fc721da646b95c1e475914e07117a30.jpg',
      title: 'Эксклюзивные букеты',
      subtitle: 'Создаем композиции для особых моментов'
    },
    {
      image: 'https://i.pinimg.com/1200x/d9/7f/cf/d97fcf132da79d21d35da3f340e78f0b.jpg',
      title: 'Подарки с душой',
      subtitle: 'Сладости и мягкие игрушки'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
      style={{ backgroundImage:` url(${ slide.image })` }}
        >
      <div className="slide-overlay"></div>
      <div className="slide-content">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
      </div>
    </div>
  ))
}

<div className="slider-dots">
  {slides.map((_, index) => (
    <span
      key={index}
      className={`dot ${index === currentSlide ? 'active' : ''}`}
  onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div >
    </div >
  )
}

export default Slider