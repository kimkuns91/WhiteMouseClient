import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    darkMode : true
}

export const themeSlice = createSlice({
    name: "theme",
    initialState: { 
        value: initialStateValue
    },
    reducers: {
        themeModeChange : (state, action) => {
            state.value.darkMode = !state.value.darkMode
        },
    },
});

export const { themeModeChange } = themeSlice.actions;

export default themeSlice.reducer;
