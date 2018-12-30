import React from "react";
import {Box, Button, Control, Field, Input, Label, TextArea} from "bloomer";

export default class AcademicQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
    }


    updatePosition(kind, uuid, event) {
        this.props.updatePosition(kind, uuid, event);
    }


    removePosition(kind, uuid, event) {
        this.props.removePosition(kind, uuid, event);
    }

    render() {
        const e = this.props.job;
        return (
            <Box key={e.uuid}>
                <Field>
                    <Label>Field of Study / Degree</Label>
                    <Control>
                        <Input type="text" placeholder='Es. Master in Computer Science' name="position"
                               defaultValue={e.position}
                               onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>
                <Field>
                    <Label>University</Label>
                    <Control>
                        <Input type="text" placeholder='Es. Edinburgh University' name="company"
                               defaultValue={e.company}
                               onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>
                <Field>
                    <Label>Start Date</Label>
                    <Control>
                        <Input type="date" name="start_date"
                               defaultValue={e.start_date}
                               onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>

                <Field>
                    <Label>Current?</Label>
                    <Control>
                        <input type="checkbox" name="current"
                               defaultValue={e.current}
                               onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>

                <Field>
                    <Label>End Date</Label>
                    <Control>
                        <Input type="date" name="end_date" disabled={e.current}
                               placeholder="leave empty if no end date"
                               defaultValue={e.end_date}
                               onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>

                <Field>
                    <Label>Description</Label>
                    <Control>
                        <TextArea
                            placeholder="Describe your experience,
                            what have you learnt, and the technologies used"
                            name="description" defaultValue={e.description}
                            onChange={event => this.updatePosition("A", e.uuid, event)}/>
                    </Control>
                </Field>

                <Field>
                    <Label>Actions</Label>
                    <Control>
                        <Button isColor="danger"
                                onClick={() => this.removePosition("A", e.uuid)}>Delete</Button>
                    </Control>
                </Field>
            </Box>
        );
    }
}