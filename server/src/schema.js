import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
type co2Level {
  _id: ID!
  createdAt: String
  level: Float
}

type Query {
  visualizationList : [co2Level] 
}

type Subscription {
    newVisualization: co2Level
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
