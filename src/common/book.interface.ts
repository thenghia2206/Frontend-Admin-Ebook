import { IPublisher } from "./publisher.interface";

export interface IBook {
    title : string,
    description : string,
    authors : string[],
    publisher : string,
    categories : string[],
    price : number,
    id : string,
    createdAt : string,
    image : string
}

export interface ICategory {
    createdAt : Date;
    name: string;
    id: string;
}

export interface IGetBooksRequest {
    size: number;
    offset: number;
    search?: string;
}

export interface IReqGetLatestBooks {
    size: number;
    offset: number;
}


export interface ICreateBookReq {
    file : any ,
    title : string,
    categoryIds : string[],
    description : string,
    authorIds : string[],
    publisherId : string,
    price : number,
}

export interface IEditBookReq {
    title? : string,
    description? : string,
    authors? : any,
    publisher? : any,
    categories? : any,
    price? : number,
    id? : string,
    image? : string,
}


export interface IBookBestSeller {
    id : string,
    image : string,
    sold : number,
    title : string,
}

