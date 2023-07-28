import { legacy_createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

//持久化存储
import { persistReducer, persistStore } from 'redux-persist';
import storageLocation from 'redux-persist/lib/storage';//存储到localStorage
//import storageSession  from 'redux-persist/lib/storage/session';  //sessionStorage

//支持异步action
import thunk from 'redux-thunk'
import reducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: storageLocation,  //指定存储到session中
}

const persistedReducer = persistReducer(
  persistConfig,
  reducer
)

export const store = legacy_createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistore = persistStore(store)


// 从 store 本身推断出 `RootState` 和 `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;

// 类型推断: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;