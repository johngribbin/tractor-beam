import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

const enhancers = [];
const middleware = [ReduxThunk];

const persistConfig = {
  key: "root",
  storage
  //blacklist: ["permissionedAccount", "contractAccount"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default () => {
  const store = createStore(persistedReducer, {}, composedEnhancers);
  return { store, persistor: persistStore(store) };
};
