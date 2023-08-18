import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import { createLogger } from 'redux-logger'

import { userReducer } from './reducers/UserReducer';
import { friendsReducer } from './reducers/FriendsReducer';
import { groupsReducer } from './reducers/GroupsReducer';

const logger = createLogger({
  level: {
    prevState: false,
    nextState: false,
  },
  colors: {
    title: () => 'inherit',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
    groups: groupsReducer 
  },
  middleware: defaultMiddleware =>
    defaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export function withAppStore<T>(WrappedComponent: React.FC<T>) {
  const ComponentWithStore = (props: T) => (
    <Provider store={store}>
      <WrappedComponent {...(props )} />
    </Provider>
  );
  return ComponentWithStore;
}