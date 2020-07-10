import React from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import "../../assets/css/TesterUserProfile.css"

export default class TesterUserProfile extends React.Component {

    state = {
        u_first_name: '',
        u_last_name: '',
        u_email_id: '',
        u_type: '',
        u_status: '',
        u_phone_number: '',
        t_resume_link: '',
        resume: React.createRef()
    }


    async componentWillMount() {
        console.log('before mount')
        const user = localStorage.getItem('user')
        const user_json = JSON.parse(user)
        console.log(user_json)
        const user_profile = await axios.post('http://localhost:4001/gettesterprofile', user_json)
        console.log(user_profile)
        this.setState(() => ({
            u_first_name: user_profile.data.u_first_name,
            u_last_name: user_profile.data.u_last_name,
            u_email_id: user_profile.data.u_email_id,
            u_type: user_profile.data.u_type,
            u_status: user_profile.data.u_status,
            u_phone_number: user_profile.data.u_phone_number,
            t_resume_link: user_profile.data.t_resume_link
        }))

    }

    onFirstNameChange = (e) => {
        const u_first_name = e.target.value
        this.setState(() => ({ u_first_name }))
    }

    onLastNameChange = (e) => {
        const u_last_name = e.target.value
        this.setState(() => ({ u_last_name }))
    }

    onPhoneChange = (e) => {
        const u_phone_number = e.target.value
        this.setState(() => ({ u_phone_number }))
    }

    onResumeChange = (e) => {
        console.log(this.state.resume)
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('Inside try')

            const user = {
                u_first_name: this.state.u_first_name,
                u_last_name: this.state.u_last_name,
                u_email_id: this.state.u_email_id,
                u_type: this.state.u_type,
                u_status: this.state.u_status,
                u_phone_number: this.state.u_phone_number,
            }
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', user)

            const resume = this.state.resume.current !== null ? this.state.resume.current.files[0] : ''


            const formData = new FormData();
            formData.append('Resume', resume);
            formData.append('details', JSON.stringify(user))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const res = await axios.post('http://localhost:4001/updatetesterprofile', formData, config)
            console.log(res)
            if (res.data.flag === 'S') {
                
                this.setState(() => ({
                    
                    t_resume_link: res.data.t_resume_link

                }))
            }


        } catch (e) {
            console.log(e)
        }
    }

    render() {

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className="cardTitleWhite">Edit Profile</h4>

                            </CardHeader>
                            <CardBody>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fName"
                                            placeholder="First Name"
                                            value={this.state.u_first_name}
                                            onChange={this.onFirstNameChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputPassword4"
                                            placeholder="Lsat Name"
                                            value={this.state.u_last_name}
                                            onChange={this.onLastNameChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAddress">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        value={this.state.u_email_id}
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputAddress">Phone Number</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Phonenumber"
                                        value={this.state.u_phone_number}
                                        onChange={this.onPhoneChange}
                                    />
                                </div>



                                <div className="form-group">
                                    <label htmlFor="inputAddress">Resume</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="resume"
                                        placeholder="Resume"
                                        value={this.state.resume ? this.state.resume.name : ''}
                                        ref={this.state.resume}
                                        onChange={this.onResumeChange} />
                                </div>

                                <a href={this.state.t_resume_link} color="primary" tabIndex="-1" role="button" aria-disabled="true">Download Resume</a>

                                <br />
                                <Button color="primary" onClick={this.handleOnSubmit}>Update Profile </Button>

                            </CardBody>

                        </Card>

                    </GridItem>



                </GridContainer>
            </div>
        );
    }

}
