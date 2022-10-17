import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { pink } from "@mui/material/colors";
import { Observable } from "windowed-observable";
import { navigateToUrl } from "single-spa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useQuery, gql, useMutation } from "@apollo/client";



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
const Container = () => {
  const { loading, error, data } = useQuery(GET_CART_ITEMS, {
    variables: { userID: "user1" },
  });

  let badge_data = 0;


  if(data)
  {
    console.log("data is ", data.CartItems.length);
    badge_data = data.CartItems.length;

  }

  console.log("Badge data : ", badge_data);

  // const [notification, setNotification] = useState(
  //   localStorage.getItem("cart") == null
  //     ? 0
  //     : Object.keys(JSON.parse(localStorage.getItem("cart"))).length
  // );
  // const observable = new Observable("cart");
  // observable.subscribe((value) => setNotification(value), { latest: true });

  const [location, setLocation] = useState(window.location.pathname);
  console.log(location);

  return (
    <Box
      data-testid="nav"
      sx={{
        backgroundColor: "#f20a7e",
        margin: 0,
        height: "60px",
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingX: "5%",
      }}
    >
      <a href="/" onClick={navigateToUrl} style={{ textDecoration: "none" }}>
        <Box
          onClick={() => setLocation("/")}
          sx={{
            borderBottom: location == "/" && "1px solid white",
            marginLeft: "20px",
          }}
        >
          <Typography sx={{ color: "white" }}>Home</Typography>
        </Box>
      </a>

      <Box sx={{ marginLeft: "auto" }}>
        <Box
          sx={{
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <a
            href={`/calender`}
            onClick={navigateToUrl}
            style={{
              textDecoration: "none",
            }}
          >
            <CalendarTodayIcon sx={{ color: "white" }} />
          </a>

          <Badge badgeContent={badge_data} color="primary">
            <a
              href={`/cart`}
              onClick={navigateToUrl}
              style={{
                textDecoration: "none",
                // color: "black",
              }}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
            </a>
          </Badge>
          <Avatar sx={{ bgcolor: "#03abab" }}>A</Avatar>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
