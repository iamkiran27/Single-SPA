import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button,Rating } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import axios from "axios";
import { Observable } from "windowed-observable";
// import StarRateIcon from '@mui/icons-material/StarRate';
function App() {
  const [prod, setprod] = useState({});
  const observable = new Observable("cart");
  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    if(id==undefined) id=1;

    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => setprod({ ...res.data }))
      .catch((err) => console.log(err));
  }, []);

  let cart = {};
  const starImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZdmJ9_hr5UUsGC5__u0btapjLcoYROBYCvWVTwqu8LiMX1K-pg6Z8Wg4m8ryEs9s9Z3k&usqp=CAU";

  const addToCart = async () => {
    const id = prod.id;
    axios
      .get(`http://localhost:8080/cart/${prod.id}`)
      .then(async (res) => {
        const updatedQuantity = res.data.quantity + 1;
        await axios
          .put(`http://localhost:8080/cart/${prod.id}`, {
            id: id,
            quantity: updatedQuantity,
          })
          .then((resp) => {
            console.log(resp.data);

            const data = JSON.parse(localStorage.getItem("cart"));
            data[resp.data.id] = updatedQuantity;
            observable.publish(Object.keys(data).length)
            localStorage.setItem("cart", JSON.stringify(data));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(async (err) => {
        await axios
          .post(`http://localhost:8080/cart`, {
            id: id,
            quantity: 1,
          })
          .then((resp) => {
            let data = JSON.parse(localStorage.getItem("cart"));
            console.log("Data : ", data);
            if (data == null) {
              data = {};
              data[resp.data.id] = 1;
              localStorage.setItem("cart", JSON.stringify(data));
            } else {
              data[resp.data.id] = 1;
              localStorage.setItem("cart", JSON.stringify(data));
            }
            observable.publish(Object.keys(data).length)
          });
      });
  };

  console.log("Path : ", window.location.pathname);
  return (
    <div>
      <Grid
        container
        alignItems="left"
        marginTop={6}
        sx={{
          alignItems: "left",
          justifyContent: "left",
          pt: 5,
          pl: "8%",
          pr: "10%",
          flexDirection: "row",
        }}
      >
        <Grid>
          <Grid item xs={6} sx={{ maxWidth: "30%" }}>
            <Grid
              sx={{
                borderRadious: 15,
              }}
            >
              <Box
                sx={{
                  borderRadious: "8px",
                }}
              >
                <img
                  src={prod.imageUrl}
                  height="750px"
                  width="600px"
                  style={{ borderRadius: 12 }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            alignItems: "left",
            justifyContent: "left",
            pl: 10,
            flexDirection: "row",
          }}
        >
          <Typography variant="h4" sx={{ pt: 3, pb: 5, color: "#00001a" }}>
            {prod.name}
          </Typography>
          <Grid item sx={{ pb: 3, display: "flex", color: "#00004d",alignItems:'center' }}>
            <Typography variant="h6" sx={{ pt: -6,pr:1 }}>
              Rating: 
            </Typography>
            <Rating name="read-only" readOnly value={prod.rating ?? 0} precision={0.5} />
            {/* <Box
              sx={{
                borderRadious: "8px",
                pt: "4px",
              }}
            >
              <img src={starImgUrl} height="20" />
            </Box> */}
          </Grid>
          <Typography variant="h5" sx={{ pt: -6 }}>
            Price: ₹{prod.price}{" "}
          </Typography>
          <Grid sx={{ pb: 3 }} py={2}>
            <Button
              variant="outlined"
              onClick={addToCart}
              sx={{
                width: "222px",
                color: "green",
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              ADD TO CART
            </Button>
          </Grid>
          <Typography variant="h6" sx={{ pb: 1, color: "#000033" }}>
            Available offers
          </Typography>
          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWait: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer10% off on Axis Bank Credit Card and Credit Card EMI
              Trxns,up to ₹1500. On orders of ₹5000 and aboveT&C
            </Typography>
          </Grid>
          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer10% off on ICICI Bank Credit Cards (incl. EMI Txns), up
              to ₹1,500. On orders of ₹5,000 and aboveT&C
            </Typography>
          </Grid>

          <Grid item display="flex">
            <LocalOfferIcon fontSize="small" sx={{ pt: 0.5 }} />

            <Typography
              variant="subtitle1"
              sx={{ fontWait: 400, pb: 1, pl: 1, color: "black" }}
            >
              Bank Offer8% off on Flipkart Axis Bank Credit Card, up to ₹1,500.
              On orders of ₹5,000 and aboveT&C
            </Typography>
          </Grid>

          <Typography variant="h6" sx={{ pb: 1, color: "black" }}>
            Description
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ pb: 4, pl: 1, color: "#595959" }}
          >
            {prod.description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
