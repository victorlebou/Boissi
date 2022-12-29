import { graphql } from "@keystone-6/core";
import { virtual } from "@keystone-6/core/fields";
import { DrinkItem } from "../drink/drink-type";
import { UserItem } from "./user-type";

export const bloodAlcohol = virtual({
    field: graphql.field({
      type: graphql.Float,
      async resolve (item, args, context: any) {
        const user = item as UserItem;
        const userDrinks = await context.query.Drink.findMany({
            where: {user: {id: {equals: user.id}}},
            query: 'id size alcoholPercentage'
        })

        let bloodAlcohol = 0
        if (user.sex == 'male'){
            for(let drink of userDrinks){
                const drinkItem = drink as DrinkItem;

                const alcoholPercentage = drinkItem.alcoholPercentage;
                const size = drinkItem.size;
          
                bloodAlcohol += (size * alcoholPercentage * 0.01 * 0.8) / (80 * 0.7 * 10);
            }
        }
        else {
            for(let drink of userDrinks){
                drink = drink as DrinkItem;

                const alcoolPercentage = drink.alcoolPercentage;
                const size = drink.size;

                bloodAlcohol += (size * alcoolPercentage * 0.01 * 0.8) / (70 * 0.6 * 10);
            }
        }

        return parseFloat(bloodAlcohol.toFixed(3));
      }
    })
});
