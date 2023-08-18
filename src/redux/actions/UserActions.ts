import { createAction } from '@reduxjs/toolkit';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const setLogginInStateAction = createAction(
  'USER_SET_LOGGIN_IN_STATE_ACTION',
  withPayloadType<SetLogginInStatePayload>(),
)
