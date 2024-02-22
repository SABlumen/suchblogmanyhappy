import { Component, ParentComponent } from 'solid-js'
import { A } from '@solidjs/router'

const App: ParentComponent = (props) => {
    return (
        <>
            <Header />
            {props.children}
        </>
    )
}

const Header: Component = () => {
  return (
    <nav>
        <A href='/'>Home</A>
        <LoginPanel />
    </nav>
  )
}

const LoginPanel: Component<{ userID?: string }> = (props) => {
    if (props.userID)
        return (
            <></>
        );

    return (
        <div style="float: right;">
            <A href='/signup' style='margin-right: 1rem;'>Sign up</A>
            <A href='/login'>Login</A>
        </div>
    )
}

export default App
