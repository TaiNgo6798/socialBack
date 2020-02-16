import { User } from 'src/graphql.schema';
export declare class UserResolver {
    login(loginInput: any): Promise<any>;
    users(): Promise<User[]>;
    createUser(user: any): Promise<any>;
}
