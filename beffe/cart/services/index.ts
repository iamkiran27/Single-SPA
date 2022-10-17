import axios from "axios";
import { properties } from "../../properties";

export const getCartItems = (userID: string): Promise<any> => {
  console.log("Request made!!!!");

  return new Promise<any>((resolve, reject) => {
    axios({
      method: "get",
      url: `${properties.DB_URL}/cart?userID=${userID}`,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const addItemtoCart = (request: any): Promise<any> => {
  const data: any = {
    userID: request.userID,
    productID: request.productID,
    quantity: request.quantity,
  };

  return new Promise<any>((resolve, reject) => {
    axios({
      method: "post",
      url: `${properties.DB_URL}/cart`,
      data,
    })
      .then((res) => {
        resolve(res.data.id);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const removeItemFromCart = (cartItemID: string): Promise<any> => {
  console.log("Inside delete cart");

  return new Promise<any>((resolve, reject) => {
    axios({
      method: "delete",
      url: `${properties.DB_URL}/cart/${cartItemID}`,
    })
      .then((res) => {
        resolve(cartItemID);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const updateCartItem = (request: any): Promise<any> => {
  console.log("Inside update cart item");

  const data = {
    quantity: request.quantity,
  };

  return new Promise<any>((resolve, reject) => {
    axios({
      method: "patch",
      url: `${properties.DB_URL}/cart/${request.cartItemID}`,
      data,
    })
      .then((res) => {
        resolve(res.data.id);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
