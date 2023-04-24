import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategory = createAsyncThunk('category/fetch', async () => {
  console.log(process.env.REACT_APP_API_URI)
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URI}${process.env.REACT_APP_POSTFIX}/category`
  )
  console.log(data)
  return data
})

const initialState = {
  category: [],
  status: '',
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

  // СТАРОЕ
  // extraReducers: {
  //   [fetchCategory.pending]: (state) => {
  //     state.status = 'loading'
  //   },
  //   [fetchCategory.fulfilled]: (state, action) => {
  //     state.category = action.payload
  //     state.status = 'loaded'
  //   },
  //   [fetchCategory.rejected]: (state) => {
  //     state.category = []
  //     state.status = 'error'
  //   },
  // },

  // НОВОЕ RTK 2.0
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.status = 'loaded'
      state.category = action.payload
    })
    builder.addCase(fetchCategory.rejected, (state) => {
      state.status = 'error'
      state.category = []
    })
  },
})

export const { changeCategory } = categorySlice.actions
export default categorySlice.reducer
