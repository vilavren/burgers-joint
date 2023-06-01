import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { closeModal } from '../modalDelivery/modalDeliverySlice'
import { clearOrder } from '../order/orderSlice'

const initialState = {
  name: '',
  phone: '',
  format: 'delivery',
  address: '',
  floor: '',
  intercom: '',
  status: 'loading',
  response: null,
}

export const submitForm = createAsyncThunk(
  'form/submit',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://cloudy-slash-rubidium.glitch.me/api/order',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`)
      }
      dispatch(closeModal())
      dispatch(clearOrder())
      return await response.json()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'success'
        state.response = action.payload
      })
      .addCase(submitForm.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export const { updateFormValue } = formSlice.actions
export default formSlice.reducer
