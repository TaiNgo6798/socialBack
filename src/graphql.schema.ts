
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface ArticleEditInput {
    _id?: string;
    content?: string;
    time?: string;
}

export interface ArticleInput {
    content: string;
    time: string;
}

export interface DishInput {
    name: string;
}

export interface UserInput {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export interface UserLoginInput {
    username?: string;
    password?: string;
}

export interface Article {
    _id?: string;
    content?: string;
    time?: string;
}

export interface Dish {
    _id?: string;
    name?: string;
}

export interface LoginRes {
    status?: string;
    message?: string;
    token?: string;
}

export interface IMutation {
    addArticle(article?: ArticleInput): Article | Promise<Article>;
    deleteArticle(articleID?: string): boolean | Promise<boolean>;
    updateArticle(article?: ArticleEditInput): boolean | Promise<boolean>;
    addDish(dish?: DishInput): Dish | Promise<Dish>;
    createUser(user?: UserInput): boolean | Promise<boolean>;
}

export interface IQuery {
    articles(): Article[] | Promise<Article[]>;
    getArticle(articleID?: string): Article | Promise<Article>;
    search(searchText?: string): string | Promise<string>;
    dishes(): Dish[] | Promise<Dish[]>;
    login(loginInput?: UserLoginInput): LoginRes | Promise<LoginRes>;
}

export interface User {
    _id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}
