import { applyMiddleware, createStore } from "redux";
import { thunk } from 'redux-thunk';
import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist"


const reduxConfig = () => {

    const store = createStore(rootReducer, applyMiddleware(thunk))
    const persisttor = persistStore(store)
    return { store, persisttor }
}
export default reduxConfig