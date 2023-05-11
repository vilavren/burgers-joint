import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { calcTotalCount, calcTotalPrice } from '../../utils/calcTotal'

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
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id
      )

      if (productOrderList) {
        productOrderList.count += 1

        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id
        )
        productOrderGoods.count = productOrderList.count
        state.totalCount = calcTotalCount(state.orderGoods)
        state.totalPrice = calcTotalPrice(state.orderGoods)
      } else {
        state.orderList.push({ ...action.payload, count: 1 })
      }
    },
    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id
      )

      if (productOrderList.count > 1) {
        productOrderList.count -= 1

        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id
        )
        productOrderGoods.count = productOrderList.count
        state.totalCount = calcTotalCount(state.orderGoods)
        state.totalPrice = calcTotalPrice(state.orderGoods)
      } else {
        state.orderList = state.orderList.filter(
          (item) => item.id !== action.payload.id
        )
      }
    },
    clearOrder: (state) => {
      state.orderList = []
      state.orderGoods = []
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
        state.totalCount = calcTotalCount(orderGoods)
        state.totalPrice = calcTotalPrice(orderGoods)
      })

      .addCase(fetchOrder.rejected, (state) => {
        state.status = 'error'
        state.orderGoods = []
      })
  },
})

export const { addProduct, removeProduct, clearOrder } = orderSlice.actions
export default orderSlice.reducer
