import axios from "axios";
import { properties } from "../../properties";

export const getProducts = (getProductsInput: any): Promise<any> => {
  const ids = getProductsInput?.ids;

  console.log("Ids are : ", ids);

  let url = `${properties.DB_URL}/products`;
  let querystring = "";
  if (ids && ids.length > 0) {
    querystring = "id=" + ids.join("&id=");
    url = url + `?${querystring}`;
  }

  return new Promise<any>((resolve, reject) => {
    axios({
      method: "get",
      url,
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
