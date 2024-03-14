import { Component, ParentComponent } from 'solid-js'
import { A, useLocation } from '@solidjs/router'

const App: ParentComponent = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    );
}

const Header: Component = () => {
  return (
    <nav>
        <A href='/'>Home</A>
        <LoginPanel />
    </nav>
  );
}

const LoginPanel: Component<{ userID?: string }> = (props) => {
    const location = useLocation();

    if (props.userID)
        return (
            <></>
        );

    return (
        <div style="float: right;">
            <A href='/signup' state={{ prevLocation: location.pathname }} style='margin-right: 1rem;'>Sign up</A>
            <A href='/login' state={{ prevLocation: location.pathname }}>Login</A>
        </div>
    );
}

export default App
