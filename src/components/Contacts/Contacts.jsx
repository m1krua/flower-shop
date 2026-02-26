import './Contacts.css'


function Contacts() {
  return (
    <div className="contacts">

      {/* Hero */}
      <div className="contacts__hero">
        <h1 className="contacts__title">Контакты</h1>
        <p className="contacts__subtitle">Мы всегда рады помочь вам выбрать идеальный букет</p>
      </div>

      <div className="contacts__content">

        {/* Карточки контактов */}
        <div className="contacts__cards">
          <div className="contacts__card">
            <span className="contacts__card-icon"><img src="src/assets/location.svg" alt="" /></span>
            <h3>Адрес</h3>
            <p>ул. Цветочная, 12</p>
            <p>Москва, Россия</p>
          </div>
          <div className="contacts__card">
            <span className="contacts__card-icon"><img src="src/assets/phone.svg" alt="" /></span>
            <h3>Телефон</h3>
            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
            <p>Ежедневно с 8:00 до 22:00</p>
          </div>
          <div className="contacts__card">
            <span className="contacts__card-icon"><img src="src/assets/email.svg" alt="" /></span>
            <h3>Email</h3>
            <a href="mailto:hello@flore.ru">hello@flore.ru</a>
            <p>Ответим в течение часа</p>
          </div>
          <div className="contacts__card">
            <span className="contacts__card-icon"><img src="src/assets/clock.svg" alt="" /></span>
            <h3>Режим работы</h3>
            <p>Пн–Пт: 8:00 – 22:00</p>
            <p>Сб–Вс: 9:00 – 21:00</p>
          </div>
        </div>

        {/* Форма + Карта */}
        <div className="contacts__main">

          {/* Форма */}
          <div className="contacts__form-wrap">
            <h2 className="contacts__heading">Напишите нам</h2>
            <p className="contacts__form-desc">
              Оставьте сообщение и мы свяжемся с вами в ближайшее время
            </p>
            <form className="contacts__form">
              <div className="contacts__form-row">
                <div className="contacts__form-group">
                  <label>Ваше имя</label>
                  <input type="text" placeholder="Анна" />
                </div>
                <div className="contacts__form-group">
                  <label>Телефон</label>
                  <input type="tel" placeholder="+996 (___) __-__-__" />
                </div>
              </div>
              <div className="contacts__form-group">
                <label>Email</label>
                <input type="email" placeholder="anna@mail.ru" />
              </div>
              <div className="contacts__form-group">
                <label>Сообщение</label>
                <textarea placeholder="Хочу заказать букет на свадьбу..." rows={5} />
              </div>
              <button type="submit" className="contacts__btn">
                Отправить сообщение 
              </button>
            </form>
          </div>

          {/* Карта */}
          <div className="contacts__map-wrap">
            <h2 className="contacts__heading">Мы на карте</h2>
            <div className="contacts__map">
              <iframe
                title="Flore на карте"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.372!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIxLjAiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sru!2sru!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            {/* Соцсети */}
            <div className="contacts__social">
              <h3>Мы в социальных сетях</h3>
              <div className="contacts__social-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contacts__social-link">
                   Instagram
                </a>
                <a href="https://vk.com" target="_blank" rel="noreferrer" className="contacts__social-link">
                   VKontakte
                </a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="contacts__social-link">
                   Telegram
                </a>
                <a href="https://wa.me/74951234567" target="_blank" rel="noreferrer" className="contacts__social-link">
                   WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Доставка */}
        <div className="contacts__delivery">
          <h2 className="contacts__heading contacts__heading--center">Доставка цветов</h2>
          <div className="contacts__delivery-grid">
            <div className="contacts__delivery-card">
              <img src="src/assets/delivery.svg" alt="" />
              <h3>По городу</h3>
              <p>Доставка в течение 2 часов по всему городу</p>
              <strong>от 300 ₽</strong>
            </div>
            <div className="contacts__delivery-card">
              <img src="src/assets/fast.svg" alt="" />
              <h3>Срочная</h3>
              <p>Доставим букет за 60 минут в любую точку</p>
              <strong>от 600 ₽</strong>
            </div>
            <div className="contacts__delivery-card">
              <img src="src/assets/pickup.svg" alt="" />
              <h3>Самовывоз</h3>
              <p>Заберите заказ из нашего магазина сами</p>
              <strong>Бесплатно</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contacts