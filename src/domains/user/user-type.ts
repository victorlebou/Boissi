import { DrinkItem } from "../drink/drink-type";

export type UserItem = {
    id: string;
    name: string;
    sex: string;
    email: string;
    password: string;
    createdAt: Date;
    drinks: Array<DrinkItem>;
    contribution: number;
    bloodAlcohol: number;
}