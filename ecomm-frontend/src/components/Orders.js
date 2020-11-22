import {React, useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import Card from "react-bootstrap/cjs/Card";

const getStatusString = (code) => {
    switch (code){
        case 'SHIP':
            return 'Preparing To Ship'
        case 'DISP':
            return 'Dispatched'
        case 'DELI':
            return 'Delivered'

    }
}
const OrderCard = ({order}) => {
    return(
        <div>

            <Card style={{margin: '25px'}}>
                <Card.Header>{getStatusString(order.status)}</Card.Header>
                <Card.Title style={{paddingLeft:'10px'}}><Link to={`/home/${order.product.id}`}>{order.product.title}</Link></Card.Title>
            </Card>
        </div>
    )
}
const OrdersView = () => {
    const [orders, setOrders] = useState([])
    const history = useHistory()
    const token = localStorage.getItem("auth_token")

    useEffect(() => {
                if (!token) {
                    history.push("/login")
                    return
                }
                axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/orders`, {
                    headers:{
                        "Authorization": `Token ${token}`
                    }
                })
                    .then((response) => {
                        setOrders(response.data)
                    })
            }, [token])
    return (
        <div>

            <h1>Your Orders</h1>
            {orders.map(order => <OrderCard key={order.id} order={order}/>)}
        </div>
    )


}

export default OrdersView;