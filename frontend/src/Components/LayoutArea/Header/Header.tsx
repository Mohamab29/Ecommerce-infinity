import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Logo from "../../../Assets/logo.png";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      display: "flex",
      justifyContent: "center",
      alignItems: "end",
    },
    buttons: {
      flex: 1,
      display: "flex",
      alignItems: "center",
    },
    button: {
      fontSize: "1.20rem",
    },
  })
);
function Header(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.buttons}>
            <Button
              color="inherit"
              className={classes.button}
              component={NavLink}
              to="/add-products"
            >
              הוסף מוצר
            </Button>
            <Button
              color="inherit"
              className={classes.button}
              component={NavLink}
              to="/products"
            >
              מוצרים
            </Button>
          </div>
          <div className={classes.logo}>
            <img src={Logo} alt="logo" width="150px"></img>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
