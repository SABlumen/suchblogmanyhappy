/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'

const Home = lazy(() => import("./Home"));

const root = document.getElementById('root')

render(
    () => (
        <Router root={App}>
            <Route path="/" component={Home} />
        </Router>
    ),
    root!
);
