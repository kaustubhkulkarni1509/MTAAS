import React from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import "../assets/css/ScheduleRun.css"
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import url from "../globalVariables"

export default class ScheduleRun extends React.Component {
    state = {
        loading: false,
        projects:[],
        apkFile: React.createRef(),
        projectName: ['project1', 'project2'],
        selectedTestFiles: [],
        selectedProjectName: 'project1',
        runName: '',
        OS: ['Android', 'iOS'],
        selectedOS: 'Android',
        devicePoolName: '',
        testType: 'BUILTIN_FUZZ',
        testTypes: ['BUILTIN_FUZZ', 'BUILTIN_EXPLORER'],
        selectedDevice: [],
        devices: [
            { label: 'Samsung Galaxy S9 (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77' },
            { label: 'Samsung Galaxy S9+ (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368' },
        ],

        allOptions: [
            [
                { label: 'Samsung Galaxy S9 (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:F27533F73A894EBDACC0E1B694288B77' },
                { label: 'Samsung Galaxy S9+ (Unlocked) - OS 8', value: 'arn:aws:devicefarm:us-west-2::device:E86BDD6A40FB4235957517589B2DA368' }
            ],
            [
                { label: 'Apple iPhone 11 Pro Max - OS 13.1.3', value: 'arn:aws:devicefarm:us-west-2::device:8DCCC145A8A54191B61C6EF67F27F507' },
                { label: 'Apple iPhone 11 - OS 13.1.3', value: 'arn:aws:devicefarm:us-west-2::device:8EFC9DF49F09451E831E93DA281DAF9F' }
            ]],
        allTestingFileNames: [
            [
                { label: 'Android Test', value: 'AndroidTest.java' },
                { label: 'Android Test - 1', value: 'AndroidTest1.java' }
            ],
            [
                { label: 'IOS Test', value: 'IOSTest.java' },
                { label: 'IOS Test - 1', value: 'IOSTest1.java' }
            ]
        ],
        selectedTestFile: [
            { label: 'Android Test', value: 'AndroidTest.java' },
            { label: 'Android Test - 1', value: 'AndroidTest1.java' }
        ],
    }

    async componentDidMount() {
        const user= JSON.parse(localStorage.getItem('user'))
        const projects = await axios.post(url.module+'/getmyprojectnames',user)
        console.log(projects.data)
        this.setState(()=>({projects:projects.data}))

    }

    onChangeProjectName = (e) => {
        const selectedProjectName = e.target.value
        console.log(selectedProjectName)
        this.setState(() => ({ selectedProjectName }))
    }

    onChangeRunName = (e) => {
        const runName = e.target.value
        this.setState(() => ({ runName }))
    }

    onChangeOS = (e) => {
        const selectedOS = e.target.value
        console.log(selectedOS)
        if (selectedOS === 'Android') {
            this.setState(() => ({ devices: this.state.allOptions[0], selectedTestFile: this.state.allTestingFileNames[0] }))
        }
        if (selectedOS === 'iOS') {
            this.setState(() => ({ devices: this.state.allOptions[1], selectedTestFile: this.state.allTestingFileNames[1] }))
        }
        this.setState(() => ({ selectedOS }))
    }

