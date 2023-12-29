/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-debugger */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CheckboxOptionType, notification } from "antd";
import { catchError, concatMap, filter, map, mergeMap, switchMap } from "rxjs/operators";
import { RootEpic } from "../../common/define-type";
import Utils from "../../utils/base-utils";
import IdentityApi from "../../api/identity/identity.api";
import { QUERY_PARAM } from "../../constants/get-api.constant";
import { get } from "http";
import { IReport, IStatisticReport } from "../../common/report.interface";
import { IBook, IBookBestSeller, ICategory, ICreateBookReq } from "../../common/book.interface";
import BookApi from "../../api/book/book.api";
import CategoryApi from "../../api/categories/categories.api";
import { IStatisticUser, IUser } from "../../common/user.interface";
import UserApi from "../../api/user/user.api";
import { IStaff } from "../../common/staff.interface";
import StaffApi from "../../api/staff/staff.api";
import HistoryApi from "../../api/history/history.api";
import { IHistory } from "../../common/history.interface";
import { IAuthor } from "../../common/author.interface";
import { IPublisher } from "../../common/publisher.interface";
import AuthorApi from "../../api/author/author.api";
import PublisherApi from "../../api/publisher/publisher.api";
import { loginSlice } from "./login.slice";
import { IOrder } from "../../common/order.interface";
import OrderApi from "../../api/order/order.api";
import { IStatisticDay, IStatisticMonth, IStatisticOverview, IStatisticYear } from "../../common/statistical.interface";
import StatisticalApi from "../../api/statistical/statistical.api";


interface ManagementState {
    loading: boolean;
    bookList: IBook[];
    totalBookRecords : number;
    cover: any | undefined;
    detailBook : any | undefined;
    listCategory : ICategory[];
    addBookSuccess : boolean;
    statusCode: string | undefined;
    listUser: IUser[];
    totalUserRecords : number;
    listStaff : IStaff[];
    totalStaffRecords : number;
    listHistory : IHistory[] ;
    totalHistoryRecords : number;
    profile : any | undefined;
    listAuthor : IAuthor[];
    listPublisher : IPublisher[];
    categories : ICategory[];
    authors : IAuthor[];
    publishers : IPublisher[];
    totalCategoriesRecords : number;
    totalAuthorsRecords : number;
    totalPublishersRecords : number;
    userStatistic: IStatisticUser | undefined;
    listOrder : IOrder[];
    totalOrderRecords : number;
    detailOrder : any | undefined;
    bookBestSeller : IBookBestSeller[];
    overviewStatistical : IStatisticOverview | undefined;
    typeViewStatistic : String ;
    overViewStatisticDay : any | undefined;
    overViewStatisticMonth : any | undefined;
    overViewStatisticYear : any | undefined;
}

const initState: ManagementState = {
    loading: false,
    bookList:[],
    totalBookRecords : 0,
    cover: undefined,
    detailBook: undefined,
    listCategory:[],
    addBookSuccess : false,
    statusCode: undefined,
    listUser : [],
    totalUserRecords : 0,
    listStaff : [],
    totalStaffRecords : 0,
    listHistory : [],
    totalHistoryRecords : 0,
    profile : undefined,
    listAuthor : [],
    listPublisher : [],
    categories : [],
    publishers : [],
    authors : [],
    totalCategoriesRecords : 0,
    totalAuthorsRecords : 0,
    totalPublishersRecords : 0,
    userStatistic: undefined,
    listOrder : [],
    totalOrderRecords : 0,
    detailOrder : undefined,
    bookBestSeller : [],
    overviewStatistical : undefined,
    typeViewStatistic: 'day',
    overViewStatisticDay : undefined,
    overViewStatisticMonth :  undefined,
    overViewStatisticYear :  undefined,
};

