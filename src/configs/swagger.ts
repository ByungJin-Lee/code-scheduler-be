import env from "./env";

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodeEvaluator API",
      version: "0.1.0",
      description: "The API document of CodeEvaluator",
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      // contact: {
      //   name: "LogRocket",
      //   url: "https://logrocket.com",
      //   email: "info@email.com",
      // },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ["./src/controllers/**/*.ts"],
};

export const specs = swaggerJsdoc(options);
