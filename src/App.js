import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./views/Form";
import Result from "./views/Result";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Form}/>
                <Route path="/result" component={Result}/>
            </Router>
        );
    }
}

export default App;
