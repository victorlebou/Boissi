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
        let timeOfFirstDrink;
        if (user.sex == 'male'){
            for(let drink of userDrinks){
                const drinkItem = drink as DrinkItem;

                const alcoholPercentage = drinkItem.alcoholPercentage;
                const size = drinkItem.size;
          
                bloodAlcohol += (size * alcoholPercentage * 0.01 * 0.8) / (80 * 0.7 * 10);
            }
            //const drinkItem = userDrinks.get(0) as DrinkItem;
            //const timestart = drinkItem.createdAt
            //const timeElapsed = Date.now() - +(timestart)
            //bloodAlcohol -= timeElapsed * 0.015
        }
        else {
            for(let drink of userDrinks){
                drink = drink as DrinkItem;

                const alcoolPercentage = drink.alcoolPercentage;
                const size = drink.size;

                bloodAlcohol += (size * alcoolPercentage * 0.01 * 0.8) / (70 * 0.6 * 10);
            }
        }
        const updatedResult = await context.query.User.updateOne({
            where: {id: user.id},
            data: {
                bloodAlcoholHistory: parseFloat(bloodAlcohol.toFixed(3))
            },
            query: 'id'
        })

        return parseFloat(bloodAlcohol.toFixed(3));
      }
    })
});
