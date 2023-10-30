import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import SubmitButton from "../SubmitButton/SubmitButton";

import "./Form.css";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
      });
  }, []);
  return (
    <>
      <div className="postWrapper">
        <h2>What is making you happy right now?</h2>
        <form className="formContainer">
          <textarea placeholder="'If music be the food of love, play on.' – William Shakespeare"></textarea>
        </form>
        <div className="postLength">
          <p>Error</p>
          <p>0/140</p>
        </div>
        <SubmitButton />
      </div>
      <PostContainer thoughts={thoughts} />
    </>
  );
};

export default Form;
