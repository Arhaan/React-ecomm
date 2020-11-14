import Card from "react-bootstrap/Card";
import {Link, useRouteMatch} from "react-router-dom";
import {Container} from "react-bootstrap";
import React from "react";


const ProductList = ({products})=>{
    const {url, path} = useRouteMatch();
    return(
        <div>
                {products.map(product =>
                      <Card style={{margin: '25px'}} key={product.id}>
                          <Card.Body>
                              <Card.Title><Link to={`${url}/${product.id}`}>{product.title}</Link></Card.Title>
                              <Card.Subtitle className="text-muted mb-2">$ {product.cost}</Card.Subtitle>
                          </Card.Body>
                      </Card>
                )}
        </div>
    )
}

export default ProductList;