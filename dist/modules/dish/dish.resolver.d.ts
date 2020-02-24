import { Dish } from '../../graphql.schema'
export declare class DishResolvers {
    dishes(context: any): Promise<Dish[]>
    addDish(context: any, dish: any): Promise<unknown[]>
}
