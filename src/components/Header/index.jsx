import React from 'react'
import { Container } from '../Container'
import style from './Header.module.css'

export const Header = () => {
  return (
    <header className={style.header}>
      <Container className={style.container}>
        <div className={style.wrapper}>
          <h1 className={style.title}>
            <span>Burgers Joint</span>
            <span className={style.red}>Только самые</span>
            <span className={style.red}>сочные бургеры!</span>
          </h1>

          <p className={style.appeal}>Бесплатная доставка от 599₽</p>
        </div>
      </Container>
    </header>
  )
}
