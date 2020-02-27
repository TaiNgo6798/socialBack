import { UserEntity } from './user.entity';
export declare class LikeEntity {
    _id: string;
    who: UserEntity;
    postID: string;
    idWho: string;
    constructor(args: Partial<LikeEntity>);
}
