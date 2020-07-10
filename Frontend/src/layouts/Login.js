import React from 'react'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import '../loginAssets/css/main.css'
import '../loginAssets/css/util.css'
import '../loginAssets/vendor/bootstrap/css/bootstrap.min.css'
import url from "../globalVariables"
export default class SignUp extends React.Component {
    state = {
        emailId: '',
        password: '',
        redirect:null
    }

    onEmailIdChange = (e) => {
        const emailId = e.target.value
        this.setState(() => ({ emailId }))
    }

    

    

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

  

   

    handleOnSubmit = async (e) => {
        e.preventDefault()
        
        try {
            console.log('Inside try')
            const user = {
                u_email_id: this.state.emailId,
                u_password: this.state.password
            }
            
            
           
            const res = await axios.post(url.module+'/userlogin', user)
            console.log(res)
            
            if(res.data.flag==='S'){
                const correctuser = {
                    u_email_id:user.u_email_id,
                    u_type:res.data.u_type
                }
                localStorage.setItem('user', JSON.stringify(correctuser));
                const user1=localStorage.getItem('user')
                console.log(user1)
                if (res.data.u_type === 'tester'){
                    
                    this.setState({ redirect: "/tester" });
                }
                if (res.data.u_type === 'manager'){
                    
                    this.setState({ redirect: "/admin" });
                }
            }
            
            
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return (

            <div className="limiter">
                <script src="../loginAssets/vendor/jquery/jquery-3.2.1.min.js"></script>
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title" style={{ backgroundImage: "url(./loginAssets/images/bg-01.jpg" }}>
                            <span className="login100-form-title-1">
                                Login
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

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.handleOnSubmit}>
                                    Sign In
						        </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}