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
import "../assets/css/SearchedProject.css"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SingleProject from "components/Project/SingleProject"
import url from "../globalVariables"

export default class SearchProjct extends React.Component {
    state = {
        skill1: '',
        skill2: '',
        skill3: '',
        skill4: '',
        projects: ''
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

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log('inside submit')
        let skill = this.state.skill1
        if (this.state.skill2 !== '') {
            skill = skill + ',' + this.state.skill2
        }
        if (this.state.skill3 !== '') {
            skill = skill + ',' + this.state.skill3
        }
        if (this.state.skill4 !== '') {
            skill = skill + ',' + this.state.skill4
        }

        const user = JSON.parse(localStorage.getItem('user'))

        const req = {
            t_email_id:user.u_email_id,
            skills:skill
        }

        const res = await axios.post(url.module+'/searchproject',req)
        this.setState(()=>({
            projects:res.data
        }))

    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader color="primary">
                        <h4 className="cardTitleWhite">Create New Test Project</h4>

                    </CardHeader>
                    <CardBody>
                        <form onSubmit={this.handleSubmit}>


                            <label htmlFor="inputEmail4">Skills Required For Project</label>

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



                            <Button type="submit" color="primary" >Search Project</Button>


                        </form>


                    </CardBody>
                </Card>
                
                {this.state.projects &&
                    
                    
                    <div >
                        <div className="test1">
                            {
                                this.state.projects.map((project) => (
                                    <SingleProject key={project.p_id}{...project} />
                                ))
                            }
                        </div>
                    </div>}

            </div>
        )
    }
}