import { getProducts } from "../services";

const resolvers = {
    Query: {
        Products(root: any, args: any, context: any) {
            return getProducts(args.request);
      },
    }
}

export default resolvers;