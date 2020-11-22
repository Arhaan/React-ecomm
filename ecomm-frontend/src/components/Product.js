import React, {useEffect, useState} from 'react';
import Spinner from "react-bootstrap/cjs/Spinner";
import Row from "react-bootstrap/cjs/Row";
import Button from "react-bootstrap/cjs/Button";
import { useHistory, useParams}  from "react-router-dom"
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
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/orders/`, {"product": prodId}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then((response) => {
                history.push('/orders')
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
    const [seller, setSeller] = useState({"name": ""})
    useEffect(
        () => {
            if(product){
                axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/users/${product.seller}`)
                    .then((response)=>setSeller(response.data))
            }
        }, [product]
    )
    console.log(product)
    //console.log(`product: ${product}`)
    if (product){
        return (
            <div>

                    <h1>
                        {product.title}
                    </h1>
                    <h5>
                        ${product.cost}
                    </h5>
                    <h5>
                        Seller: {seller.username}
                    </h5>

                    <p>
                        {product.description}
                    </p>
                <BuyButton prodId={productId}/>
            </div>
        );
    }
    else if(data.length!==0){
        return(
            <div>
                <h1>We couldn't find that Product</h1>
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