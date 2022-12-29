import { UserItem } from "../user/user-type";

export type DrinkItem = {
    id: string;
    size: number;
    type: string;
    createdAt: Date;
    alcoholPercentage: number;
    user: UserItem;
}