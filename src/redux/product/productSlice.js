import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProduct = createAsyncThunk(
  'product/fetch',
  async (category) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URI}${
        import.meta.env.VITE_POSTFIX
      }$category=${category}`
    )
    return data
  }
)

const initialState = {
  product: [],
  status: '',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.product = action.payload
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = 'error'
        state.product = []
      })
  },
})

export default productSlice.reducer
