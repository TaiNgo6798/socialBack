import { CommentService } from '../comment/comment.service';
import { UserResolver } from '../user/user.resolver';
import { Post } from 'src/graphql.schema';
import { LikeResolver } from '../like/like.resolver';
import { LikeService } from '../like/like.service';
export declare class PostResolver {
    private readonly commentService;
    private readonly userResolver;
    private readonly likeResolver;
    private readonly likeService;
    constructor(commentService: CommentService, userResolver: UserResolver, likeResolver: LikeResolver, likeService: LikeService);
    posts(context: any, skip: any): Promise<Post[]>;
    getUserByID(p: any): Promise<import("../../entities/user.entity").UserEntity>;
    getLikes(post: any): Promise<import("../../graphql.schema").Like>;
    getOnePost(Context: any, _id: any): Promise<Post>;
    addPost(Context: any, post: any): Promise<Boolean>;
    deletePost(Context: any, id: any): Promise<Boolean>;
    updatePost(Context: any, post: any): Promise<Boolean>;
}
