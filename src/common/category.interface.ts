export interface ILoginRequest{
    email: string;
    password: string;
    remember?: boolean;
}

export interface ICategory{
    id : string;
    name: string;
    createdAt: boolean;
}