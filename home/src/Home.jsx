import React, { useState, useEffect } from "react";
import { navigateToUrl } from "single-spa";

import { Observable } from "windowed-observable";
import {
  Box,
  Card,
  Typography,
  CardActionArea,
  Grid,
  CardMedia,
  CardContent,
} from "@mui/material";

const Home = () => {
  const observable = new Observable("cart");
  observable.subscribe((value) => console.log("Value : ", value),{latest:true});
  const [data, setdata] = useState([]);
  const [index, setIndex] = useState(0);

  var items = [
    "https://i.ytimg.com/vi/FT3ODSg1GFE/maxresdefault.jpg",
    "https://www.displaydaily.com/images/2018/June/Hero-Banner.jpg",
    "https://img.global.news.samsung.com/in/wp-content/uploads/2022/02/S22_KV_Banner_728x410.jpg",
  ];

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data : ", data);
        setdata(data);
      })
      .catch((err) => console.log(err));
    setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 3000);
  }, []);

  return (
    <Box sx={{ margin: "20px",marginTop:10 }}>
      <Box sx={{ height: "500px" }}>
        <img src={items[index]} height="100%" width="100%"></img>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4">New Arrivals</Typography>
      </Box>

      <Grid container>
        {data.map((d) => {
          return (
            <Grid item key={d.id} md={4} lg={3} sx={{ padding: "20px" }}>
              <Card
                elevation={4}
                lg={4}
                sm={6}
                xs={12}
                xl={4}
                sx={{
                  width: "100%",
                  borderTopLeftRadius: "18px",
                  borderTopRightRadius: "18px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={d.imageUrl}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          <a
                            href={`/pdp/${d.id}`}
                            onClick={navigateToUrl}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {d.name}
                          </a>
                        </Typography>
                      </Box>

                      <Box sx={{ marginTop: "3px" }}>
                        <Typography>Rating : {d.rating}</Typography>
                      </Box>
                      <Box sx={{ marginTop: "6px" }}>
                        <Typography>
                          Price :
                          <span
                            style={{ fontWeight: "bold", fontSize: "20px" }}
                          >
                            {" "}
                            ₹{d.price}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
