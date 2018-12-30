import React from "react";

export const UserInformationContext = React.createContext();
export const UserInformationContextConsumer = UserInformationContext.Consumer;

export class UserInformationContextProvider extends React.Component {

    state = {
        form: {}
    };

    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
    }

    saveForm(form) {
        this.setState({form: form});
    }

    componentDidMount() {
        this.setState({
            saveForm: this.saveForm
        });
    }

    render() {
        return (
            <UserInformationContext.Provider value={this.state}>
                {this.props.children}
            </UserInformationContext.Provider>
        )
    }
}

export function withUserInformationCtx(Component) {
    return props => <UserInformationContext.Consumer>
        {value => <Component userInfo={value} {...props}/>}
    </UserInformationContext.Consumer>;
}