export interface ArticleEditInput {
    _id?: string
    content?: string
    time?: string
}
export interface ArticleInput {
    content: string
    time: string
}
export interface UserInput {
    email: string
    password: string
    firstName: string
    lastName: string
}
export interface UserLoginInput {
    email?: string
    password?: string
}
export interface Article {
    _id?: string
    content?: string
    time?: string
}
export interface LoginRes {
    status?: string
    message?: string
    token?: string
}
export interface IMutation {
    addArticle(article?: ArticleInput): Article | Promise<Article>
    deleteArticle(articleID?: string): boolean | Promise<boolean>
    updateArticle(article?: ArticleEditInput): boolean | Promise<boolean>
    createUser(user?: UserInput): boolean | Promise<boolean>
    login(loginInput?: UserLoginInput): LoginRes | Promise<LoginRes>
}
export interface IQuery {
    articles(): Article[] | Promise<Article[]>
    getArticle(articleID?: string): Article | Promise<Article>
    search(searchText?: string): string | Promise<string>
    users(): User[] | Promise<User[]>
}
export interface User {
    _id?: string
    email?: string
    password?: string
    firstName?: string
    lastName?: string
}
