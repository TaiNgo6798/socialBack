import { User, UserInfo } from 'src/graphql.schema';
export declare class UserResolver {
    users(context: any): Promise<User[]>;
    getUserByID(_id: any): Promise<UserInfo>;
    login(loginInput: any): Promise<any>;
    createUser(user: any): Promise<any>;
}
