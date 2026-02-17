import { useState, useEffect } from 'react'
import './Slider.css'

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: '/images/slide1.png',
      title: 'Свежие цветы каждый день',
      subtitle: 'Доставка по городу за 2 часа'
    },
    {
      image: '/images/slide2.png',
      title: 'Эксклюзивные букеты',
      subtitle: 'Создаем композиции для особых моментов'
    },
    {
      image: '/images/slide3.png',
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
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay"></div>
          <div className="slide-content">
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Slider