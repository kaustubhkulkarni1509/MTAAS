import React from 'react'
import axios from 'axios'
import url from "../globalVariables"
import AcceptedSingleProject from "../components/Project/AcceptedSingleProject"

export default class RejectedProjects extends React.Component {
    state = {
        projects: []
    }

    async componentWillMount() {
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(url.module + '/getmyprojectrejected', user)
        this.setState(() => ({ projects: res.data }))
    }

    render() {
        return (
            <div>
                <div >
                    <div className="test1">
                        {
                            this.state.projects.map((project) => (
                                <AcceptedSingleProject key={project.p_id}{...project} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}