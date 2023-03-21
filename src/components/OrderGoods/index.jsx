import React from 'react'
import { Count } from '../Count'

import style from './OrderGoods.module.css'

export const OrderGoods = ({ item }) => {
  return (
    <li className={style.item}>
      <img className={style.image} src="img/burger_1.jpg" alt={item.title} />

      <div className={style.goods}>
        <h3 className={style.title}>{item.title}</h3>

        <p className={style.weight}>512г</p>

        <p className={style.price}>
          1279
          <span className="currency">₽</span>
        </p>
      </div>

      <Count count={2} />
    </li>
  )
}
