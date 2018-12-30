/* eslint-disable no-restricted-globals */
import React from "react";
import {withRouter} from "react-router-dom";
import {
    Button,
    Container,
    Content,
    Control,
    Field,
    Hero,
    HeroBody,
    Input,
    Label,
    Select,
    Subtitle,
    TextArea,
    Title
} from "bloomer";
import uuidv4 from "uuidv4";
import JobQuestion from "../components/JobQuestion";
import VolunteerQuestion from "../components/VolunteerQuestion";
import AcademicQuestion from "../components/AcademicQuestion";
import {withUserInformationCtx} from "../context/UserInformationContext";

class Form extends React.Component {

    state = {
        loading: false,
        form: {
            jobs: [],
            academic: [],
            volunteer: []
        }
    };

    constructor(props) {
        super(props);
        this.download = this.download.bind(this);
        this.generate = this.generate.bind(this);
        this.onInputUpdate = this.onInputUpdate.bind(this);
        this.readSingleFile = this.readSingleFile.bind(this);
        this.createPosition = this.createPosition.bind(this);
        this.removePosition = this.removePosition.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    download() {
        this.setState({downloadUrl: null});

        const json = JSON.stringify(this.state.form);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        this.setState({downloadUrl: URL.createObjectURL(blob)});
    }

    generate() {
        this.props.userInfo.saveForm(this.state.form);
        this.props.history.push("/result");
    }

    readSingleFile(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const c = JSON.parse(e.target.result);
            c.jobs = c.jobs || [];
            c.academic = c.academic || [];
            c.volunteer = c.volunteer || [];
            this.setState({loading: false, form: c});
        };
        reader.readAsText(file);
    }


    static resolveKind(kind) {
        return kind === "J" ? "jobs" : kind === "A" ? "academic" : "volunteer";
    }

    createPosition(kind) {
        const e = Form.resolveKind(kind);
        const entry = {
            uuid: uuidv4()
        };

        const form = {...this.state.form};
        form[e] = form[e] || [];
        form[e].push(entry);

        this.setState({form: form}, () => console.debug(this.state)); // debug
    }

    removePosition(kind, uuid) {
        const e = Form.resolveKind(kind);
        const form = {...this.state.form};
        form[e] = form[e] || [];
        let idx = -1;
        let found = null;

        for (let i = 0; i < form[e].length; i++) {
            console.debug(form[e][i]);
            if (form[e][i].uuid === uuid) {
                idx = i;
                found = form[e][i];
                break;
            }
        }

        if (!found) {
            alert(`Cannot find ${e} with id ${uuid}`);
        }

        if (!!found && confirm(`Are you sure you want to delete element about ${found.position} at ${found.company}?`)) {
            form[e].splice(idx, 1);
        }

        this.setState({form: form}, () => console.debug(this.state)); // debug
    }

    updatePosition(kind, uuid, event) {
        const e = Form.resolveKind(kind);
        const form = {...this.state.form};
        form[e] = form[e] || [];
        let found = null;

        for (let i = 0; i < form[e].length; i++) {
            console.debug(form[e][i]);
            if (form[e][i].uuid === uuid) {
                found = true;
                form[e][i][event.target.name] = event.target.value;
                break;
            }
        }

        if (!found) {
            alert(`Cannot find ${e} with id ${uuid}`);
        }

        this.setState({form: form}, () => console.debug(this.state)); // debug
    }

    onInputUpdate(event) {
        const form = {...this.state.form};
        form[event.target.name] = event.target.value;
        this.setState({form: form}, () => console.debug(this.state)); // debug
    }

    render() {
        return (
            <Container>
                <Hero isColor="primary">
                    <HeroBody>
                        <Content>
                            <Title>Resume Creator</Title>
                            <Subtitle>Fill the form to create your resume</Subtitle>
                        </Content>
                    </HeroBody>
                </Hero>
                <Content>
                    <form className="form">
                        <Field>
                            <Label>Restore save</Label>
                            <Control>
                                <Input type="file" placeholder='Es. resume.json' name="fileRestore"
                                       onChange={this.readSingleFile}/>
                            </Control>
                        </Field>

                        {this.state.loading ? null : this.renderFields()}

                        <br/>

                    </form>
                </Content>
            </Container>
        );
    }

