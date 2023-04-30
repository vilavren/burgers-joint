import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderList: JSON.parse(localStorage.getItem('order') || '[]'),
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducer: {
    addProduct: (state, action) => {
      const product = state.orderList.find(
        (item) => item.is === state.payload.id
      )

      if (product) {
        product.id += 1
      } else {
        state.orderList.push({ ...action.payload, count: 1 })
      }
    },
  },
})

export const { addProduct } = orderSlice.actions
export default orderSlice.reducer
