import React from 'react'
import axios from 'axios'
import '../loginAssets/css/main.css'
import '../loginAssets/css/util.css'
import '../loginAssets/vendor/bootstrap/css/bootstrap.min.css'
import url from "../globalVariables"
import "../assets/css/main.css"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom'
import "../assets/css/main.css"
import mobaa from "../assets/img/mobaa.png"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class SignUp extends React.Component {
    state = {
        emailId: '',
        open: false,
        fName: '',
        lName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        testertype: '',
        resume: React.createRef(),
        redirect: null
    }



    onEmailIdChange = (e) => {
        const emailId = e.target.value
        this.setState(() => ({ emailId }))
    }

    onfNameChange = (e) => {
        const fName = e.target.value
        this.setState(() => ({ fName }))
    }

    onlNameChange = (e) => {
        const lName = e.target.value
        this.setState(() => ({ lName }))
    }

    onphoneNumberChange = (e) => {
        const phoneNumber = e.target.value
        this.setState((e) => ({ phoneNumber }))
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value
        this.setState(() => ({ confirmPassword }))
    }

    onTestertypeChange = (e) => {
        const testertype = e.target.value
        this.setState(() => ({ testertype }))
        console.log(testertype)
    }

    onResumeChange = (e) => {
        // console.log(e.target)
        // console.log(this.state.resume.current.files[0])
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ redirect: "/" }))
    };

    handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('Inside try')
            const user = {
                u_email_id: this.state.emailId,
                u_first_name: this.state.fName,
                u_last_name: this.state.lName,
                u_phone_number: this.state.phoneNumber,
                u_password: this.state.password,
                u_type: this.state.testertype
            }

            const resume = this.state.resume.current !== null ? this.state.resume.current.files[0] : ''

            console.log(user)
            console.log(resume)
            const formData = new FormData();
            formData.append('Resume', resume);
            formData.append('details', JSON.stringify(user))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const res = await axios.post(url.module + '/signup', formData, config)
            console.log(res)
            if (res.data.flag === 'S') {
                this.setState(() => ({ open: true }))
                this.setState(() => ({ redirect: "/" }))
            }




        } catch (e) {
            console.log(e)
        }
    }

    render() {

        if (this.state.redirect === '/') {
            return <Redirect to={
                {
                    pathname: "/",
                    redirectedFrom: "signup"
                }
            } />
        }

        return (

            <div>
                <div className="limiter">

                    <script src="../loginAssets/vendor/jquery/jquery-3.2.1.min.js"></script>
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-form-title" style={{ backgroundImage: "url(./loginAssets/images/bg-01.jpg" }}>
                                <span className="login100-form-title-1">
                                    Sign Up
					        </span>
                            </div>

                            <form className="login100-form validate-form">
                                <div className="wrap-input100 validate-input m-b-26" data-validate="Email ID is required">
                                    <span className="label-input100">Email ID</span>
                                    <input
                                        className="input100"
                                        type="email"
                                        name="EmailID"
                                        placeholder="Enter Email Address"
                                        value={this.state.emailId}
                                        onChange={this.onEmailIdChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input m-b-26" data-validate="First Name is required">
                                    <span className="label-input100"> First Name</span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="fname"
                                        placeholder="Enter First Name"
                                        value={this.state.fName}
                                        onChange={this.onfNameChange}
                                        required
                                    />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input m-b-26" data-validate="Last Name is required">
                                    <span className="label-input100"> Last Name</span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="lname"
                                        placeholder="Enter Last Name"
                                        value={this.state.lName}
                                        onChange={this.onlNameChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input m-b-26" data-validate="Phone Number is required">
                                    <span className="label-input100"> Phone Number </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="Enter Phone Number"
                                        value={this.state.phoneNumber}
                                        onChange={this.onphoneNumberChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>


                                <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    <span className="label-input100">Password</span>
                                    <input
                                        className="input100"
                                        type="password"
                                        name="pass"
                                        placeholder="Enter password"
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>


                                <div className="wrap-input100 validate-input m-b-26" data-validate="Phone is required">
                                    <span className="label-input100">Tester Type</span>

                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="tester"
                                                checked={this.state.testertype === 'tester'}
                                                onChange={this.onTestertypeChange} />
                                    Tester
                                </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" value="manager"
                                                checked={this.state.testertype === 'manager'}
                                                onChange={this.onTestertypeChange} />
                                    Manager
                                </label>
                                    </div>
                                    <span className="focus-input100"></span>
                                </div>


                                {this.state.testertype === 'tester' && <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                    <span className="label-input100">Upload Resume</span>
                                    <input
                                        className="input100"
                                        type="file"
                                        name="resume"
                                        placeholder="Upload your resume"
                                        value={this.state.resume ? this.state.resume.name : ''}
                                        ref={this.state.resume}
                                        onChange={this.onResumeChange}
                                    />
                                    <span className="focus-input100"></span>
                                </div>}

                                <div className="container-login100-form-btn">
                                    <button className="primary-btn text-uppercase" onClick={this.handleOnSubmit}>
                                        Sign Up
                        </button>

                                </div>


                            </form>
                        </div>
                    </div>
                </div>




            </div>
        )
    }
}