import React from 'react'
import { CatalogProduct } from '../CatalogProduct'
import { Container } from '../Container'
import { Order } from '../Order'
import style from './Catalog.module.css'

export const Catalog = () => {
  const goodsList = [
    { title: 'Мясная бомба' },
    { title: 'Супер сырный' },
    { title: 'Сытный' },
    { title: 'Итальянский' },
    { title: 'Вечная классика' },
    { title: 'Тяжелый удар' },
  ]

  return (
    <section className={style.catalog}>
      <Container className={style.container}>
        <Order />

        <div className={style.wrapper}>
          <h2 className={style.title}>Бургеры</h2>

          <div className={style.wrap_list}>
            <ul className={style.list}>
              {goodsList.map((item) => (
                <li className={style.item}>
                  <CatalogProduct item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
