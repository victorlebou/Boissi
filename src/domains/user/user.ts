import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, text, timestamp} from "@keystone-6/core/fields";
import { contributionVf } from "./user-contribution-virtual-field";

export const user = list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
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
      contribution: contributionVf 
    }}
);