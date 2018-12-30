import React from "react";
import {withRouter} from "react-router-dom";
import {withUserInformationCtx} from "../context/UserInformationContext";

class Result extends React.Component {

    render() {
        return (
            <h1>Hello Result</h1>
        );
    }
}

export default withRouter(withUserInformationCtx(Result));