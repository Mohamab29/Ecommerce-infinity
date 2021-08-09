import { Redirect, Route, Switch } from "react-router-dom";
import AddProducts from "../../ProductsArea/AddProducts/AddProducts";
import ProductDetail from "../../ProductsArea/ProductDetail/ProductDetail";
import ShowProducts from "../../ProductsArea/ShowProducts/ShowProducts";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <>
      <Switch>
        <Route path="/products" component={ShowProducts} exact />
        {/* <Route path="/add-products" component={AddProducts} exact /> */}
        <Route path="/products/detail/:id" component={ProductDetail} exact />
        <Redirect from="/" to="/products" />
      </Switch>
    </>
  );
}

export default Routing;
