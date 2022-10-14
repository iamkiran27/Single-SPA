import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        Products(request: GetProductsRequest): [Product]

    }

    input GetProductsRequest {
        ids: [ID]
    }

    type Product {
        id: ID!
        name: String
        imageUrl: String
        price: Int
        rating: Float
        description: String
    }
`;

export default schema;