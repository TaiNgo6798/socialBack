import { PostOutput } from '../../graphql.schema';
import { CommentService } from '../comment/comment.service';
import { UserResolver } from '../user/user.resolver';
export declare class PostResolver {
    private readonly commentService;
    private readonly userResolver;
    constructor(commentService: CommentService, userResolver: UserResolver);
    posts(context: any): Promise<PostOutput[]>;
    getOnePost(Context: any, _id: any): Promise<PostOutput>;
    likeAPost(context: any, postID: any): Promise<Boolean>;
    addPost(Context: any, post: any): Promise<Boolean>;
    deletePost(Context: any, id: any): Promise<Boolean>;
    updatePost(Context: any, post: any): Promise<Boolean>;
    likesChanged(): AsyncIterator<unknown, any, undefined>;
}
