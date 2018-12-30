import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./views/Form";
import Result from "./views/Result";
import "bulma/bulma.sass";
import {UserInformationContextProvider} from "./context/UserInformationContext";

class App extends Component {
    render() {
        return (
            <Router>
                <UserInformationContextProvider>
                    <Route exact path="/" render={props => <Form {...props}/>}/>
                    <Route path="/result" render={props => <Result {...props}/>}/>
                </UserInformationContextProvider>
            </Router>
        );
    }
}

export default App;
