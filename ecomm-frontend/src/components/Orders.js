import {React, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Card from "react-bootstrap/cjs/Card";

const OrderCard = ({order}) => {
    return(
        <div>
            {order.product}
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
                        console.log(response.data)
                        setOrders(response.data)

                        console.log("Response data is", response.data.type)
                        console.log(orders)
                    })

            }, [token])
    return (
        <div>
            {orders.map(singleorder => <OrderCard key={singleorder.id} order={singleorder}/>)}

        </div>
    )


}

export default OrdersView;