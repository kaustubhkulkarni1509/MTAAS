import React from 'react'
import axios from 'axios'
import url from "../globalVariables"
import SingleTestInfo from "../components/Project/SingleTestInfo"
import nextId from "react-id-generator";
export default class TestInfoManager extends React.Component{
    
    state={
        projects:[],
        count:0
    }

    async componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(url.module+'/getprojectartifacts',user)
        this.setState(()=>({projects:res.data}))
    }

    render(){
        return(
            <div>

                {this.state.projects && this.state.projects.map((project)=>(
                    <SingleTestInfo key={nextId()}{...project}/>
                    
                ))}
            </div>
        )
    }
}