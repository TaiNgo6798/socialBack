import { User } from 'src/graphql.schema'
export declare class UserResolver {
    users(context: any): Promise<User[]>
    login(loginInput: any): Promise<any>
    createUser(user: any): Promise<any>
}
