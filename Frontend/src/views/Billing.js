import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from 'react-stripe-checkout'
import url from "../globalVariables"
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import SingleBill from "../components/Project/SingleBill"
toast.configure();
export default class Billing extends React.Component {
    state = {
        amunt: 500,
        product: {
            name: 'Cloud resources',
            price: 500
        },
        bills: undefined
    }
    handleToken = async (token, addresses) => {
        console.log({ token, addresses })
        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })
        console.log(res.data)
        if (res.data.status === 'success') {
            toast('Success! Check emails for details', { type: 'success' })
        }
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        user.managerId = user.u_email_id
        const bills = await axios.post(url.module + '/getBillingDetails', user)
        console.log(bills.data)
        this.setState(() => ({ bills:bills.data }))

    }
    render() {
        const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
        
        return (
            <div>
                <div>
                    {this.state.bills && 
                    
                        this.state.bills.map((bill)=>(
                            
                            <SingleBill key={bill.p_id}{...bill}/> 
                            
                        ))
                    }
                </div>
                
            </div>
        )
    }
}