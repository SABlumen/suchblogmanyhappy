/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import { Route, Router } from '@solidjs/router'
import { SignUp } from './login'
import Home from './Home'
import CreatePost from './CreatePost'

const root = document.getElementById('root')

render(
    () => (
        <Router root={App}>
            <Route path="/" component={Home} />
            <Route path="/signup" component={SignUp} />

            <Route path="/post" component={CreatePost} />
        </Router>
    ),
    root!
);
