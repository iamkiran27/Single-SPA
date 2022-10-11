import React, { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
  
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ name, price, rating, quantity, image, itemID, setItem }) => {

  const [itemQty, setItemQty] = useState(quantity);
  const [operation,setOperation]=useState(true)
  useEffect(async() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    console.log("PREvious items")
    console.log(items)
   const value=(await axios.get(`http://localhost:8080/products/${itemID}`)).data.price
   console.log("PRICE OF PROD"+value)
   if(value!=undefined){
   setItem(value*(itemQty-items[itemID]));
    items[itemID] = itemQty;
    localStorage.setItem("cart", JSON.stringify(items));
    console.log("AFter settikng")
    console.log(localStorage.getItem("cart"))
   }
  }, [itemQty,operation]);

  return (
    <Grid container direction={"row"}>
      <Grid item marginX={2} border="1px solid black">
        <Box component="img" maxHeight="18rem" maxWidth="21rem" src={image} />
      </Grid>
      <Grid item margin={1}>
        <Grid container direction="column">
          <Typography>{name}</Typography>
          <Typography marginY={2} fontWeight="bold" fontSize={"18px"}>
            ₹ {price}
          </Typography>
          <Rating
            name="read-only"
            value={rating}
            readOnly
            precision={0.5}
            sx={{ fontSize: "1rem" }}
          />
          <Typography>
            QTY: 
            <Button
              onClick={() => {
                console.log("- triggered")
                setOperation(false)
                setItemQty((prev) => (prev - 1 > 0 ? prev - 1 : 0));
              }}
            >
              {" - "}
            </Button>
            {itemQty}
            <Button
              onClick={() => {
                console.log("+ triggered")
                
                setOperation(true)
                setItemQty((prev) => prev + 1);
                
              }}
            >
              {" + "}
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
const Cart = () => {
  const sumOfList=(arr)=>{
    let result=0;
    arr.map((value)=>result+=value)
    return result;
  }
  const [sum, setSum] = useState(0);
  const [cItems,setCItems]=useState([]);
  const [itemSum,setItemSum]=useState(0)
  
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  
  useEffect(() => {
    setSum(0);
    setCItems([])
    Object.keys(cartItems).map(async(key) => {
      const produts=await axios.get(`http://localhost:8080/products/${key}`)
      setSum((prev) => prev + produts.data.price*cartItems[key]);
      const CIT=<CartItem  itemID={key}
      name={produts.data.name}
      price={produts.data.price}
      setItem={setItemSum}
      quantity={cartItems[key]}
      rating={produts.data.rating}
      image="https://www.displaydaily.com/images/2018/June/Hero-Banner.jpg"  />
      setCItems((prev)=>[...prev,CIT])
    });
    console.log("Sum in cartItme"+sum)
  }, [cartItems]);


useEffect(()=>{
  console.log("TRigered itemsum")
  console.log(itemSum)
  setSum((prev)=>prev+itemSum)
},[itemSum])
  
  const productURL = "http://localhost:8080/products/";
  const items = JSON.parse(localStorage.getItem("cart"));
  const removeItem = (index) => {
    const temp = cartItems;
    delete temp[index];
    setCartItems({ ...temp });
    console.log(cartItems);
    console.log(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
  };
  console.log(items);
  console.log(Object.keys(items));
  return (
    <>
      <Grid container>
        {Object.keys(cartItems).map((value,index) => (
          <>
            <Grid item xs={10} margin={2}>
             
              {cItems[index]}
            </Grid>
            <Grid item xs={1} display="flex" alignItems={"center"}>
              <IconButton onClick={() => removeItem(value)}>
                <DeleteIcon />
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
  );
};

export default Cart;
