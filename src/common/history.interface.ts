import { IUser } from "./user.interface";

export interface IGetHistoriesRequest {
    size: number;
    offset: number;
    type: string;
}


export interface IHistory {
    method : string ;
    bookName : string;
    createdAt : Date ;
    admin : IUser;
}