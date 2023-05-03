import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import orderReducer, { localStorageMiddleWare } from './order/orderSlice'
import productReducer from './product/productSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleWare),
})
