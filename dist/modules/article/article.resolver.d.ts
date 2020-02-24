import { ArticleEntity } from '../../entities/article.entity'
import { Article } from '../../graphql.schema'
export declare class PostResolver {
    articles(context: any): Promise<Article[]>
    getArticle(Context: any, id: any): Promise<any>
    search(Context: any, searchText: any): Promise<any>
    addArticle(Context: any, article: any): Promise<ArticleEntity>
    deleteArticle(Context: any, id: any): Promise<any>
    updateArticle(Context: any, article: any): Promise<any>
}
