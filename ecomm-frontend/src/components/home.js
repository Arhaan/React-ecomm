import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, useRouteMatch, useHistory} from "react-router-dom";
import Product from "./Product";
import ProductList from "./ProductList";
import Button from "react-bootstrap/cjs/Button";
import Fuse from 'fuse.js'
const API_URL = "http://localhost:8000"

const Home = (props) => {
    //console.log(process.env)
    const [products, setProducts] = useState([])
    const {url, path} = useRouteMatch();
    //console.log(`Yay Path = ${path}`)

    useEffect(()=>
        {
            axios.get(`${API_URL}/api/products/`)
                .then(result => {
                    setProducts(result.data)
                })
        },
        []
    )

        return (
            <div>
                <Container>
                    <Switch>
                        <Route path={`${url}/list/search/:query`}><ProductList products={products} hasQuery={true}/></Route>
                        <Route path={`${url}/single/:prod_id`}><Product data={products}/></Route>
                        <Route exact path={`${url}/list`}>
                            <ProductList products={products}/>
                        </Route>
                    </Switch>
                </Container>
            </div>
        );
}

export default Home;