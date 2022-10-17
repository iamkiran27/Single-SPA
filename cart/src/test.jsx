import React, { useEffect, useState } from "react";
import axios from "axios";
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

const cart = () => {
  // const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] = useState(
  //   JSON.parse(localStorage.getItem("cart"))
  // );
  // const [sum, setSum] = useState(0);
  // const [qty, setQty] = useState({});

  // useEffect(() => {
  //   Object.keys(cartItems).map(async (key) => {
  //     const it = (await axios.get(`http://localhost:8080/products/${key}`))
  //       .data;
  //     setProducts((prev) => [...prev, { ...it }]);
  //     setQty((prev) => ({ ...prev, [key]: cartItems[key] }));
  //     if (!localStorage.getItem("price")) {
  //       localStorage.setItem("price", JSON.stringify({ [key]: it.price }));
  //     } else {
  //       const pr = JSON.parse(localStorage.getItem("price"));
  //       pr[key] = it.price;
  //       localStorage.setItem("price", JSON.stringify(pr));
  //     }
  //     console.log("key: " + qty[key]);
  //     console.log(it.price);
  //   });
  // }, []);
  // useEffect(() => {
  //   setSum(0);
  //   const prices = JSON.parse(localStorage.getItem("price"));
  //   Object.keys(qty).map((key) => {
  //     setSum((prev) => prev + prices[key] * qty[key]);
  //   });
  // }, [qty]);
  // const handle = () => {
  //   setSum(0);
  //   const prices = JSON.parse(localStorage.getItem("price"));
  //   const items = JSON.parse(localStorage.getItem("cart"));
  //   Object.keys(prices).map((key) => {
  //     setSum((prev) => prev + prices[key] * items[key]);
  //   });
  // };
  // const removeItem = (index) => {
  //   const temp = cartItems;
  //   delete temp[index];
  //   setCartItems({ ...temp });
  //   console.log(cartItems);
  //   console.log(temp);
  //   localStorage.setItem("cart", JSON.stringify(temp));
  //   location.reload();
  // };
 
 
  return (
    <Grid marginTop={6}>
      {products.length > 0 ? (
        <>
          <Grid container>
            {products.map((value) => (
              <>
                <Grid item xs={10} marginY={3}>
                  <Grid container direction={"row"}>
                    <Grid item marginX={2} border="1px solid black">
                      <Box
                        component="img"
                        maxWidth="200px"
                        src={value.imageUrl}
                      />
                    </Grid>
                    <Grid item margin={1}>
                      <Grid container direction="column">
                      <a
                            href={`/pdp/${value.id}`}
                            onClick={navigateToUrl}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          ><Typography>{value.name}</Typography>
                          </a>
                        <Typography
                          marginY={2}
                          fontWeight="bold"
                          fontSize={"18px"}
                        >
                          ₹ {value.price}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={value.rating}
                          readOnly
                          precision={0.5}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Typography>
                          QTY:
                          <Button
                            onClick={() => {
                              axios.put(
                                `http://localhost:8080/cart/${value.id}`,
                                {
                                  id: qty[value.id],
                                  quantity: qty[value.id] - 1,
                                }
                              );

                              let temp = qty[value.id];
                              temp -= 1;
                              setQty((prev) => ({
                                ...prev,
                                [value.id]: temp > 0 ? temp : 0,
                              }));
                              const it = JSON.parse(
                                localStorage.getItem("cart")
                              );
                              it[value.id] -= 1;
                              localStorage.setItem("cart", JSON.stringify(it));
                              handle();
                            }}
                          >
                            {" - "}
                          </Button>
                          {qty[value.id]}
                          <Button
                            onClick={() => {
                              axios.put(
                                `http://localhost:8080/cart/${value.id}`,
                                {
                                  id: qty[value.id],
                                  quantity: qty[value.id] + 1,
                                }
                              );

                              let temp = qty[value.id];
                              temp += 1;
                              setQty((prev) => ({ ...prev, [value.id]: temp }));
                              const it = JSON.parse(
                                localStorage.getItem("cart")
                              );
                              it[value.id] += 1;
                              localStorage.setItem("cart", JSON.stringify(it));
                              handle();
                              setQty((prev) => ({
                                [value.id]: qty[value.id] + 1,
                                ...prev,
                              }));
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
                      axios.delete(`http://localhost:8080/cart/${value.id}`);
                      removeItem(value.id);
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

export default cart;
