import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { META_SECTION_ID } from "../constants";

export interface AppState {
  mode: "edit" | "view";
  currentSectionId: string;
}

const initialState: AppState = {
  mode: "edit",
  currentSectionId: META_SECTION_ID,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === "edit" ? "view" : "edit";
    },
    moveSection: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },
  },
});

export const { changeMode, moveSection } = appSlice.actions;

export default appSlice.reducer;
