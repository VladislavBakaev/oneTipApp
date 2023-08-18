import { createAction } from '@reduxjs/toolkit';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const updateFriendsGroupsListAction = createAction(
  'UPDATE_FRIENDS_GROUPS_LIST_ACTION',
  withPayloadType<updateFriendsGroupsListType>(),
)
