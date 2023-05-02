import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  orderList: JSON.parse(localStorage.getItem('order') || '[]'),
  orderGoods: [],
  totalPrice: 0,
  totalCount: 0,
  status: 'loading',
}

export const localStorageMiddleWare = (store) => (next) => (action) => {
  const nextAction = next(action)

  if (nextAction.type.startsWith('order/')) {
    const orderList = store.getState().order.orderList
    localStorage.setItem('order', JSON.stringify(orderList))
  }

  return nextAction
}

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (_, { getState }) => {
    const listId = getState().order.orderList.map((item) => item.id)

    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URI}${
        import.meta.env.VITE_POSTFIX
      }?list=${listId}`
    )
    return data
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.orderList.find(
        (item) => item.id === action.payload.id
      )

      if (product) {
        product.count += 1
      } else {
        state.orderList.push({ ...action.payload, count: 1 })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map((item) => {
          const product = action.payload.find(
            (product) => product.id === item.id
          )

          product.count = item.count

          return product
        })
        state.status = 'success'
        state.orderGoods = orderGoods
        state.totalPrice = orderGoods.reduce((acc, item) => {
          acc + item.count, 0
        })
        state.totalCount = orderGoods.reduce(
          (acc, item) => acc + item.count * item.price,
          0
        )
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = 'error'
        state.orderGoods = []
      })
  },
})

export const { addProduct } = orderSlice.actions
export default orderSlice.reducer
