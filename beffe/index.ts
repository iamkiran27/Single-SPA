import { ApolloServer } from 'apollo-server';
import CalenderModule from './calender';

const server = new ApolloServer({
  modules: [CalenderModule],
  formatError: (err) => {
    return new Error(err.message);
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
