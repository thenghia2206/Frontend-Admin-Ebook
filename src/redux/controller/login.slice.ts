/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { WritableDraft } from "immer/dist/internal";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
// import IdentityApi from "../../api/identity.api";
import { RootEpic } from "../../common/define-type";
import Utils from "../../utils/base-utils";
import IdentityApi from "../../api/identity/identity.api";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { managementSlice } from "./management.slice";
import StaffApi from "../../api/staff/staff.api";

type MessageLogin = {
    content: string;
    errorCode?: number;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    statusCode: string | undefined;
    tokenLogin: string | undefined;
    isExistEmail: boolean;
    registerSuccess: boolean;
    userName: string | undefined;
    userMail: string | undefined;
    userPhone: string | undefined;
    accesstokenExpỉred: boolean;
    userRole: string;
}

const initState: LoginState = {
    loading: false,
    isSuccess: true,
    userName: Utils.getValueLocalStorage("userName"),
    userMail: Utils.getValueLocalStorage("userMail"),
    userPhone: Utils.getValueLocalStorage("userPhone"),
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: "",
    statusCode: undefined,
    tokenLogin: Utils.getValueLocalStorage("token"),
    isExistEmail: true,
    registerSuccess: false,
    accesstokenExpỉred: true,
    userRole: Utils.getValueLocalStorage("role"),
};

export const loginSlice = createSlice({
    name: "login",
    initialState: initState,
    reducers: {
        loginRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<any>) {
            if(action.payload.role==="Admin" || action.payload.role==="Staff"){
                Utils.setLocalStorage("token", action.payload.accessToken);
                Utils.setLocalStorage("refresh_token", action.payload.refreshToken);
                Utils.setLocalStorage("role", action.payload.role);
    
                state.userRole = action.payload.role;
                state.tokenLogin = action.payload.accessToken;
                state.loading = false;
                state.isSuccess = true;
                state.accesstokenExpỉred = false;
                notification.open({
                    message: "Đăng nhập thành công",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        marginTop: 50,
                        paddingTop: 40,
                    },
                });
            } else {
                notification.open({
                    message: "Bạn không phải admin",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        marginTop: 50,
                        paddingTop: 40,
                    },
                });
            }
        },
        loginFail(state, action: any) {
            state.loading = false;
            state.accesstokenExpỉred = true;

            notification.open({
                message: "Đăng nhập không thành công",
                description: "Hãy kiểm tra lại thông tin đăng nhập.",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    paddingTop: 40,
                },
            });
            state.message = action.payload.message;
        },
        checkAbleToLogin(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        getUserInfoRequest(state, action: PayloadAction<any>) {
            state.tokenLogin = action.payload;
            state.loading = true;
        },
        getUserInfoSuccess(
            state,
            action: PayloadAction<{ user: any; token: string }>
        ) {
            Utils.setLocalStorage("userName", action.payload.user.fullName);
            Utils.setLocalStorage("userMail", action.payload.user.email);
            state.userName = action.payload.user.fullName;
            state.loading = false;
            state.isSuccess = true;
            state.accesstokenExpỉred = false;
        },
        getUserInfoFail(state, action: any) {
            Utils.removeItemLocalStorage("userName");
            Utils.removeItemLocalStorage("userMail");
            state.message = action.payload?.message;
            state.accesstokenExpỉred = true;
            state.loading = false;


        },

        checkEmailRequest: (state, action: PayloadAction<string>) => {
            state.isExistEmail = true;
            state.loading = true;
        },
        checkEmailSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;

            state.isExistEmail = action.payload.exist;
            if (action.payload.exist) {
                notification.open({
                    message: "Email đã tồn tại",
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                    style: {
                        marginTop: 40,
                    },
                });
            }
        },
        checkEmailFailed(state, action: PayloadAction<boolean>) {
            // state.loading = action.payload;
            state.loading = false;

        },
       
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false;
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false;
        },
        clearMessageResquest(state) {
            state.loading = true;
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
        },
        setStatusCode(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },
        clearAllRequest(state) {
            state.loading = true;
            state.statusCode = undefined;
            // state.user = undefined;
        },

        registerRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            state.registerSuccess = false;
        },

        registerSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: "Thêm nhân viên thành công! Vui lòng kiểm tra email.",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

            // state.user = action.payload.user
            state.isSuccess = true;
            state.registerSuccess = true;
        },

        registerFail(state, action: PayloadAction<any>) {

            notification.open({
                message: "Đăng ký không thành công",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
            state.registerSuccess = false;
        },

        changePasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        changePasswordSuccess(state, action: PayloadAction<any>) {
            console.log(action.payload);
            state.loading = false;
            notification.open({
                message: 'Đổi mật khẩu thành công!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        changePasswordFail(state, action: PayloadAction<any>) {
            console.log(action);

            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Đổi mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },

        editProfileRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            Utils.setLocalStorage("userName",action.payload.fullName)
            state.userName = action.payload.fullName
            notification.open({
                message: "Thành công",
                description: "Cập nhật thông tin thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editProfileFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật thông tin thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

    },
});

const login$: RootEpic = (action$) =>
    action$.pipe(
        filter(loginRequest.match),
        mergeMap((re) => {
            const body: any = {
                email: re.payload.email,
                password: re.payload.password,
                remember: true,
                additionalProp1: {},
            };

            return IdentityApi.login(body).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.loginSuccess(res.data),
                        loginSlice.actions.getUserInfoRequest(res.data.accessToken),
                        loginSlice.actions.setLoading(false),   
                        loginSlice.actions.setStatusCode(res.statusCode),
                        
                    ];
                }),
                catchError((err) => [loginSlice.actions.loginFail(err)])
            );
        })
    );

