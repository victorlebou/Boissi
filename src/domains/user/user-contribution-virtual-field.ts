import { graphql } from "@keystone-6/core";
import { virtual } from "@keystone-6/core/fields";
import { UserItem } from "./user-type";

export const contributionVf = virtual({
  field: graphql.field({
    type: graphql.Float,
    async resolve(item, args, context: any) {
      const user = item as UserItem;
      const userDrinks = await context.query.Drink.findMany({
        where: { user: { id: { equals: user.id } } },
      });
      const userDrinksCount = userDrinks.length;
      const totalDrinks = await context.query.Drink.count({});

      const result = parseFloat(
        (((userDrinksCount / totalDrinks) * 100) / 100).toFixed(2)
      );

      return !result ? 0 : result;
    },
  }),
});
