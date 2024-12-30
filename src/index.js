import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";

import Home from './components/home';
import OffPlan from './components/OffPlan';
import contact from './components/contact';
import ReadyToMove from './components/ReadyToMove';
import about from './components/about';
import property from './components/property';
import FloatingBubbles from './components/FloatingBubbles';
import Search from './components/Search';
import ProjectOwner from './components/ProjectOwner';
import ExternalDetails from './components/ExternalDetails';
import AssistBot from './components/AssistBot';
class Root extends Component {
    render() {
        return(
            <HashRouter basename="/">
                <div>
                <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/OffPlan" component={OffPlan} />
                <Route path="/ReadyToMove" component={ReadyToMove} />
                <Route path="/about" component={about} />
                <Route path="/contact" component={contact} />
                <Route path="/property/:id" component={property} />
                <Route path="/Search" component={Search} />
                <Route path="/ProjectOwner/:id" component={ProjectOwner} />
                <Route path="/ExternalDetails/:id" component={ExternalDetails} />

                </Switch>
                <FloatingBubbles />
                <AssistBot />
                </div>
            </HashRouter>
        )
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('quarter'));