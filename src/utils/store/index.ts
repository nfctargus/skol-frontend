import { configureStore } from '@reduxjs/toolkit';
import friendReducer from './friends/friendSlice';
import chatReducer from './chats/chatSlice';
import privateMessageReducer from './messages/privateMessageSlice';
export const store = configureStore({
    reducer: {
        friend:friendReducer,
        chat:chatReducer,
        privateMessage:privateMessageReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
