import { applyMiddleware, createStore } from "redux";
import { thunk } from 'redux-thunk';
import rootReducer from "./store/reducers/rootReducer";

const reduxConfig = () => {

    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}
export default reduxConfig