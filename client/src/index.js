import React from "react";
import ReactDOM from "react-dom";
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from "subscriptions-transport-ws";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "remote-redux-devtools";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

const networkInterface = createNetworkInterface({
  uri: "http://localhost:3002/graphql",
  credentials: "same-origin"
});
//GraphQL subscriptions / endpoint
const wsClient = new SubscriptionClient("ws://localhost:3002/subscriptions", {
  reconnect: true
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);
//to store all objects in appolo cach
function dataIdFromObject(result) {
  if (result.__typename) {
    if (result._id !== undefined) {
      return `${result.__typename}:${result._id}`;
    }
  }
  return null;
}
const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject
});

//setting up redux store and wraping up the redux devtool extention with reduxthunk middlware
const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.querySelector("#root")
);

serviceWorker.unregister();
