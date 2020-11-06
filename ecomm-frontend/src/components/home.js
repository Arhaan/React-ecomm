import React, {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>
        {
            axios.get("/api/products/")
                .then(result => {setProducts(result.data)})
        },
        []
    )
  return (
      <div>
            <Container>
                {products.map(product =>
                      <Card style={{margin: '25px'}} key={product.id}>
                          <Card.Body>
                              <Card.Title>{product.title}</Card.Title>
                              <Card.Subtitle className="text-muted mb-2">$ {product.cost}</Card.Subtitle>

                          </Card.Body>
                      </Card>
                )}
            </Container>
      </div>
  );
}

export default Home;