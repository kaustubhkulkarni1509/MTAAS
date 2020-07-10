import React from 'react'
import "../assets/css/main.css"
import mobaa from "../assets/img/mobaa.png"
import { Link, NavLink } from 'react-router-dom'
import SignUp from "./SignUp"
import Login from "./Login"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class WelcomePage extends React.Component{
    state={
        open:false
    }
    componentDidMount= () => {
        console.log(this.props)
        if (this.props.location.redirectedFrom && this.props.location.redirectedFrom === 'signup') {
            this.setState(() => ({ open: true }))
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ open: false }))
    };

    render(){
        return(
            <div>
            <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Signed up in successfully !
                    </Alert>
                </Snackbar>
            <br/><br/><br/><br/><br/>
            <div className="container">
                <div className="row fullscreen align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-6 banner-left">
                        
                        <h1>Mobile Application Testing (MTaaS)</h1>
                        <p>
                            Platform for freelance testers and managers to carry out test cases on mobile devices provided by device farm.
                        </p>
                        <a href="/login" className="primary-btn text-uppercase">Login</a>
                        <a href="/login">    </a>
                        <a href="/signup" className="primary-btn text-uppercase">Sign Up</a>
                    </div>
                    <div className="col-lg-6 col-md-6 banner-right d-flex align-self-end">
                        <img className="img-fluid" src={mobaa} alt=""/>
                    </div>
                </div>
            </div>					
       
            </div>
        )
    }
}