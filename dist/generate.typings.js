"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
const graphql_1 = require("@nestjs/graphql")
const path_1 = require("path")
const definitionsFactory = new graphql_1.GraphQLDefinitionsFactory()
definitionsFactory.generate({
    typePaths: ['./**/*.graphql'],
    path: path_1.join(process.cwd(), 'src/graphql.schema.ts')
})
//# sourceMappingURL=generate.typings.js.map