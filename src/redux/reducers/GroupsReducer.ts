import { createReducer } from '@reduxjs/toolkit';
import { updateFriendsGroupsListAction } from '../actions/GroupsActions';
const initialState: GroupsStore = { groups: [] }

export const groupsReducer = createReducer(initialState, builder => {
  builder.addCase(updateFriendsGroupsListAction, (state, action) => {
    state.groups = action.payload.groups
    return state;
  });
//   builder.addCase(updateRequestFriendsListAction, (state, action) => {
//     state.requestFriends = action.payload.requestFriends
//     return state;
//   })
})