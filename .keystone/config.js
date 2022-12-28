"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// src/domains/user/user.ts
var import_core2 = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");

// src/domains/user/user-contribution-virtual-field.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var contributionVf = (0, import_fields.virtual)({
  field: import_core.graphql.field({
    type: import_core.graphql.Int,
    async resolve(item, args, context) {
      const user2 = item;
      const userDrinks = await context.query.Drink.findMany({
        where: { user: { id: { equals: user2.id } } }
      });
      console.log(userDrinks);
      const userDrinksCount = userDrinks.length;
      console.log(userDrinksCount);
      const totalDrinks = await context.query.Drink.count({});
      return Math.round(userDrinksCount / totalDrinks * 100);
    }
  })
});

// src/domains/user/user.ts
var user = (0, import_core2.list)(
  {
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields2.text)({ validation: { isRequired: true } }),
      email: (0, import_fields2.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields2.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields2.timestamp)({
        defaultValue: { kind: "now" }
      }),
      drinks: (0, import_fields2.relationship)({
        ref: "Drink.user",
        many: true
      }),
      contribution: contributionVf
    }
  }
);

// src/domains/drink/drink.ts
var import_core3 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var drink = (0, import_core3.list)({
  access: import_access2.allowAll,
  fields: {
    size: (0, import_fields3.integer)({
      validation: { isRequired: true }
    }),
    type: (0, import_fields3.select)({
      type: "enum",
      options: [
        { label: "Beer", value: "beer" },
        { label: "Wine", value: "wine" },
        { label: "Liquor", value: "liquor" },
        { label: "Cocktail", value: "cocktail" }
      ],
      db: { map: "drink_type" },
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" }
    }),
    alcoolPercentage: (0, import_fields3.select)({
      type: "integer",
      options: [
        { label: "4%", value: 4 },
        { label: "5%", value: 5 },
        { label: "6%", value: 6 },
        { label: "11%", value: 11 },
        { label: "12%", value: 12 },
        { label: "13%", value: 13 },
        { label: "20%", value: 20 },
        { label: "30%", value: 30 },
        { label: "35%", value: 35 },
        { label: "40%", value: 40 }
      ],
      db: { map: "alcool_percentage" },
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    user: (0, import_fields3.relationship)({
      ref: "User.drinks",
      many: false
    })
  },
  ui: { labelField: "type" }
});

// schema.ts
var lists = {
  User: user,
  Drink: drink
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
} else {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
