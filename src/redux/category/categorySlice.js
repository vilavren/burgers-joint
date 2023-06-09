import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategory = createAsyncThunk('category/fetch', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URI}${import.meta.env.VITE_POSTFIX}/category`
  )
  return data
})

const initialState = {
  category: [],
  status: 'loading',
  activeCategory: 0,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory(state, action) {
      state.activeCategory = action.payload.indexCategory
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = 'success'
        state.category = action.payload
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.status = 'error'
        state.category = []
      })
  },
})

export const { changeCategory } = categorySlice.actions
export default categorySlice.reducer
