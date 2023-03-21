import React from 'react'
import style from './Count.module.css'

export const Count = ({ count }) => {
  return (
    <div className={style.count}>
      <button className={style.minus}>-</button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus}>+</button>
    </div>
  )
}
