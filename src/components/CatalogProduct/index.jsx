import React from 'react'
import style from './CatalogProduct.module.css'

export const CatalogProduct = ({ item }) => {
  return (
    <li className={style.item}>
      <article className={style.product}>
        <img
          src={`${import.meta.env.VITE_API_URI}/${item.image}`}
          alt={item.title}
          className={style.image}
        />

        <p className={style.price}>
          {item.price}
          <span className="currency">₽</span>
        </p>

        <h3 className={style.title}>
          <button className={style.detail}>{item.title}</button>
        </h3>

        <p className={style.weight}>{`${item.weight} г.`}</p>

        <button className={style.add} type="button">
          Добавить
        </button>
      </article>
    </li>
  )
}
