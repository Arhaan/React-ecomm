import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Product from "./Product";
import ProductList from "./ProductList";
const API_URL = "http://localhost:8000"
const Home = (props) => {
    //console.log(process.env)
    const [products, setProducts] = useState([])
    const {url, path} = useRouteMatch();
    //console.log(`Yay Path = ${path}`)
    useEffect(()=>
        {
            axios.get(`${API_URL}/api/products/`)
                .then(result => {setProducts(result.data)})
        },
        []
    )

        return (
            <div>
                <Container>
                    <Route path={`${url}/:prod_id`}><Product data={products}/></Route>
                    <Route exact path={`${url}`}>
                        <ProductList products={products}/>
                    </Route>
                </Container>
            </div>
        );
}

export default Home;