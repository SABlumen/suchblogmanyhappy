import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import { Component, onMount } from "solid-js";

const CreatePost: Component = () => {
    let textArea: HTMLTextAreaElement;

    onMount(() => {
        new EasyMDE({ element: textArea });
    });

    return <div>
        <textarea ref={textArea} />
    </div>;
}

export default CreatePost;
