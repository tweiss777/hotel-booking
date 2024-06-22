import { createSlice } from "@reduxjs/toolkit";
type Dimension = {
    width: number;
    height: number;
};
const initialState: Dimension = {
    width: 0,
    height: 0,
};
export const dimensionSlice = createSlice({
    name: "dimension",
    initialState,
    reducers: {
        setHeight: (state) => {
           state.height = window.innerHeight;
        },
        setWidth: (state) => {
            state.width = window.innerWidth;
            console.log(state.width)
        }
        
    },
});
export const { setHeight, setWidth } = dimensionSlice.actions;
export default dimensionSlice.reducer;
