import React from 'react'
import "../../assets/css/SearchedProject.css"
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import url from "../../globalVariables"
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
        }
    }
    handleToken = async (token, addresses) => {
        console.log({ token, addresses })
        const product = this.state.product
        const res = await axios.post(url.module + '/checkout', { token, product })
        console.log(res.data)
        if (res.data.status === 'success') {
            toast('Success! Payment is completed', { type: 'success' })
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
                            <div className="outerdiv">
                                <div className="innerdiv">
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b> Domain : </b>{this.props.p_domain}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Tester Email : </b>{this.props.tr_tester_id}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Description : </b>{this.props.p_description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Total Test Cases : </b>{this.props.tr_total_testcases}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Passed Test Cases : </b>{this.props.tr_passed_testcases}
                                    </Typography>

                                </div>
                                <div className="innerdiv">

                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Failed Test Cases : </b>{this.props.tr_failed_testcases}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Status : </b>{this.props.tr_status}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Result : </b>{this.props.tr_result}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <a href={this.props.tr_video_link} color="primary" tabIndex="-1" role="button" aria-disabled="true">Test Video</a>
                                    </Typography>
                                </div>
                            </div>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>



                    </CardActions>
                </Card>
            </div>
        )
    }
}