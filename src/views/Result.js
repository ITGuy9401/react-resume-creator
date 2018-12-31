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
                    {form.biography}
                </div>
                <br/>
                <Subtitle>Work Experience</Subtitle>

            </div>
        );
    }
}

export default withRouter(withUserInformationCtx(Result));