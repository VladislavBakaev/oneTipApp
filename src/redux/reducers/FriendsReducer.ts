import { createReducer } from '@reduxjs/toolkit';
import { updateActialFriendsListAction, updateRequestFriendsListAction } from '../actions/FriendsActions';

const initialState: FriendsStore = {
  actualFriends: [],
  requestFriends: [],
}

export const friendsReducer = createReducer(initialState, builder => {
  builder.addCase(updateActialFriendsListAction, (state, action) => {
    state.actualFriends = action.payload.actualFriends
    return state;
  });
  builder.addCase(updateRequestFriendsListAction, (state, action) => {
    state.requestFriends = action.payload.requestFriends
    return state;
  })
})