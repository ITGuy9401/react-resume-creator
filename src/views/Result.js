import React from "react";
import {withRouter} from "react-router-dom";
import {withUserInformationCtx} from "../context/UserInformationContext";
import {Content, Hero, HeroBody, Subtitle, Title} from "bloomer";

class Result extends React.Component {

    render() {
        const {userInfo} = this.props;
        const {form} = userInfo;
        return (
            <div>
                <Hero>
                    <HeroBody>
                        <Content>
                            <Title className="has-text-centered">{form.first_name} {form.last_name}</Title>
                            <p>
                                {form.address} | {form.email} | {form.phone}
                            </p>
                        </Content>
                    </HeroBody>
                </Hero>
                <Subtitle>Brief Summary</Subtitle>
                <div>
                    {form.biography.split('\n').map((item, i) => (
                        <p key={i}>{item}<br/></p>
                    ))}
                </div>
                <br/>
                {this.renderWorkExperience(form)}
                {this.renderVolunteerExperience(form)}
                {this.renderAcademicExperience(form)}
                <Subtitle>Soft Skills & Hobbies</Subtitle>
                <div>
                    {form.soft_skills.split('\n').map((item, i) => (
                        <p key={i}>{item}<br/></p>
                    ))}
                </div>
                <br/>
                <div>
                    {form.hobbies.split('\n').map((item, i) => (
                        <p key={i}>{item}<br/></p>
                    ))}
                </div>
            </div>
        );
    }

    renderWorkExperience(form) {
        if (!!form.jobs && form.jobs.length > 0) {
            return (
                <div>
                    <Subtitle>Work Experience</Subtitle>
                    {form.jobs
                        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                        .map(e => (
                            <div key={e.uuid}>
                                <p>
                                    <b>{e.position}, {e.company}</b>
                                    - {e.start_date} - {!!e.current || !e.end_date ? "Current" : e.end_date}
                                </p>
                                <p>{e.description.split('\n').map((item, i) => (
                                    <p key={i}>{item}<br/></p>
                                ))}</p>
                                <br/>
                            </div>
                        ))}
                </div>
            );
        } else return <span/>;
    }

    renderAcademicExperience(form) {
        if (!!form.academic && form.academic.length > 0) {
            return (
                <div>
                    <Subtitle>Studies</Subtitle>
                    {form.academic
                        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                        .map(e => (
                            <div key={e.uuid}>
                                <p>
                                    <b>{e.position}, {e.company}</b>
                                    - {e.start_date} - {!!e.current || !e.end_date ? "Current" : e.end_date}
                                </p>
                                <p>{e.description.split('\n').map((item, i) => (
                                    <p key={i}>{item}<br/></p>
                                ))}</p>
                                <br/>
                            </div>
                        ))}
                </div>
            );
        } else return <span/>;
    }

    renderVolunteerExperience(form) {
        if (!!form.academic && form.academic.length > 0) {
            return (
                <div>
                    <Subtitle>Volunteer Experience</Subtitle>
                    {form.academic
                        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
                        .map(e => (
                            <div key={e.uuid}>
                                <p>
                                    <b>{e.position}, {e.company}</b>
                                    - {e.start_date} - {!!e.current || !e.end_date ? "Current" : e.end_date}
                                </p>
                                <p>{e.description.split('\n').map((item, i) => (
                                    <p key={i}>{item}<br/></p>
                                ))}</p>
                                <br/>
                            </div>
                        ))}
                </div>
            );
        } else return <span/>;
    }
}

export default withRouter(withUserInformationCtx(Result));