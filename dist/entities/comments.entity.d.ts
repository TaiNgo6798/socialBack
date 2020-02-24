export declare class CommentEntity {
    _id: string;
    who: string;
    postID: string;
    text: string;
    time: number;
    constructor(args: Partial<CommentEntity>);
}