    renderFields() {
        return (
            <div>
                <Field>
                    <Label>First name</Label>
                    <Control>
                        <Input type="text" placeholder='Es. Anna' name="first_name"
                               defaultValue={this.state.form.first_name}
                               onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <Control>
                        <Input type="text" placeholder='Es. Wright' name="last_name"
                               defaultValue={this.state.form.last_name}
                               onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Home Address</Label>
                    <Control>
                        <Input type="text"
                               defaultValue={this.state.form.address}
                               placeholder='Es. 1 Princes Street, EH0 0XX, Edinburgh, United Kingdom'
                               name="address" onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Gender</Label>
                    <Control>
                        <Select name="gender" onChange={this.onInputUpdate}
                                defaultValue={this.state.form.gender}>
                            <option>Please Choose</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="X">Other</option>
                        </Select>
                    </Control>
                </Field>
                <Field>
                    <Label>E-Mail</Label>
                    <Control>
                        <Input type="email" placeholder='Es. annawright@gmail.com' name="email"
                               defaultValue={this.state.form.email}
                               onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Phone</Label>
                    <Control>
                        <Input type="text" placeholder='Es. +44 (0) 7777 777777' name="phone"
                               defaultValue={this.state.form.phone}
                               onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Biography</Label>
                    <Control>
                                <TextArea placeholder="Write a bit about yourself" name="biography"
                                          defaultValue={this.state.form.biography}
                                          onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Soft Skills</Label>
                    <Control>
                                <TextArea placeholder="Write a bit about your soft skills" name="soft_skills"
                                          defaultValue={this.state.form.soft_skills}
                                          onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Hobbies & Passions</Label>
                    <Control>
                                <TextArea placeholder="Write a bit about your hobbies and passions" name="hobbies"
                                          defaultValue={this.state.form.hobbies}
                                          onChange={this.onInputUpdate}/>
                    </Control>
                </Field>
                <Subtitle>Job Positions</Subtitle>
                <Field>
                    <Control>
                        <Button isColor="primary" onClick={() => this.createPosition("J")}>
                            Add New
                        </Button>
                    </Control>
                </Field>

                {this.state.form.jobs.map(e => <JobQuestion job={e}
                                                            removePosition={this.removePosition}
                                                            updatePosition={this.updatePosition}/>)}

                <Subtitle>Academic Experience</Subtitle>
                <Field>
                    <Control>
                        <Button isColor="primary" onClick={() => this.createPosition("A")}>
                            Add New
                        </Button>
                    </Control>
                </Field>

                {this.state.form.academic.map(e => <AcademicQuestion job={e}
                                                                     removePosition={this.removePosition}
                                                                     updatePosition={this.updatePosition}/>)}

                <Subtitle>Volunteer Experience</Subtitle>
                <Field>
                    <Control>
                        <Button isColor="primary" onClick={() => this.createPosition("V")}>
                            Add New
                        </Button>
                    </Control>
                </Field>

                {this.state.form.volunteer.map(e => <VolunteerQuestion job={e}
                                                                       removePosition={this.removePosition}
                                                                       updatePosition={this.updatePosition}/>)}
                <br/>

                <Field>
                    <Control>
                        <Button isColor="info" onClick={this.download}>
                            Generate the download
                        </Button>&nbsp;
                        <Button isColor="info" download="resume.json" href={this.state.downloadUrl}
                                disabled={!this.state.downloadUrl}>
                            Download
                        </Button>&nbsp;
                        <Button isColor="primary" onClick={this.generate}>
                            Generate the Curriculum
                        </Button>
                    </Control>
                </Field>
            </div>
        );
    }
}

export default withRouter(withUserInformationCtx(Form));