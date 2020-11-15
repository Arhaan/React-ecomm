import React from 'react';
import useParams from "react-router-dom";
import Spinner from "react-bootstrap/cjs/Spinner";
import Row from "react-bootstrap/cjs/Row";
import Button from "react-bootstrap/cjs/Button";
import useHistory from "react-router-dom"
import axios from 'axios';

const BuyButton = ({prodId}) => {
    const history = useHistory()

    const handleClick = ()=> {
        const token = localStorage.getItem("auth_token")
        //console.log(token)
        if (!token) {
            console.log("Token not found")
            console.log("Redirect")
            history.push('/login')
        } else {
            console.log("Place order")
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/orders/`, {'product': prodId}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then((response) => {
                console.log(response)
            })
        }
    }

    return(
        <Button variant="outline-success" onClick={handleClick}>
            Buy Now
        </Button>
    )
}
const Product = ({ data }) => {
    //console.log(`Data:`, data)
    const productId = useParams()["prod_id"];
    //console.log(`productId ${productId}`)
    const product = data.find(prod => prod.id === parseInt(productId));
    //console.log(`product: ${product}`)
    if (product){
        return (
            <div>
                <Row>
                    <h1>
                        {product.title}
                    </h1>
                    <p>
                        {product.description}
                    </p>
                </Row>
                <BuyButton prodId={productId}/>
            </div>
        );
    }
    else if(data.length!==0){
        return(
            <div>
                <h1>Oh ho. Not found.</h1>
            </div>
        );
    }
    else{
        return(
            <div>
                <Spinner animation="grow"/>
            </div>
        )
    }
}

export default Product;