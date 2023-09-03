import { createAction } from '@reduxjs/toolkit';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const updateLoadingState = createAction(
  'UPDATE_LOADING_STATE',
  withPayloadType<UpdateLoadingState>(),
)