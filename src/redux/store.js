import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './category/categorySlice'
import orderReducer, { localStorageMiddleWare } from './order/orderSlice'
import productReducer from './product/productSlice'
import modalDeliveryReducer from './modalDelivery/modalDeliverySlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    modalDelivery: modalDeliveryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleWare),
})
