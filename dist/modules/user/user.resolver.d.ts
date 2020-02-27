import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/graphql.schema';
export declare class UserResolver {
    users(context: any): Promise<User[]>;
    getUserByID(_id: any): Promise<UserEntity>;
    login(loginInput: any): Promise<any>;
    createUser(user: any): Promise<any>;
}
