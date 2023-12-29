export interface IStatisticOverview {
    totalRevenue : number,
    totalBook : number,
    totalOrder : number,
    totalUser : number,
    totalStaff : number,
}

export interface IStatisticDay {
    totalRevenue : number,
    day : Date,
    createdAt : Date,
    updatedAt : Date,
    id : string,
}

export interface IStatisticMonth {
    totalRevenue : number,
    month : Date,
    createdAt : Date,
    updatedAt : Date,
    id : string,
}

export interface IStatisticYear {
    totalRevenue : number,
    year : Date,
    createdAt : Date,
    updatedAt : Date,
    id : string,
}

