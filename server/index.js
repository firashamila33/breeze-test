import express from "express";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { schema } from "./src/schema";

const server = express();

//allow cross origin for our client
server.use("*", cors({ origin: "http://localhost:3000" }));

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: "ws://localhost:3002/subscriptions"
  })
);

// wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

if (process.env.NODE_ENV === "production") {
  server.use(express.static("../client/build"));
  const path = require("path");
  server.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 3002;
ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on ${PORT}`);
  console.log(
    `open GraphiQL queries/mutations editor : http://localhost:3002/graphiql`
  );

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: "/subscriptions"
    }
  );
});
