import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { decimal, float, password, relationship, select, text, timestamp} from "@keystone-6/core/fields";
import { bloodAlcohol } from "./blood-alcohol-concentration";
import { contributionVf } from "./user-contribution-virtual-field";

export const user = list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      sex: select({
        type: 'enum',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
        db: { map: 'sex' },
        validation: { isRequired: true, },
        ui: { displayMode: 'select' },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      drinks: relationship({
        ref: 'Drink.user', 
        many: true
    }),
      contribution: contributionVf,
      bloodAlcohol: bloodAlcohol,
      bloodAlcoholHistory: float({ validation: { isRequired: false } }),
    }}
);