export const managementSlice = createSlice({
    name: "management",
    initialState: initState,
    reducers: {

        //Get Book
        getBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.bookList = action.payload.items
            if(action.payload.total){
                state.totalBookRecords = action.payload.total
            }else{
                state.totalBookRecords = 0
            }  
        },

        getBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getDetailBookRequests(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getDetailBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.detailBook = action.payload

        },
        getDetailBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        //Get Category
        getCategoryRequest(state) {
            state.loading = true;
        },

        getCategorySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listCategory = action.payload
        },

        getCategoryFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        addBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        addBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: "Thêm sách thành công",
                // description:
                //     action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

            state.addBookSuccess = true;
        },

        addBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        setStatusCode(state, action: PayloadAction<string>) {
            state.statusCode = action.payload;
        },


        editBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Cập nhật sách thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật sách thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        deleteBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa sách thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deleteBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa sách không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },


        addCategoryRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        addCategorySuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: "Thêm thể loại thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        addCategoryFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get Author
        getAuthorRequest(state) {
            state.loading = true;
        },

        getAuthorSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listAuthor = action.payload
        },

        getAuthorFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        addAuthorRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        addAuthorSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: "Thêm tác giả thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        addAuthorFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get Publisher
        getPublisherRequest(state) {
            state.loading = true;
        },

        getPublisherSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listPublisher = action.payload
        },

        getPublisherFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        addPublisherRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        addPublisherSuccess(state, action: PayloadAction<any>) {
            state.loading = false;

            notification.open({
                message: "Thêm nhà xuất bản thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        addPublisherFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get User
        getUserRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getUserSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listUser = action.payload.items
            if(action.payload.total){
                state.totalUserRecords = action.payload.total
            }else{
                state.totalUserRecords = 0
            }    
        },

        getUserFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        //Get Staff
        getStaffRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getStaffSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listStaff = action.payload.items
            if(action.payload.total){
                state.totalStaffRecords = action.payload.total
            }else{
                state.totalStaffRecords = 0
            }    
        },

        getStaffFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get History
        getHistoryRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getHistorySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listHistory = action.payload.items
            if(action.payload.total){
                state.totalHistoryRecords = action.payload.total
            }else{
                state.totalHistoryRecords = 0
            }    
        },

        getHistoryFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get profile
        getProfileRequest(state) {
            state.loading = true;
        },

        getProfileSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.profile = action.payload
            Utils.setLocalStorage("userName", action.payload.fullName);
            
        },

        getProfileFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        getListCategoriesRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getListCategoriesSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.categories = action.payload.items
            if(action.payload.total){
                state.totalCategoriesRecords = action.payload.total
            }else{
                state.totalCategoriesRecords = 0
            }  
        },

        getListCategoriesFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getListAuthorsRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getListAuthorsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.authors = action.payload.items
            if(action.payload.total){
                state.totalAuthorsRecords = action.payload.total
            }else{
                state.totalAuthorsRecords = 0
            }  
        },

        getListAuthorsFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getListPublishersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getListPublishersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.publishers = action.payload.items
            if(action.payload.total){
                state.totalPublishersRecords = action.payload.total
            }else{
                state.totalPublishersRecords = 0
            }  
        },

        getListPublishersFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        editCategoryRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editCategorySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Cập nhật thể loại thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editCategoryFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật thể loại thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        editAuthorRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editAuthorSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Cập nhật tác giả thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editAuthorFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật tác giả thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },


        editPublisherRequest(state, action: PayloadAction<any>) {
            state.loading = true;
            
        },

        editPublisherSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Cập nhật nhà xuất bản thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            
        },

        editPublisherFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Cập nhật nhà xuất bản thất bại",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },


        deleteCategoryRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteCategorySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa thể loại thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deleteCategoryFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa thể loại không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },


        deleteAuthorRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteAuthorSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa tác giả thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deleteAuthorFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa tác giả không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },


        deletePublisherRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deletePublisherSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa nhà xuất bản thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deletePublisherFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa nhà xuất bản không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        deleteStaffRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        deleteStaffSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thành công",
                description: "Xóa nhân viên thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });

        },

        deleteStaffFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: "Thất bại",
                description: "Xóa sách không thành công",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        //Block user
        blockUsersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        blockUsersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Chặn người dùng thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        blockUsersFail(state, action: any) {
            state.loading = false;
        },


        //Unblock user
        unblockUsersRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        unblockUsersSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Bỏ chặn người dùng thành công',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });
        },
        unblockUsersFail(state, action: any) {
            state.loading = false;
        },


        //Get user statistic
        getUsersStatisticRequest(state) {
            state.loading = true;
        },
        getUsersStatisticSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.userStatistic = action.payload
        },
        getUsersStatisticFail(state, action: any) {
            state.loading = false;
        },

        forgotPasswordRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        forgotPasswordSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Tạo lại mật khẩu thành công!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        forgotPasswordFail(state, action: PayloadAction<any>) {
            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Tạo lại mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },

        forgotPasswordInfoRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        forgotPasswordInfoSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: 'Quên mật khẩu thành công. Vui lòng kiểm tra email để tạo lại mật khẩu!',
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
        },

        forgotPasswordInfoFail(state, action: PayloadAction<any>) {
            notification.open({
                message: action.payload.response?.message ? action.payload.response?.message : "Tạo lại mật khẩu không thành công!",
                onClick: () => {
                    console.log("Notification Clicked!");
                },
            });
            state.loading = false;
        },

        getOrderRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOrderSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.listOrder = action.payload.items
            if(action.payload.total){
                state.totalOrderRecords = action.payload.total
            }else{
                state.totalOrderRecords = 0
            }  
        },

        getOrderFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },


        getDetailOrderRequests(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getDetailOrderSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.detailOrder = action.payload

        },
        getDetailOrderFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        getTopBookRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getTopBookSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.bookBestSeller = action.payload.items 
        },

        getTopBookFail(state, action: PayloadAction<any>) {
            state.loading = false;
            notification.open({
                message: action.payload.response.message,
                onClick: () => {
                    console.log("Notification Clicked!");
                },
                style: {
                    marginTop: 50,
                    paddingTop: 40,
                },
            });

        },

        //Get overview statistic
        getStatisticOverviewRequest(state) {
            state.loading = true;
        },
        getStatisticOverviewSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.overviewStatistical = action.payload
        },
        getStatisticOverviewFail(state, action: any) {
            state.loading = false;
        },


        setViewStatistic(state, action: PayloadAction<string>) {
            state.typeViewStatistic = action.payload;
        },


                // Get overview statistic day
        getOverviewStatisticDayRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticDaySuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.overViewStatisticDay = action.payload.items;
        },

        getOverviewStatisticDayFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic month
        getOverviewStatisticMonthRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticMonthSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.overViewStatisticMonth = action.payload.items;
        },

        getOverviewStatisticMonthFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },

        // Get overview statistic year
        getOverviewStatisticYearRequest(state, action: PayloadAction<any>) {
            state.loading = true;
        },

        getOverviewStatisticYearSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.overViewStatisticYear = action.payload.items;
        },

        getOverviewStatisticYearFail(state, action: PayloadAction<any>) {
            state.loading = false;
            if (action.payload.status === 400 || action.payload.status === 404) {
                notification.open({
                    message: action.payload.response.message,
                    onClick: () => {
                        console.log("Notification Clicked!");
                    },
                });
            }
        },



    },
});


    const getBooks$: RootEpic = (action$) =>
    action$.pipe(
        filter(getBookRequest.match),
        mergeMap((re) => {
            return BookApi.getListBook(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getBookSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getBookFail(err)])
            );
        })
    );

    const getDetailBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailBookRequests.match),
        mergeMap((re) => {
            return BookApi.getDetailBook(re.payload.id).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getDetailBookSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getDetailBookFail(err)])
            )
        })
    );

    const getCategories$: RootEpic = (action$) =>
    action$.pipe(
        filter(getCategoryRequest.match),
        mergeMap((re) => {
            return CategoryApi.getListCategory(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getCategorySuccess(res.data),
                    ];
                }),
                catchError((err) => [managementSlice.actions.getCategoryFail(err)])
            );
        })
    );

    const getAuthors$: RootEpic = (action$) =>
    action$.pipe(
        filter(getAuthorRequest.match),
        mergeMap((re) => {
            return AuthorApi.getListAuthor(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getAuthorSuccess(res.data),
                    ];
                }),
                catchError((err) => [managementSlice.actions.getAuthorFail(err)])
            );
        })
    );

    const getPublishers$: RootEpic = (action$) =>
    action$.pipe(
        filter(getPublisherRequest.match),
        mergeMap((re) => {
            return PublisherApi.getListPublisher(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getPublisherSuccess(res.data),
                    ];
                }),
                catchError((err) => [managementSlice.actions.getPublisherFail(err)])
            );
        })
    );

    

    const addBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(addBookRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            let data = new FormData()
            const { title, categoryIds,description, authorIds,publisherId ,price } = re.payload;
            re.payload.file.forEach((element : any) => {
                data.append("file",element as File)
            });
            data.append("title",title)
            data.append("categoryIds",categoryIds)
            data.append("description",description)
            data.append("authorIds",authorIds)
            data.append("publisherId",publisherId)
            data.append("price",price)
            return BookApi.addBook(data).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.setLoading(false),
                        managementSlice.actions.setStatusCode(res.statusCode),
                        managementSlice.actions.addBookSuccess(res),
                        managementSlice.actions.getBookRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.addBookFail(err),
                ])
            );
        })
    );

    const editBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(editBookRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return BookApi.editBook(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.editBookSuccess(res.data),
                        managementSlice.actions.getBookRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [managementSlice.actions.editBookFail(err)])
            );
        })
    );

    const deleteBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteBookRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                id: re.payload.id
            }
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return BookApi.deleteBook(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.deleteBookSuccess(res.data),
                        managementSlice.actions.getBookRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.deleteBookFail(err)])
            );
        })
    );

    const addCategory$: RootEpic = (action$) =>
    action$.pipe(
        filter(addCategoryRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return CategoryApi.addCategory(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.setLoading(false),
                        managementSlice.actions.addCategorySuccess(res),
                        managementSlice.actions.getCategoryRequest(),
                        managementSlice.actions.getListCategoriesRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.addCategoryFail(err),
                ])
            );
        })
    );


    const addAuthor$: RootEpic = (action$) =>
    action$.pipe(
        filter(addAuthorRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return AuthorApi.addAuthor(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.setLoading(false),
                        managementSlice.actions.addAuthorSuccess(res),
                        managementSlice.actions.getAuthorRequest(),
                        managementSlice.actions.getListAuthorsRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.addAuthorFail(err),
                ])
            );
        })
    );


    const addPublisher$: RootEpic = (action$) =>
    action$.pipe(
        filter(addPublisherRequest.match),
        switchMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return PublisherApi.addPublisher(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.setLoading(false),
                        managementSlice.actions.addPublisherSuccess(res),
                        managementSlice.actions.getPublisherRequest(),
                        managementSlice.actions.getListPublishersRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.addPublisherFail(err),
                ])
            );
        })
    );



    //User
    const getUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUserRequest.match),
        mergeMap((re) => {
            return UserApi.getListUser(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getUserSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getUserFail(err)])
            );
        })
    );


    //Staff
    const getStaffs$: RootEpic = (action$) =>
    action$.pipe(
        filter(getStaffRequest.match),
        mergeMap((re) => {
            return StaffApi.getListStaff(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getStaffSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getStaffFail(err)])
            );
        })
    );

    //History
    const getHistories$: RootEpic = (action$) =>
    action$.pipe(
        filter(getHistoryRequest.match),
        mergeMap((re) => {
            return HistoryApi.getHistory(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getHistorySuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getHistoryFail(err)])
            );
        })
    );


    //Profile
    const getProfile$: RootEpic = (action$) =>
    action$.pipe(
        filter(getProfileRequest.match),
        mergeMap((re) => {
            return UserApi.getUserInfor(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getProfileSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getProfileFail(err)])
            );
        })
    );


    const getListCategories$: RootEpic = (action$) =>
    action$.pipe(
        filter(getListCategoriesRequest.match),
        mergeMap((re) => {
            return CategoryApi.getCategories(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getListCategoriesSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getListCategoriesFail(err)])
            );
        })
    );


    const getListAuthors$: RootEpic = (action$) =>
    action$.pipe(
        filter(getListAuthorsRequest.match),
        mergeMap((re) => {
            return AuthorApi.getAuthor(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getListAuthorsSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getListAuthorsFail(err)])
            );
        })
    );

    const getListPublishers$: RootEpic = (action$) =>
    action$.pipe(
        filter(getListPublishersRequest.match),
        mergeMap((re) => {
            return PublisherApi.getPublisher(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getListPublishersSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getListPublishersFail(err)])
            );
        })
    );

    const editCategory$: RootEpic = (action$) =>
    action$.pipe(
        filter(editCategoryRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return CategoryApi.editCategory(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.editCategorySuccess(res.data),
                        managementSlice.actions.getListCategoriesRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [managementSlice.actions.editCategoryFail(err)])
            );
        })
    );


    const editAuthor$: RootEpic = (action$) =>
    action$.pipe(
        filter(editAuthorRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return AuthorApi.editAuthor(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.editAuthorSuccess(res.data),
                        managementSlice.actions.getListAuthorsRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [managementSlice.actions.editAuthorFail(err)])
            );
        })
    );

    const editPublisher$: RootEpic = (action$) =>
    action$.pipe(
        filter(editPublisherRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return PublisherApi.editPublisher(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.editPublisherSuccess(res.data),
                        managementSlice.actions.getListPublishersRequest(bodyrequest)
                    ];
                }),
                catchError((err) => [managementSlice.actions.editPublisherFail(err)])
            );
        })
    );


    const deleteCategory$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteCategoryRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                id: re.payload.id
            }
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return CategoryApi.deleteCategory(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.deleteCategorySuccess(res.data),
                        managementSlice.actions.getListCategoriesRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.deleteCategoryFail(err)])
            );
        })
    );

    const deleteAuthor$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteAuthorRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                id: re.payload.id
            }
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return AuthorApi.deleteAuthor(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.deleteAuthorSuccess(res.data),
                        managementSlice.actions.getListAuthorsRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.deleteAuthorFail(err)])
            );
        })
    );

    const deletePublisher$: RootEpic = (action$) =>
    action$.pipe(
        filter(deletePublisherRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                id: re.payload.id
            }
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return PublisherApi.deletePublisher(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.deletePublisherSuccess(res.data),
                        managementSlice.actions.getListPublishersRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.deletePublisherFail(err)])
            );
        })
    );

    const deleteStaff$: RootEpic = (action$) =>
    action$.pipe(
        filter(deleteStaffRequest.match),
        mergeMap((re) => {
            const bodyrequest = {
                id: re.payload.id
            }
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0
            }
            return StaffApi.deleteStaff(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.deleteStaffSuccess(res.data),
                        managementSlice.actions.getStaffRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.deleteStaffFail(err)])
            );
        })
    );

    const blockUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(blockUsersRequest.match),
        mergeMap((re) => {
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0,
                type : "active",
            }
            const bodyrequest = {
                userId: re.payload.userId
            }
            return UserApi.blockUser(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.blockUsersSuccess(res.data),
                        managementSlice.actions.getUserRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.blockUsersFail(err)])
            );
        })
    );

    const unblockUsers$: RootEpic = (action$) =>
    action$.pipe(
        filter(unblockUsersRequest.match),
        mergeMap((re) => {
            const bodyrequest1 = {
                size: QUERY_PARAM.size,
                offset: 0,
                type : "block",
            }
            const bodyrequest = {
                userId: re.payload.userId
            }
            return UserApi.blockUser(bodyrequest).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.unblockUsersSuccess(res.data),
                        managementSlice.actions.getUserRequest(bodyrequest1)
                    ];
                }),
                catchError((err) => [managementSlice.actions.unblockUsersFail(err)])
            );
        })
    );

    const getUsersStatistic$: RootEpic = (action$) =>
    action$.pipe(
        filter(getUsersStatisticRequest.match),
        mergeMap((re) => {
            return UserApi.getStatisticUser().pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getUsersStatisticSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getUsersStatisticFail(err)]
                )
            );
        })
    );

    const forgotPassword$: RootEpic = (action$) => action$.pipe(
        filter(forgotPasswordRequest.match),
        switchMap((re) => {
            return StaffApi.forgotPassword(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        managementSlice.actions.forgotPasswordSuccess(res),
                    ];
                }),
                catchError(err =>
                    [managementSlice.actions.forgotPasswordFail(err)]
                )
            )
        })
    )

    const forgotPasswordInfo$: RootEpic = (action$) => action$.pipe(
        filter(forgotPasswordInfoRequest.match),
        switchMap((re) => {
            return StaffApi.fgPassword(re.payload).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    return [
                        managementSlice.actions.forgotPasswordInfoSuccess(res),
                    ];
                }),
                catchError(err =>
                    [managementSlice.actions.forgotPasswordInfoFail(err)]
                )
            )
        })
    )


    const getOrders$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOrderRequest.match),
        mergeMap((re) => {
            return OrderApi.getListOrder(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOrderSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getOrderFail(err)])
            );
        })
    );

    const getDetailOrder$: RootEpic = (action$) =>
    action$.pipe(
        filter(getDetailOrderRequests.match),
        mergeMap((re) => {
            return OrderApi.getDetailOrder(re.payload.id).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getDetailOrderSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getDetailOrderFail(err)])
            )
        })
    );


    const getTopBook$: RootEpic = (action$) =>
    action$.pipe(
        filter(getTopBookRequest.match),
        mergeMap((re) => {
            return BookApi.getBookBestSeller(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getTopBookSuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getTopBookFail(err)])
            );
        })
    );

    const getStatisticOverview$: RootEpic = (action$) =>
    action$.pipe(
        filter(getStatisticOverviewRequest.match),
        mergeMap((re) => {
            return StatisticalApi.getStatisticalOverview().pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getStatisticOverviewSuccess(res.data),
                    ];
                }),
                catchError((err) => [
                    managementSlice.actions.getStatisticOverviewFail(err)]
                )
            );
        })
    );

    const getOverviewStatisticDay$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticDayRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticalApi.getStatisticDay(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticDaySuccess(res.data),

                    ];
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticDayFail(err)])
            )
        }
        )
    );

    const getOverviewStatisticMonth$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticMonthRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticalApi.getStatisticMonth(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticMonthSuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticMonthFail(err)])
            );
        })
    );

    const getOverviewStatisticYear$: RootEpic = (action$) =>
    action$.pipe(
        filter(getOverviewStatisticYearRequest.match),
        mergeMap((re) => {
            console.log(re);
            return StatisticalApi.getStatisticYear(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        managementSlice.actions.getOverviewStatisticYearSuccess(res.data),
                    ]
                }),
                catchError((err) => [managementSlice.actions.getOverviewStatisticYearFail(err)])
            );
        })
    );


