import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import WishList from "./pages/WishList";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Edit from "./pages/Edit";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={WishList} />
                <Route path="/wishlist/create" component={Create} />
                <Route path="/wishlist/show/:id" component={Show} />
                <Route path="/wishlist/show/:id" component={Show} />
                <Route path="/wishlist/edit/:id" component={Edit} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;