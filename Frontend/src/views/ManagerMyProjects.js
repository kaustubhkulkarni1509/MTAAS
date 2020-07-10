import React from 'react'
import url from '../globalVariables'
import axios from 'axios'
import ManagerProject from "../components/Project/ManagerProject"

export default class managerMyProjects extends React.Component{
    state={
        projects:[]
    }

    async componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(url.module + '/managergetmyprojectnames', user)
        this.setState(() => ({ projects: res.data }))
    }
    render(){
        return(
            <div>
            <div >
            <div className="test1">
                {
                    this.state.projects.map((project) => (
                        <ManagerProject key={project.p_id}{...project} />
                    ))
                }
            </div>
        </div>
            </div>
        )
    }
}