const clearMessage$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearMessageResquest.match),
        map(() => {
            return loginSlice.actions.clearMessage();
        })
    );

const logOut$: RootEpic = (action$) =>
    action$.pipe(
        filter(clearAllRequest.match),
        mergeMap(() => {
            return [
                loginSlice.actions.clearAllRequest(),
                loginSlice.actions.setLoading(false),
            ];
        })
    );

const register$: RootEpic = (action$) =>
    action$.pipe(
        filter(registerRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            const body: any = {
                email: re.payload.email,
                fullName: re.payload.fullName,
                phoneNumber: re.payload.phoneNumber,
                address: re.payload.address,
                dob: re.payload.dob,
                gender: re.payload.gender,
                additionalProp1: {},
            };
            return IdentityApi.reqister(body).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.setLoading(false),
                        loginSlice.actions.setStatusCode(res.statusCode),
                        loginSlice.actions.registerSuccess(res),
                        managementSlice.actions.getStaffRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [
                    loginSlice.actions.setStatusCode("UniqueEmail"),
                    loginSlice.actions.registerFail(err),
                ])
            );
        })
    );
const getUserInfo$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUserInfoRequest.match),
        switchMap((re) => {
            return IdentityApi.getUserInfo(re.payload).pipe(
                mergeMap((res: any) => {
                    const token = res.data.accessToken;
                    const user = {
                        email: res.data.email,
                        fullName: res.data.fullName,
                        createdAt: res.data.createdAt,
                        updatedAt: res.data.updatedAt,
                    };
                    return [
                        loginSlice.actions.getUserInfoSuccess({
                            user,
                            token: token,
                        }),
                    ];
                }),
                catchError((err) => [loginSlice.actions.getUserInfoFail(err)])
            );
        })
    );

    const changePassword$: RootEpic = (action$) => action$.pipe(
        filter(changePasswordRequest.match),
        switchMap((re) => {
            return StaffApi.changePassword(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        loginSlice.actions.changePasswordSuccess(res),
                    ];
                }),
                catchError(err =>
                    [loginSlice.actions.changePasswordFail(err)]
                )
            )
        })
    )

    const editProfile$: RootEpic = (action$) =>
    action$.pipe(
        filter(editProfileRequest.match),
        mergeMap((re) => {
            return StaffApi.editProfile(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        loginSlice.actions.editProfileSuccess(res.data),
                        managementSlice.actions.getProfileSuccess(res.data)
                    ];
                }),
                catchError((err) => [loginSlice.actions.editProfileFail(err)])
            );
        })
    );


export const LoginEpics = [
    login$,
    clearMessage$,
    logOut$,
    register$,
    getUserInfo$,
    changePassword$,
    editProfile$,
];
export const {
    getUserInfoRequest,
    loginRequest,
    checkEmailRequest,
    clearMessageResquest,
    clearAllRequest,
    registerRequest,
    checkAbleToLogin,
    changePasswordRequest,
    editProfileRequest,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
