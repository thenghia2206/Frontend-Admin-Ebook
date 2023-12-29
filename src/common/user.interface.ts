export interface IAdmin {
    email : string,
    password : string,
    fullName: string,
    phoneNumber: string,
    address: string,
    dob: Date,
    gender: boolean,
    role: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IUser {
    email : string,
    fullName: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IProfile {
    email : string,
    fullName: string,
    phoneNumber: string,
    address: string,
    dob: Date ,
    gender : true,
    createdAt: Date,
    updatedAt: Date,
}

export interface IGetUsersRequest {
    size: number;
    offset: number;
    search?: string;
    type: string
}

export interface IStatisticUser {
    totalUser: number,
    totalUserBlock: number
}

export interface ISellerRequest {
    isApproved?: boolean,
    identityCardNumber: string,
    vatCode: string,
    bankAccountNumber: string,
    bankName: string,
    bankBranch: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    dob: string
}

export interface IBill {
    total: number,
    createdAt: string,
    orderId: string,
    status: boolean,
    id: string,
    userName: string
}