export const ManagementEpics = [
    getBooks$,
    getDetailBook$,
    getCategories$,
    addBook$,
    editBook$,
    deleteBook$,
    addCategory$,
    getUsers$,
    getStaffs$,
    getHistories$,
    getProfile$,
    getAuthors$,
    getPublishers$,
    addAuthor$,
    addPublisher$,
    getListCategories$,
    getListAuthors$,
    getListPublishers$,
    editCategory$,
    editAuthor$,
    editPublisher$,
    deleteCategory$,
    deleteAuthor$,
    deletePublisher$,
    deleteStaff$,
    blockUsers$,
    unblockUsers$,
    getUsersStatistic$,
    forgotPassword$,
    forgotPasswordInfo$,
    getOrders$,
    getDetailOrder$,
    getTopBook$,
    getStatisticOverview$,
    getOverviewStatisticDay$,
    getOverviewStatisticMonth$,
    getOverviewStatisticYear$,
];
export const {
    getBookRequest,
    getDetailBookRequests,
    getCategoryRequest,
    addBookRequest,
    editBookRequest,
    deleteBookRequest,
    addCategoryRequest,
    getUserRequest,
    getStaffRequest,
    getHistoryRequest,
    getProfileRequest,
    getAuthorRequest,
    getPublisherRequest,
    addAuthorRequest,
    addPublisherRequest,
    getListAuthorsRequest,
    getListCategoriesRequest,
    getListPublishersRequest,
    editCategoryRequest,
    editAuthorRequest,
    editPublisherRequest,
    deleteCategoryRequest,
    deleteAuthorRequest,
    deletePublisherRequest,
    deleteStaffRequest,
    blockUsersRequest,
    unblockUsersRequest,
    getUsersStatisticRequest,
    forgotPasswordRequest,
    forgotPasswordInfoRequest,
    getOrderRequest,
    getDetailOrderRequests,
    getTopBookRequest,
    getStatisticOverviewRequest,
    setViewStatistic,
    getOverviewStatisticDayRequest,
    getOverviewStatisticMonthRequest,
    getOverviewStatisticYearRequest,
} = managementSlice.actions;
export const managementReducer = managementSlice.reducer;
