import React from 'react'
import axios from 'axios'
import url from "../globalVariables"
import AppliedSingleProject from "../components/Project/AppliedSingleProject"
export default class PendingRequest extends React.Component {
    
    state={
        res:''
    }

    async componentWillMount(){
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post(url.module+'/getpendingrequests',user)
        console.log(res)
        this.setState(()=>({res:res.data}))
    }
    
    render(){
        return (
            <div>
                {this.state.res && 
                    <div >
                    <div className="test1">
                        {
                            this.state.res.map((project) => (
                                <AppliedSingleProject key={project.p_id}{...project} />
                            ))
                        }
                    </div>
                </div> }

                

            </div>
        )
    }
}