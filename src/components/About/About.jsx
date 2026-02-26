import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about">

      {/* Hero */}
      <div className="about__hero">
        <div className="about__hero-overlay" />
        <div className="about__hero-content">
          <span className="about__hero-tag">О нас</span>
          <h1 className="about__title">Flore</h1>
          <p className="about__subtitle">
            Магазин живых цветов — там, где каждый букет рассказывает вашу историю
          </p>
        </div>
      </div>

      <div className="about__content">

        {/* История */}
        <div className="about__block about__block--story">
          <div className="about__image-wrap">
            <img
              src="https://i.pinimg.com/originals/0c/12/a7/0c12a7253a2d9ec2a309321b3295a377.jpg"
              alt="Магазин Flore"
              className="about__image"
            />
          </div>
          <div className="about__text">
            <h2 className="about__heading">Как всё начиналось</h2>
            <p>
              Flore открылась в 2018 году — с маленькой витриной, большим сердцем
              и страстью к живым цветам. Мы верили, что правильный букет способен
              выразить то, что сложно сказать словами.
            </p>
            <p>
              За эти годы мы собрали команду настоящих флористов-художников,
              которые каждый день создают композиции с душой — для свиданий,
              свадеб, юбилеев и просто так, без повода.
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">6+</span>
                <span className="about__stat-label">лет на рынке</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">12K+</span>
                <span className="about__stat-label">счастливых клиентов</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">50+</span>
                <span className="about__stat-label">сортов цветов</span>
              </div>
            </div>
          </div>
        </div>

        {/* Почему мы */}
        <div className="about__why">
          <h2 className="about__heading about__heading--center">Почему выбирают Flore</h2>
          <div className="about__why-grid">
            <div className="about__why-card">
              <span className="about__why-icon"><img src="src/assets/flower.svg" alt="" /></span>
              <h3>Только свежие цветы</h3>
              <p>Мы получаем поставки ежедневно — от проверенных ферм Нидерландов,
                Эквадора и местных хозяйств.</p>
            </div>
            <div className="about__why-card">
              <span className="about__why-icon"><img src="src/assets/handmade.svg" alt="" /></span>
              <h3>Ручная работа</h3>
              <p>Каждый букет собирается вручную нашими флористами под ваш запрос
                и настроение.</p>
            </div>
            <div className="about__why-card">
              <span className="about__why-icon"><img src="src/assets/fast.svg" alt="" /></span>
              <h3>Быстрая доставка</h3>
              <p>Доставляем букеты по городу в течение 2 часов — бережно и
                точно в срок.</p>
            </div>
            <div className="about__why-card">
              <span className="about__why-icon"><img src="src/assets/gift.svg" alt="" /></span>
              <h3>Открытка в подарок</h3>
              <p>К каждому заказу мы добавляем фирменную открытку с вашим
                текстом бесплатно.</p>
            </div>
          </div>
        </div>

        {/* Что мы делаем */}
        <div className="about__services">
          <h2 className="about__heading about__heading--center">Что мы создаём</h2>
          <div className="about__services-grid">
            <div className="about__service-item">
              <img src="https://i.pinimg.com/1200x/ef/1f/86/ef1f86d79f2ad638f6b1249edcda8eb5.jpg" alt="Букеты" className="about__service-img" />
              <div className="about__service-info">
                <h3>Букеты</h3>
                <p>Классика, моно, полевые, авторские</p>
              </div>
            </div>
            <div className="about__service-item">
              <img src="https://i.pinimg.com/1200x/de/07/b5/de07b5246ce5f9a9bb56cc0983779fb3.jpg" alt="Коробки" className="about__service-img" />
              <div className="about__service-info">
                <h3>Цветы в коробках</h3>
                <p>Шляпные, квадратные, подарочные</p>
              </div>
            </div>
            <div className="about__service-item">
              <img src="https://i.pinimg.com/1200x/43/d0/3a/43d03a590c46598bde22287a5b36d0b4.jpg" alt="Свадьба" className="about__service-img" />
              <div className="about__service-info">
                <h3>Свадебная флористика</h3>
                <p>Букет невесты, декор зала, бутоньерки</p>
              </div>
            </div>
            <div className="about__service-item">
              <img src="https://i.pinimg.com/1200x/85/31/9c/85319c84adaacbc9c85109210b2ce17a.jpg" alt="Мероприятия" className="about__service-img" />
              <div className="about__service-info">
                <h3>Оформление мероприятий</h3>
                <p>Корпоративы, дни рождения, фотозоны</p>
              </div>
            </div>
          </div>
        </div>

        {/* Команда */}
        <div className="about__team">
          <h2 className="about__heading about__heading--center">Наши флористы</h2>
          <p className="about__team-desc">
            За каждым букетом стоит человек с любовью к своему делу
          </p>
          <div className="about__team-grid">
            <div className="about__team-card">
              <img src="/images/team-1.jpg" alt="Анна" className="about__team-photo" />
              <h3>Анна</h3>
              <p>Основательница & Главный флорист</p>
            </div>
            <div className="about__team-card">
              <img src="/images/team-2.jpg" alt="Мария" className="about__team-photo" />
              <h3>Мария</h3>
              <p>Флорист-дизайнер</p>
            </div>
            <div className="about__team-card">
              <img src="/images/team-3.jpg" alt="Дарья" className="about__team-photo" />
              <h3>Дарья</h3>
              <p>Свадебная флористика</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about__cta">
          <h2>Готовы выбрать букет?</h2>
          <p>Загляните в наш каталог или свяжитесь с нами — мы поможем найти идеальный вариант</p>
          <div className="about__cta-buttons">
            <a href="src/App" className="about__btn about__btn--primary">Перейти в каталог</a>
            <a href="/contacts" className="about__btn about__btn--outline">Связаться с нами</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;