import { getProducts } from "../../product/services";
import { addItemtoCart, getCartItems,  removeItemFromCart, updateCartItem } from "../services";

const resolvers = {
    Query: {
        CartItems(root: any, args: any, context: any) {
            return getCartItems(args.userID);
      },
    },
    Mutation: {
        AddItemtoCart(root: any, args: any, context: any) {
            return addItemtoCart(args.request);
        },
        RemoveItemFromCart(root: any, args: any, context: any) {
            return removeItemFromCart(args.id);
        },
        UpdateCartItem(root: any, args: any, context: any) {
            return updateCartItem(args.request);
        },
    },
    CartItem: {
        product(root: any, args: any, context: any) {
            let getProductRequest = {
                ids: [root.productID]
            }
            return getProducts(getProductRequest).then(res => res[0]);
        }
    }
}

export default resolvers;