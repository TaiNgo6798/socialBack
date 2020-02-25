export declare class UserEntity {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    dob: number;
    gender: string;
    constructor(args: Partial<UserEntity>);
}
