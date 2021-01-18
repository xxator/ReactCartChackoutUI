import React from 'react';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import App from './App';


class Routes extends React.Component {
    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/campaings">
                    <p>campaings</p>
                </Route>
                <Route exact path="/">
                    <App />
                </Route>
            </Switch>
        </BrowserRouter>)
    }
}

export default Routes;