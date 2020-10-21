import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

/**
 * Components
 */
import Home from "../pages/Home";
import Details from "../pages/Details";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pokemons/:id" component={Details} />
            <Route path="*" component={Home}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;