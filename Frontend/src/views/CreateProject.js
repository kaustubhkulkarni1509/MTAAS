import React from "react";
import axios from 'axios';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import "../assets/css/TesterUserProfile.css"
import "../assets/css/CreateProject.css"
import url from "../globalVariables.js"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class CreateProject extends React.Component {
    state = {
        open: false,
        vertical: 'top',
        horizontal: 'right',
        p_name: '',
        p_domain: '',
        p_description: '',
        p_estimated_man_hours: '',
        p_deadline: '',
        p_developers_required: '',
        p_progress: "nill",
        p_artifact: React.createRef(),
        p_skill_required: '',
        skill1: '',
        skill2: '',
        skill3: '',
        skill4: ''
    }

    onNameChange = (e) => {
        const p_name = e.target.value
        this.setState(() => ({ p_name }))
    }

    onDomainChange = (e) => {
        const p_domain = e.target.value
        this.setState(() => ({ p_domain }))
    }


    ondescChange = (e) => {
        const p_description = e.target.value
        this.setState(() => ({ p_description }))
    }

    onEstimatedHourChange = (e) => {
        const p_estimated_man_hours = e.target.value
        this.setState(() => ({ p_estimated_man_hours }))
    }

    onDateChange = (e) => {
        const p_deadline = e.target.value
        this.setState(() => ({ p_deadline }))
    }

    onDeveloperChange = (e) => {
        const p_developers_required = e.target.value
        this.setState(() => ({ p_developers_required }))
    }

    onSkill1Change = (e) => {
        const skill1 = e.target.value
        this.setState(() => ({ skill1 }))
    }


    onSkill2Change = (e) => {
        const skill2 = e.target.value
        this.setState(() => ({ skill2 }))
    }


    onSkill3Change = (e) => {
        const skill3 = e.target.value
        this.setState(() => ({ skill3 }))
    }


    onSkill4Change = (e) => {
        const skill4 = e.target.value
        this.setState(() => ({ skill4 }))
    }



    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(() => ({ open: false }))
    };

    handleSubmit = async (e) => {
        e.preventDefault()


        const email = JSON.parse(localStorage.getItem('user'))

        let skills = this.state.skill1 + ',' + this.state.skill2
        if (this.state.skill3 !== '') {
            skills = skills + ',' + this.state.skill3
        }
        if (this.state.skill4 !== '') {
            skills = skills + ',' + this.state.skill4
        }
        const project = {
            p_description: this.state.p_description,
            p_domain: this.state.p_domain,
            p_manager_email: email.u_email_id,
            p_estimated_man_hours: this.state.p_estimated_man_hours,
            p_progress: "nill",
            p_deadline: this.state.p_deadline,
            p_developers_required: this.state.p_developers_required,
            p_skill_req: skills,
            p_name: this.state.p_name
        }
        const p_artifact = this.state.p_artifact.current !== null ? this.state.p_artifact.current.files[0] : ''
        
        const formData = new FormData();
        formData.append('TestArtifact', p_artifact);
        formData.append('newData',project)
        formData.append('details', JSON.stringify(project))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData.getAll('details'))
        const res = await axios.post(url.module+'/createproject', formData, config)
        console.log(res)
        if (res.data.flag === 'S') {
            this.setState(() => ({ open: true }))
        }

    }


    render() {
        
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        The project is created successfully !
                    </Alert>
                </Snackbar>

                <Card>
                    <CardHeader color="primary">
                        <h4 className="cardTitleWhite">Create New Test Project</h4>

                    </CardHeader>
                    <CardBody>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Project Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="projectname"
                                        placeholder="Project Name"
                                        value={this.state.p_name}
                                        onChange={this.onNameChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Project Domain</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPassword4"
                                        placeholder="Project Domain"
                                        required
                                        value={this.state.p_domain}
                                        onChange={this.onDomainChange}
                                        required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Project Description</label>
                                <textarea
                                    className="form-control"
                                    id="p_description"
                                    rows="3"
                                    placeholder="Project Description"
                                    value={this.state.p_description}
                                    onChange={this.ondescChange}
                                    required
                                ></textarea>
                            </div>

                            <label htmlFor="inputEmail4">Skills Required htmlFor Project</label>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Project Skill 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="skill1"
                                        placeholder="Project Skill 1"
                                        value={this.state.skill1}
                                        onChange={this.onSkill1Change}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Project Skill 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="skill2"
                                        placeholder="Project Skill 2"
                                        required
                                        value={this.state.skill2}
                                        onChange={this.onSkill2Change} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Project Skill 3</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="skill3"
                                        placeholder="Project Skill 3"
                                        value={this.state.skill3}
                                        onChange={this.onSkill3Change}

                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Project Skill 4</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="skill4"
                                        placeholder="Project Skill 4"
                                        value={this.state.skill4}
                                        onChange={this.onSkill4Change} />
                                </div>
                            </div>



                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputCity">Estimated Man Hours</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputCity"
                                        placeholder="Estimated Man Hours"
                                        value={this.state.p_estimated_man_hours}
                                        onChange={this.onEstimatedHourChange}
                                        required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputCity">Project Deadline</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        placeholder="Project Deadline"
                                        value={this.state.p_deadline}
                                        onChange={this.onDateChange}
                                        required />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputCity">Developers Required</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="devrequired"
                                        placeholder="Number of developers required"
                                        value={this.state.p_developers_required}
                                        onChange={this.onDeveloperChange}
                                        required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputAddress">Project Artifact</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="resume"
                                    placeholder="Project Artifact"
                                    value={this.state.p_artifact ? this.state.p_artifact.name : ''}
                                    ref={this.state.p_artifact}
                                    onChange={this.onArtifactChange}
                                    required
                                />
                            </div>

                            <Button type="submit" color="primary" >Create Project</Button>


                        </form>
                    </CardBody>
                </Card>


            </div>
        )
    }
}