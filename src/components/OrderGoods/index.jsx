import React from 'react'
import { Count } from '../Count'

import style from './OrderGoods.module.css'

export const OrderGoods = ({ title, price, image, count, id, weight }) => {
  return (
    <li className={style.item}>
      <img
        className={style.image}
        src={`${import.meta.env.VITE_API_URI}/${image}`}
        alt={title}
      />
      <div className={style.goods}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.weight}>{weight}г</p>
        <p className={style.price}>
          {price}
          <span className="currency">&nbsp;₽</span>
        </p>
      </div>
      <Count count={count} id={id} />
    </li>
  )
}
