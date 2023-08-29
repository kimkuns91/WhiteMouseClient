import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    mode : 'grid'
}

export const postSlice = createSlice({
    name: "post",
    initialState: { 
        value: initialStateValue
    },
    reducers: {
        modeChange: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { modeChange } = postSlice.actions;

export default postSlice.reducer;