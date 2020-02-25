import { UserResolver } from '../user/user.resolver';
import { CommentOutput } from '../../graphql.schema';
export declare class CommentResolver {
    private readonly userResolver;
    constructor(userResolver: UserResolver);
    getCommentsByPostID(postID: any): Promise<CommentOutput[]>;
    editOneComment(editInput: any): Promise<Boolean>;
    postOneComment(context: any, commentInput: any): Promise<Boolean>;
    commentCreated(): AsyncIterator<unknown, any, undefined>;
}
