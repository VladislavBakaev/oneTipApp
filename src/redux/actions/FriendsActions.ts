import { createAction } from '@reduxjs/toolkit';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const updateActialFriendsListAction = createAction(
  'UPDATE_ACTUAL_FRIENDS_LIST_ACTION',
  withPayloadType<UpdateActualFriendsListType>(),
)

export const updateRequestFriendsListAction = createAction(
  'UPDATE_REQUEST_FRIENDS_LIST_ACTION',
  withPayloadType<UpdateRequestFriendsListType>(),
)