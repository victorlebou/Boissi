import { graphql } from "@keystone-6/core";
import { virtual } from "@keystone-6/core/fields";
import { UserItem } from "./user-type";

export const contributionVf = virtual({
    field: graphql.field({
      type: graphql.Int,
      async resolve (item, args, context: any) {
        const user = item as UserItem;
        const userDrinks = await context.query.Drink.findMany({
            where: {user: {id: {equals: user.id}}}
        });
        console.log(userDrinks);
        const userDrinksCount = userDrinks.length;
        console.log(userDrinksCount);
        const totalDrinks = await context.query.Drink.count({});

        return  Math.round(userDrinksCount / totalDrinks * 100);
      }
    })
});