import { gql } from 'apollo-server-express';

const schema = gql`
    extend type Query {
        CartItems(userID: String!): [CartItem]
    }

    extend type Mutation {
        AddItemtoCart(request: AddToCartRequest): ID!
        RemoveItemFromCart(id: ID!): ID!
        UpdateCartItem(request: UpdateCartItemRequest): ID!
    }

    type CartItem {
        id: ID!
        quantity: Int
        product: Product
    }

    input AddToCartRequest {
        userID: String!
        productID: String!
        quantity: Int!
    }

    input UpdateCartItemRequest {
        cartItemID: ID!
        quantity: Int!
    }

`;

export default schema;