import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Theme, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import "./ProductDetail.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 100,
      display: "flex",
      justifyContent: "center",
    },
    paper: {
      width: 1000,
      alignSelf: "center",
      padding: theme.spacing(2),
      margin: "auto",
      maxHeight: 800,
    },
    image: {
      maxWidth: 500,
      maxHeight: 400,
      margin: "auto",
      display: "block",
      marginLeft: "auto",
    },
  })
);

interface RouteParams {
  id: string;
}

interface ProductDetailProps extends RouteComponentProps<RouteParams> {}

function ProductDetail(props: ProductDetailProps): JSX.Element {
  const classes = useStyles();

  const [product, setProduct] = useState<ProductModel>();
  const [image, setImage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const productId = props.match.params.id;
        const response = await axios.get<ProductModel>(
          "http://localhost:3001/api/products/" + productId
        );
        setProduct(response.data);
        if (response.data) {
          const image = await axios.get<string>(
            "http://localhost:3001/api/products/image/" +
              response.data.imageName,
            { responseType: "blob" }
          );
          setImage(URL.createObjectURL(image.data));
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        {product ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h3">
                    {product.title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {product.details}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button color="secondary" >
                    Remove
                  </Button>
                  <Button color="primary" >
                    More Info
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <img src={image} alt="image" className={classes.image}></img>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h1">
            No product with this id was found
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default ProductDetail;
