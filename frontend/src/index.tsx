/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import { Route, Router } from '@solidjs/router'
import { SignUp } from './login'
import Home from './Home'

const root = document.getElementById('root')

render(
    () => (
        <Router root={App}>
            <Route path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
        </Router>
    ),
    root!
);
