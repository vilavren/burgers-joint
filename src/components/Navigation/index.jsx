import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Container } from '../Container'
import style from './Navigation.module.css'
import {
  changeCategory,
  fetchCategory,
} from '../../redux/category/categorySlice'

export const Navigation = () => {
  const { category, activeCategory } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          {category.map((item, i) => (
            <li key={item.title} className={style.item}>
              <button
                className={classNames(
                  style.button,
                  style.button_burger,
                  activeCategory === i ? style.button_active : ''
                )}
                style={{
                  backgroundImage: `url(${import.meta.env.VITE_API_URI}/${
                    item.image
                  })`,
                }}
                onClick={() => {
                  dispatch(changeCategory({ indexCategory: i }))
                }}
              >
                {item.rus}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
