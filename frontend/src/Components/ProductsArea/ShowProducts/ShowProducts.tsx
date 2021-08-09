import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useEffect } from "react";
import { SyntheticEvent, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { ProductsActionType } from "../../../Redux/ProductsState";
import store from "../../../Redux/Store";
import ProductCard from "../ProductCard/ProductCard";
import "./ShowProducts.css";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    label: {
      right: -30,
    },
    title: {
      textAlign: "center",
      color: theme.palette.primary.main,
    },
    gridItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 300,
    },
  })
);

function ShowProducts(): JSX.Element {
  const classes = useStyles();
  const [sortOut, setSortOut] = useState<number>(0);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (store.getState().productsState.products.length === 0) {
          const response = await axios.get<ProductModel[]>(
            "http://localhost:3001/api/products"
          );
            
          for (const product of response.data) {
              const image = await axios.get<string>(
                  "http://localhost:3001/api/products/image/" + product.imageName,
                  { responseType: "blob" }
                );
                product.image = URL.createObjectURL(image.data);
               
          }

          store.dispatch({
              type: ProductsActionType.ProductsDownloaded,
              payload: response.data,
            });
          
        }

        setProducts(store.getState().productsState.products);
        
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [products]);

  const handleSortOut = (args: SyntheticEvent) => {
    const value = +(args.target as HTMLSelectElement).value;
    if (value === 2) {
      products.sort((a, b) => a.price - b.price);
    } else if (value === 3) {
      products.sort((a, b) => b.price - a.price);
    }
    setSortOut(value);
  };
  return (
    <div className="ShowProducts">
      <Typography variant="h2" className={classes.title}>
        טלוויזיות
      </Typography>
      <hr />
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.label}
          shrink
          htmlFor="sort-native-label-placeholder"
        >
          מיין לפי
        </InputLabel>
        <NativeSelect
          value={sortOut}
          onChange={handleSortOut}
          inputProps={{
            name: "sort",
            id: "sort-native-label-placeholder",
          }}
          variant="standard"
        >
          <option value={0}>פופולארית</option>
          <option value={1}>חדש על המדף</option>
          <option value={2}>מחיר (מהנמוך לגבוה)</option>
          <option value={3}>מחיר (מהגבוה לנמוך)</option>
        </NativeSelect>
      </FormControl>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        {products.length > 0 &&
          products.map((p, i) => (
            <Grid key={i} item xs={3} className={classes.gridItem}>
              <ProductCard product={p} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default ShowProducts;
