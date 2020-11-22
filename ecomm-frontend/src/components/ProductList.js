import Card from "react-bootstrap/Card";
import {Link, useRouteMatch, useParams} from "react-router-dom";
import {Container} from "react-bootstrap";
import React from "react";
import Fuse from "fuse.js";


const ProductList = ({products})=>{
    const {url, path} = useRouteMatch();
    let query = useParams()["query"] || ""

    const category = useParams()["category"]||"ALL"
    //console.log(`Category: ${category}`)
    //console.log(category)
    let productsToShow = products
    if(category !== "ALL"){
        productsToShow = productsToShow.filter(product => {
            //console.log(product.category === category)
            return product.category === category})
    }
    console.log(productsToShow)
    if (query){
        console.log(`Query = ${query}`)
        const fuse = new Fuse(productsToShow, {
            keys: [
                'title',
                'description',
            ]
        })
        productsToShow = fuse.search(query).map(product => product.item)
        // Map to product.item because fuse returns in a different format
    }
    console.log(productsToShow)
    return(
        <div>
            {productsToShow.length<=0?<h1>Your Query Returned No Result</h1>:<></>}
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