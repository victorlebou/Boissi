import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, timestamp } from "@keystone-6/core/fields";

export const drink = list({
    access: allowAll,
    fields: {
      size: integer({
        validation: { isRequired: true },
        
      }),
      type: select({
        type: 'enum',
        options: [
          { label: 'Beer', value: 'beer' },
          { label: 'Wine', value: 'wine' },
          { label: 'Liquor', value: 'liquor' },
          { label: 'Cocktail', value: 'cocktail' },
        ],
        db: { map: 'drink_type' },
        validation: { isRequired: true, },
        ui: { displayMode: 'select' },
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      alcoholPercentage: select({
        type: 'integer',
        options: [
          { label: '4%', value: 4 },
          { label: '5%', value: 5 },
          { label: '6%', value: 6 },
          { label: '11%', value: 11 },
          { label: '12%', value: 12 },
          { label: '13%', value: 13 },
          { label: '20%', value: 20 },
          { label: '30%', value: 30 },
          { label: '35%', value: 35 },
          { label: '40%', value: 40 },
        ],
        db: { map: 'alcool_percentage' },
        validation: { isRequired: true, },
        ui: { displayMode: 'select' },
    }),
    user: relationship({
        ref: 'User.drinks', 
        many: false
    }),
  },
  ui: { labelField: 'type' }
})