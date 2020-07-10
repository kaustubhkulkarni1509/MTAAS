import React from 'react'
import "../../assets/css/SearchedProject.css"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Redirect } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import url from "../../globalVariables"
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class SingleProject extends React.Component {

    state = {
        open: false,
        vertical: 'top',
        horizontal: 'right',
        applied_flag: '',
        amunt: 500,
        product: {
            name: 'Cloud resources',
            price: 500
        },
        redirect:null
    }
    handleToken = async (token, addresses) => {
        console.log({ token, addresses })
        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })
        console.log(res.data)
        if (res.data.status === 'success') {
            
            const user = JSON.parse(localStorage.getItem('user'))
            const req = {
                projectId: this.props.p_id,
                amount: this.props.amount,
                managerId: user.u_email_id
            }
            const res1 = await axios.post(url.module+'/createBillReceipt',req)
            const message = "Payment of " + res1.r_amount + " dollars is done successfully"
            toast(message, { type: 'success' })
            this.setState(()=>({redirect:"/admin/payments"}))

        }
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ open: false }))
    };

    render() {
        console.log(this.props)
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (

            <div className="wrapper">
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        The project is created successfully !
            </Alert>
                </Snackbar>
                <Card className="test">
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.p_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Bill : </b>{this.props.amount}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                        <StripeCheckout
                            stripeKey="pk_test_o85updIuelSeT5iCUNfiTDjR00t7iCKLuF"
                            token={this.handleToken}
                            amount={this.state.amount * 100}
                        />


                    </CardActions>
                </Card>
            </div>
        )
    }
}