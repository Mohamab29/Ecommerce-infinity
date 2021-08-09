import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import "./ProductCard.css";
import Image from "../../../Assets/TB7000.jpg";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import { Theme } from "@material-ui/core/styles";
import ProductModel from "../../../Models/ProductModel";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import store from "../../../Redux/Store";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "50px",
      maxWidth: 250,
      maxHeight: 450,
    },
    media: {
      height: 180,
    },
    content: {
      textAlign: "center",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      padding: 7.5,
      margin: theme.spacing(1),
      "& svg": {
        marginRight: "10px",
      },
    },
  })
);
interface ProductCardProps {
  product: ProductModel;

}

function ProductCard(props: ProductCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea
          component={NavLink}
          to={"/products/detail/" + props.product._id}
        >
          <CardMedia
            className={classes.media}
            image={props.product.image}
            title="mini image"
          ></CardMedia>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.product.title}
            </Typography>
            <Typography variant="body2" color="primary" component="h5">
              {props.product.details}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {props.product.price} ₪
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actionButtons}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            className={classes.button}
            endIcon={<ShoppingCartSharpIcon />}
          >
            הוסף לסל
          </Button>
          <IconButton color="secondary" aria-label="Favorite">
            <FavoriteSharpIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
