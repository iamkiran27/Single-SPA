import { ApolloServer } from "apollo-server";
import ProductModule from "./product";
import CartModule from "./cart";
import CalenderModule from "./calender";

const server = new ApolloServer({
  cors: {
    origin: "*",
    credentials: true,
  },
  modules: [ProductModule, CartModule, CalenderModule],
  formatError: (err) => {
    return new Error(err.message);
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
