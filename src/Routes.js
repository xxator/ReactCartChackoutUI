import React from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import App from './App';
import Campaign from './Components/Campaign'

class Routes extends React.Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/dashboard">
                    <Campaign/>
                </Route>
                <Route exact path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>)
    }
}

export default Routes;