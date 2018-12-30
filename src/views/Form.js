/* eslint-disable no-restricted-globals */
import React from "react";
import {withRouter} from "react-router-dom";
import {Button, Container, Content, Control, Field, Input, Label, Select, Subtitle, TextArea, Title} from "bloomer";
import uuidv4 from "uuidv4";
import JobQuestion from "../components/JobQuestion";

class Form extends React.Component {

    state = {
        form: {
            jobs: [],
            academic: [],
            volunteer: []
        }
    };

    constructor(props) {
        super(props);
        this.onInputUpdate = this.onInputUpdate.bind(this);
        this.createPosition = this.createPosition.bind(this);
        this.removePosition = this.removePosition.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
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
                <Title>Resume Creator</Title>
                <Subtitle>Fill the form to create your resume</Subtitle>
                <Content>
                    <form className="form">
                        <Field>
                            <Label>First name</Label>
                            <Control>
                                <Input type="text" placeholder='Es. Anna' name="first_name"
                                       onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Last name</Label>
                            <Control>
                                <Input type="text" placeholder='Es. Wright' name="last_name"
                                       onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Gender</Label>
                            <Control>
                                <Select>
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
                                       onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Phone</Label>
                            <Control>
                                <Input type="text" placeholder='Es. +44 (0) 7777 777777' name="phone"
                                       onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Biography</Label>
                            <Control>
                                <TextArea placeholder="Write a bit about yourself" name="biography"
                                          onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Soft Skills</Label>
                            <Control>
                                <TextArea placeholder="Write a bit about your soft skills" name="soft_skills"
                                          onChange={this.onInputUpdate}/>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Hobbies & Passions</Label>
                            <Control>
                                <TextArea placeholder="Write a bit about your hobbies and passions" name="hobbies"
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

                        {this.props.jobs.map(e => <JobQuestion job={e} updatePosition={this.updatePosition}/>)}

                        <Subtitle>Academic Experience</Subtitle>
                        <Field>
                            <Control>
                                <Button isColor="primary" onClick={() => this.createPosition("A")}>
                                    Add New
                                </Button>
                            </Control>
                        </Field>
                        <Subtitle>Volunteer Experience</Subtitle>
                        <Field>
                            <Control>
                                <Button isColor="primary" onClick={() => this.createPosition("V")}>
                                    Add New
                                </Button>
                            </Control>
                        </Field>
                    </form>
                </Content>
            </Container>
        );
    }
}

export default withRouter(Form);