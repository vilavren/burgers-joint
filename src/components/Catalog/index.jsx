import React, { useEffect } from 'react'
import { CatalogProduct } from '../CatalogProduct'
import { Container } from '../Container'
import { Order } from '../Order'
import style from './Catalog.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/product/productSlice'

export const Catalog = () => {
  const dispatch = useDispatch()
  const { category, activeCategory } = useSelector((state) => state.category)
  const { product, status } = useSelector((state) => state.product)

  const isProductLoading = status === 'success'

  useEffect(() => {
    if (category.length) {
      dispatch(fetchProduct(category[activeCategory].title))
    }
  }, [category, activeCategory])

  return (
    <section className={style.catalog}>
      <Container className={style.container}>
        <Order />

        <div className={style.wrapper}>
          <h2 className={style.title}>Бургеры</h2>

          <div className={style.wrap_list}>
            <ul className={style.list}>
              {isProductLoading
                ? product.map((item) => (
                    <CatalogProduct key={item.title} item={item} />
                  ))
                : ''}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
