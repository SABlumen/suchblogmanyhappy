import { useLocation, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

interface Response {
    success: boolean;
    text: string;
}

export const SignUp: Component = () => {
    let username: HTMLInputElement;
    let email: HTMLInputElement;
    let password: HTMLInputElement;
    let passwordConfirm: HTMLInputElement;

    let errorField: HTMLParagraphElement;

    const navigate = useNavigate();
    const location = useLocation();

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
            .then(res => res.json() as Promise<Response>)
            .then(body => {
                if (body.success) {
                    navigate(location.state?.prevLocation ?? "/");
                    return;
                }

                errorField.innerHTML = body.text.trimEnd(); 
            })
            .catch(() => errorField.innerHTML = "Internal server error");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="username" ref={username} />
                <input type="email" ref={email} />
                <input type="password" ref={password} />
                <input type="password" ref={passwordConfirm} />
                <button type="submit">Sign up</button>
            </form>
            <p ref={errorField}></p>
        </>
    );
}
