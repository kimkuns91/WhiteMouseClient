import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    mode : 'grid'
}

export const projectSlice = createSlice({
    name: "project",
    initialState: { 
        value: initialStateValue
    },
    reducers: {
        modeChange: (state, action) => {
            state.value = action.payload
        }
    },
});

export const { modeChange } = projectSlice.actions;

export default projectSlice.reducer;