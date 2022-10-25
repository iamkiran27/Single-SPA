import React, { useEffect, useState } from "react";
import axios from "axios";
import authClient from "./sdk/api";


import {
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { navigateToUrl } from "single-spa";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";

const UPDATRE_CART_ITEMS = gql`
  mutation ($request: UpdateCartItemRequest) {
    UpdateCartItem(request: $request)
  }
`;

const DELETE_FROM_CART = gql`
  mutation ($id: ID!) {
    RemoveItemFromCart(id: $id)
  }
`;

const GET_CART_ITEMS = gql`
  query ($userID: String!) {
    CartItems(userID: $userID) {
      id
      quantity
      product {
        id
        name
        description
        imageUrl
        price
        rating
      }
    }
  }
`;

const Cart = () => {


  const [cartData, setcartData] = useState();



    const [getCartData ,  { loading, error, data }  ] = useLazyQuery(GET_CART_ITEMS);

  
    const [mutateFunction, response] = useMutation(UPDATRE_CART_ITEMS);
  
    const [deleteFromCart, res] = useMutation(DELETE_FROM_CART);
  
    const handleSignIn = () => {
      // this.clearSession();
  
      let state = authClient.generateRandomValue();
      let nonce = authClient.generateRandomValue();
      // Store state and nonce parameters into the session, so we can retrieve them after
      // user will be redirected back with access token or code (since react state is cleared in this case)
      sessionStorage.setItem("state", state);
      sessionStorage.setItem("nonce", nonce);
  
      authClient.authorize(state, nonce);
    };


useEffect(() => {

  const hashes = authClient.parseHash();
  console.log("hashes ;", hashes.access_token);
  if(hashes.access_token == undefined && localStorage.getItem("userId"))
  {
    getCartData({variables : {userID : localStorage.getItem("userId")}}).then(res=>{ setcartData(res.data)})

  }
  else if(hashes.access_token == undefined && !localStorage.getItem("userId")) {
    handleSignIn()

  }

else if (hashes)
{
  console.log("Inside the hashes");
  authClient.getUserInfo(hashes.access_token).then((res) => {
      console.log("Res in calender : ", res);
      localStorage.setItem("userId", res.preferred_username      );  

    }).then(res => {
      getCartData({variables : {userID : localStorage.getItem("userId")}}).then(res=>{ setcartData(res.data)})

    })
}
 

 
}, [])

let sum = 0;


if(data) {
  
  console.log("Cart data is ", data);

    console.log("Cart data is ", data.CartItems);
    data.CartItems.map((value) => {
      sum += value.quantity * value.product.price;
    });
  }
  

  console.log("Sum  is : ", sum);

 
  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  return (
    <Grid marginTop={6}>
      {cartData && cartData.CartItems.length > 0 ? (
        <>
          <Grid container>
            {cartData.CartItems.map((value) => (
              <>
                <Grid key={value.id} item xs={10} marginY={3}>
                  <Grid container direction={"row"}>
                    <Grid item marginX={2} border="1px solid black">
                      <Box
                        component="img"
                        maxWidth="200px"
                        src={value.product.imageUrl}
                      />
                    </Grid>
                    <Grid item margin={1}>
                      <Grid container direction="column">
                        <a
                          href={`/pdp/${value.product.id}`}
                          onClick={navigateToUrl}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <Typography>{value.product.name}</Typography>
                        </a>
                        <Typography
                          marginY={2}
                          fontWeight="bold"
                          fontSize={"18px"}
                        >
                          ₹ {value.product.price}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={value.product.rating}
                          readOnly
                          precision={0.5}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Typography>
                          QTY:
                          <Button
                            onClick={() => {
                              if (value.quantity - 1 == 0) {
                                deleteFromCart({
                                  variables: {
                                    id: value.id,
                                  },
                                }).then((res) => window.location.reload());
                              } else {
                                mutateFunction({
                                  variables: {
                                    request: {
                                      cartItemID: value.id,
                                      quantity: value.quantity - 1,
                                    },
                                  },
                                }).then((res) => window.location.reload());
                              }
                            }}
                          
                          >
                            {" - "}
                          </Button>
                          {value.quantity}
                          <Button
                           
                            onClick={() => {
                              mutateFunction({
                                variables: {
                                  request: {
                                    cartItemID: value.id,
                                    quantity: value.quantity + 1,
                                  },
                                },
                              }).then((res) => window.location.reload());
                            }}
                          >
                            {" + "}
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} marginTop={4}>
                  <IconButton
                    onClick={() => {
                      deleteFromCart({
                        variables: {
                          id: value.id,
                        },
                      }).then((res) => window.location.reload());
                    }}
                  >
                    <DeleteIcon htmlColor="tomato" />
                  </IconButton>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid
            marginX={5}
            marginY={8}
            item
            xs
            display="flex"
            justifyContent="space-between"
          >
            <Typography color="white" fontWeight="bold" fontSize="20px">
              Total Price:{" "}
            </Typography>
            <Typography fontWeight="bold" fontSize="20px" marginRight="10rem">
              Total Price : ₹ {sum}
            </Typography>
          </Grid>
        </>
      ) : (
        <Typography variant="h4" sx={{ mx: "30%", my: "10%" }}>
          Sorry, your cart is empty !!
        </Typography>
      )}
    </Grid>
  );
};

export default Cart;
