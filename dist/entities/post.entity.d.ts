import { UserEntity } from './user.entity';
export declare class PostEntity {
    _id: string;
    idWho: string;
    who: UserEntity;
    image: string;
    content: string;
    likes: any;
    time: number;
    constructor(args: Partial<PostEntity>);
}
