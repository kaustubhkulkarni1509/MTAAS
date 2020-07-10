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
import "../../assets/css/AppliedSingleProject.css"

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import url from "../../globalVariables"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class SingleProject extends React.Component {

    state = {
        open: false,
        vertical: 'top',
        horizontal: 'right',
        confirmed: ''
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))

    }

    onAccept = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))
        const req={
            pam_id:this.props.pam_id,
            action:'Approved'
        }
        const res = axios.post(url.module+'/approvependingrequests',req)
        if((await res).data.flag==='S'){
            this.setState(()=>({confirmed:'accepted',open:true}))
        }
        
    }

    onReject = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))
        const req={
            pam_id:this.props.pam_id,
            action:'Rejected'
        }
        const res = axios.post(url.module+'/approvependingrequests',req)
        if((await res).data.flag==='S'){
            this.setState(()=>({confirmed:'rejected',open:true}))
        }
        
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
                        Request processed successfully !
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
                                        <b> Skills Required : </b>{this.props.p_skill_req}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Project Deadline : </b>{this.props.p_deadline}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Description : </b>{this.props.p_description}
                                    </Typography>
                                </div>
                                <div className="innerdiv">
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>Tester Name : </b>{this.props.u_first_name + ' ' + this.props.u_last_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b> Tester Email Id : </b>{this.props.p_tester_id}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <a href={this.props.t_resume_link} color="primary" tabIndex="-1" role="button" aria-disabled="true">Tester Resume</a>
                                    </Typography>
                                </div>
                            </div>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {this.state.confirmed === '' &&
                            <div>
                                <Button size="small" color="primary" onClick={this.onAccept}>
                                    Accept
                        </Button>
                                <Button size="small" color="primary" onClick={this.onReject}>
                                    Reject
                        </Button>
                            </div>
                        }
                        {this.state.confirmed === 'rejected' &&

                            <Button size="small" color="primary" disabled>
                                Application Rejected
                            </Button>
                        }
                        {this.state.confirmed === 'accepted' &&

                            <Button size="small" color="primary" disabled>
                                Application Accepted
                            </Button>
                        }

                    </CardActions>
                </Card>
            </div>
        )
    }
}