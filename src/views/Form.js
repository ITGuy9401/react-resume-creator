import React from "react";
import {withRouter} from "react-router-dom";
import {Container, Content, Control, Field, Input, Label, Select, Subtitle, Title} from "bloomer";

class Form extends React.Component {

    state = {
        form: {}
    };

    constructor(props) {
        super(props);
        this.onInputUpdate = this.onInputUpdate.bind(this);
    }

    onInputUpdate(event) {
        const form = {...this.state.form};
        form[event.target.name] = event.target.value;
        this.setState({form: form});
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
                    </form>
                </Content>
            </Container>
        );
    }
}

export default withRouter(Form);