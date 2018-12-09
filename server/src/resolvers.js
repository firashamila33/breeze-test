import { PubSub, withFilter } from "graphql-subscriptions";
import { CronJob } from "cron";
import faker from "faker";
import NodeCache from "node-cache";

const pubsub = new PubSub();
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const job = new CronJob("*/10 * * * * *", function() {
  var now = new Date();
  const newVisualization = {
    _id: Date.now(),
    createdAt: now.toTimeString().split(" ")[0],
    level: faker.random.number({ min: 100, max: 4000, precision: 0.01 })
  };
  pubsub.publish("newVisualization", {
    newVisualization
  });

  let visualizationList = [];
  let cachedVisualisations = myCache.get("co2Visualizations");
  if (cachedVisualisations) {
    visualizationList = cachedVisualisations;
  }
  visualizationList.unshift(newVisualization);
  myCache.set("co2Visualizations", visualizationList);
});
job.start();

export const resolvers = {
  Query: {
    visualizationList: () => {
      return myCache.get("co2Visualizations");
    }
  },
  Subscription: {
    newVisualization: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newVisualization"),
        (payload, variables) => {
          return true;
        }
      )
    }
  }
};