    onChangeDevice = (e) => {
        const options = e.target.options

        const values = []

        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value)
            }
        }

        console.log(values)
        this.setState(() => ({ selectedDevice: values }))

    }

    onTestFileChange = (e) => {
        const options = e.target.options

        const values = []

        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value)
            }
        }
        this.setState(() => ({ selectedTestFiles: values }))
    }

    onDevicePoolNameChange = (e) => {
        const devicePoolName = e.target.value
        this.setState(() => ({ devicePoolName }))
    }

    onChangeTestType = (e) => {
        const testType = e.target.value
        this.setState(() => ({ testType }))
    }

    handleOnSubmit = async (e) => {
        e.preventDefault()

        const user = JSON.parse(localStorage.getItem('user'))
        let appFileType = ''
        if (this.state.selectedOS === 'Android') {
            appFileType = 'ANDROID_APP'
        }
        if (this.state.selectedOS === 'iOS') {
            appFileType = 'iOS_APP'
        }
        const req = {
            projectId:this.state.projects.p_id,
            userId: user.u_email_id,
            projectName: this.state.selectedProjectName,
            testRunName: this.state.runName,
            appFileType: appFileType,
            devicePoolName: this.state.devicePoolName,
            devicePoolARNs: this.state.selectedDevice,
            maxDevice: this.state.selectedDevice.length,
            testType: this.state.testType,
            testPackageFileType: '',
            testFileNames: this.state.selectedTestFiles
        }
        console.log(req)

        const apkFile = this.state.apkFile !== null ? this.state.apkFile.current.files[0] : ''
        const formData = new FormData();
        formData.append('package', apkFile);
        formData.append('details', JSON.stringify(req))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData)
        const res = await axios.post(url.module + '/createTestRun', formData, config)
        console.log(res)
    }

    onUploadedFileChange = (e) => {

    }



    render() {
        return (
            <div>
                {this.state.loading && <center><CircularProgress /></center>}

                <Card>
                    <CardHeader color="primary">
                        <h4 className="cardTitleWhite">Schedule a New Test Run</h4>

                    </CardHeader>
                    <CardBody>
                        <form onSubmit={this.handleOnSubmit}>


                            <div className="form-group">
                                <label>Project Name: </label>
                                <select ref="userInput"
                                    required
                                    multiple={false}
                                    className="form-control"
                                    value={this.state.selectedProjectName}
                                    onChange={this.onChangeProjectName}>
                                    {
                                        this.state.projects.map((project) => {
                                            return <option key={project.p_name} value={project.p_name}>{project.p_name}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Run Name: </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    value={this.state.runName}
                                    onChange={this.onChangeRunName}></input>
                            </div>

                            <div className="form-group">
                                <label>Operating System for devices: </label>
                                <select ref="userInput"
                                    required
                                    multiple={false}
                                    className="form-control"
                                    value={this.state.selectedOS}
                                    onChange={this.onChangeOS}>
                                    {
                                        this.state.OS.map((os) => {

                                            return <option key={os} value={os}>{os}</option>
                                        })
                                    }
                                </select>
                            </div>



                            <div className="form-group">
                                <label>Select Mobile Devices</label>
                                <select
                                    required
                                    multiple={true}
                                    className="form-control"
                                    value={this.state.selectedDevice}
                                    onChange={this.onChangeDevice}>
                                    {
                                        this.state.devices.map((device) => {
                                            return <option key={device.label} value={device.value}>{device.label}</option>
                                        })
                                    }
                                </select>

                            </div>

                            <div className="form-group">
                                <label>Selected Device Pool Name </label>
                                <input
                                    type="text"
                                    required
                                    className="form-control"
                                    value={this.state.devicePoolName}
                                    onChange={this.onDevicePoolNameChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Type of test: </label>
                                <select
                                    required
                                    className="form-control"
                                    value={this.state.testType}
                                    onChange={this.onChangeTestType}>
                                    {
                                        this.state.testTypes.map((tt) => {
                                            return <option key={tt} value={tt}>{tt}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Select Test File</label>
                                <select
                                    required
                                    multiple={true}
                                    className="form-control"
                                    value={this.state.selectedTestFiles}
                                    onChange={this.onTestFileChange}>
                                    {
                                        this.state.selectedTestFile.map((tt) => {
                                            return <option key={tt.label} value={tt.value}>{tt.label}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group files">
                                <label>Upload Application (.apk/.isa) File </label>
                                <input
                                    type="file"
                                    required
                                    className="form-control"
                                    multiple=""
                                    ref={this.state.apkFile}
                                    value={this.state.apkFile ? this.state.apkFile.name : ''}
                                    onChange={this.onUploadedFileChange}></input>
                            </div>

                            <Button type="submit" color="primary" >Schedule Run</Button>


                        </form>


                    </CardBody>
                </Card>




            </div>



        )
    }
}