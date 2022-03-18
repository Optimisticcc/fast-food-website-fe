import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "api/orderApi";

// export const createOrd = createAsyncThunk(
//   "/donhangs",
//   async (params, { rejectWithValue }) => {
//     try {
//       const save = await createOrder(params);
//       return save;
//     } catch (err) {
//       if (!err.response) throw err;
//       console.log(err.response, "---------");
//       return rejectWithValue(err.response.data.message);
//     }
//   }
// );

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: {},
    totalCount: 1,
    loading: false,
    payUrl: "",
    message: ''
  },
  reducers: {
    setMessage: (state,action) => {
      state.message = action.payload
    }
  },
  extraReducers: {
    // [createOrd.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.order = action.payload.data;
    //   if (action.payload.data.data.KieuThanhToan == "momo") {
    //     state.payUrl = action.payload.data.payUrl;
    //   }
    // },
    // [createOrd.rejected]: (state, action) => {
    //     state.message = action.payload
    // },
  },
});

const { reducer,actions } = orderSlice;
export const { setMessage } = actions
export default reducer;
