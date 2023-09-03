import { createReducer } from '@reduxjs/toolkit';
import { updateLoadingState } from '../actions/MainAppActions';
const initialState: MainAppStore = { isLoading: false }

export const mainAppReducer = createReducer(initialState, builder => {
  builder.addCase(updateLoadingState, (state, action) => {
    state.isLoading = action.payload.state
    return state;
  });
})