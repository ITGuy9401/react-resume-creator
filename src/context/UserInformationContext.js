import React from "react";

export const UserInformationContext = React.createContext();
export const UserInformationContextConsumer = UserInformationContext.Consumer;

export class UserInformationContextProvider extends React.Component {

    state = {};

    render() {
        return (
            <UserInformationContext.Provider value={this.state}>
                {...this.props.children}
            </UserInformationContext.Provider>
        )
    }
}