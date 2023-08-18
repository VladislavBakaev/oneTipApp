import { createReducer } from '@reduxjs/toolkit';
import { setLogginInStateAction, } from '../actions/UserActions';

const initialState: UserStore = {
  isLoggedIn: false,
  isLoggingNow: false,
  logingError: {
    message: '',
    state: false,
  }
}

export const userReducer = createReducer(initialState, builder => {
  builder.addCase(setLogginInStateAction, (state, action) => {
    state.isLoggedIn = action.payload.state
    state.user = {
      accessKey: 'accessKey',
      refreshKey: 'refreshKey',
      firstName: 'Name',
      lastName: 'Surname',
      id: 1231231,
      avatar: ''
    }
    return state;
  });
})