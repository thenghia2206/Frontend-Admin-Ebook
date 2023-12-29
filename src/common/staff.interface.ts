export interface IStaff {
    email : string,
    fullName: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IGetStaffsRequest {
    size: number;
    offset: number;
    search?: string;
}

export interface IStaffChange {
    fullName? : string,
    phoneNumber? : string,
    address? : string,
    dob? : Date,
    gender? : boolean,
}