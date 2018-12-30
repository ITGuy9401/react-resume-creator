import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Form from "./views/Form";
import Result from "./views/Result";
import "bulma/bulma.sass";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Form}/>
                    <Route path="/result" component={Result}/>
                </div>
            </Router>
        );
    }
}

export default App;
