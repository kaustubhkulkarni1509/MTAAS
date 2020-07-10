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
        applied_flag: ''
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))
        const req = {
            p_manager_id: this.props.p_manager_email,
            p_tester_id: user.u_email_id,
            p_id: this.props.p_id,
            p_name: this.props.p_name
        }
        console.log(req)
        const res = await axios.post(url.module+'/applyforproject', req)
        console.log(res)
        if (res.data.flag === "S") {
            this.setState(() => ({ open: true }))
            this.setState(() => ({ applied_flag: 'applied' }))
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
                                <b>Description : </b>{this.props.p_description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b> Skills Required : </b>{this.props.p_skill_req}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b> Domain : </b>{this.props.p_domain}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <b>Project Deadline : </b>{this.props.p_deadline}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {this.state.applied_flag === '' && <Button size="small" color="primary" onClick={this.onSubmit}>
                            Apply
                </Button>}
                        {this.state.applied_flag === 'applied' && <Button size="small" color="primary" disabled>
                            Already Applied
            </Button>}


                    </CardActions>
                </Card>
            </div>
        )
    }
}