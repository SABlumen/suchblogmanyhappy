import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

export const SignUp: Component = () => {
    let username: HTMLInputElement;
    let email: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;

    const navigate = useNavigate();

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("username", username.value);
        data.append("email", email.value);
        data.append("password", password.value);
        data.append("password-confirm", passwordConfirm.value);
    
        fetch("http://localhost:5000/api/signup", {
            method: "POST",
            body: data,
        })
            .then(res => res.json())
            .then(body => {
                if (body.success) {
                    navigate("/");
                    return;
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="username" ref={username} />
            <input type="email" ref={email} />
            <input type="password" ref={password} />
            <input type="password" ref={passwordConfirm} />
            <button type="submit">Sign up</button>
        </form>
    );
}
