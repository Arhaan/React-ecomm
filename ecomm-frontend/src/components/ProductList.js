import Card from "react-bootstrap/Card";
import {Link, useRouteMatch, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import React from "react";
import Fuse from "fuse.js";


const ProductList = ({products, hasQuery=false})=>{
    const {url, path} = useRouteMatch();
    const query = useParams()["query"]
    //console.log("Query = ", query)
    let productsToShow = products
    if (hasQuery){
        //console.log("Query = ", query)
        const fuse = new Fuse(products, {
            keys: [
                'title',
                'description',
            ]
        })
        productsToShow = fuse.search(query).map(product => product.item)
        // Map to product.item because fuse returns in a different format
    }
    return(
        <div>
                {productsToShow.map(product =>
                      <Card style={{margin: '25px'}} key={product.id}>
                          <Card.Body>
                              <Card.Title><Link to={`/home/single/${product.id}`}>{product.title}</Link></Card.Title>
                              <Card.Subtitle className="text-muted mb-2">$ {product.cost}</Card.Subtitle>
                          </Card.Body>
                      </Card>
                )}
        </div>
    )
}

export default ProductList;