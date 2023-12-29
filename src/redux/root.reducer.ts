import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import {
    AppEpics,
    appReducer,
    BoostrapEpics,
    bootstrapReducer,
    ManagementEpics,
    managementReducer,
    LoginEpics,
    loginReducer
} from "./controller";

const rootReducer = combineReducers({
    app: appReducer,
    bootstrap: bootstrapReducer,
    login: loginReducer,
    management: managementReducer
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    ...AppEpics,
    ...ManagementEpics
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
