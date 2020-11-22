import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Product from "./Product";
import ProductList from "./ProductList";

const Home = (props) => {
    //console.log(process.env)
    const [products, setProducts] = useState([])
    const {url, path} = useRouteMatch();
    //console.log(`Yay Path = ${path}`)

    useEffect(()=>
        {
            axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/products/`)
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
                        <Route path={`${url}/list/:category/:query`}><ProductList products={products}/></Route>
                        <Route path={`${url}/list/:category`}><ProductList products={products}/></Route>
                        <Route path={`${url}/list/`}><ProductList products={products}/></Route>
                        <Route path={`${url}/single/:prod_id`}><Product data={products}/></Route>
                        <Route path={`${url}/list`}>
                            <ProductList products={products}/>
                        </Route>
                        <Route path={`${url}/`}>
                            <ProductList products={products}/>
                        </Route>
                    </Switch>
                </Container>
            </div>
        );
}

export default Home;