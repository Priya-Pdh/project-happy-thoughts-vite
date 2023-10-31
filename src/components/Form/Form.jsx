import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import HeartButton from "../HeartButton/HeartButton";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./Form.css";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newThought }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.errors) {
          const message = response.errors.message;
          switch (message.kind) {
            case "required":
              setError("Posting a thought is required");
              break;
            case "minlength":
              setError(
                `Your message is too short, it needs at least ${message.minlength} letters 😔`
              );
              break;
            case "maxlength":
              setError(
                `Your message is too long, it needs to be less than ${message.properties.maxlength} letters 😔`
              );
              break;
            default:
              setError("Could not save thought");
          }
        } else {
          setThoughts([response, ...thoughts]);
          setNewThought("");
          setError("");
        }
      });
  };

  const handleTextInputChange = (event) => {
    setNewThought(event.target.value);
    setError("");
  };
  return (
    <>
      <div className="postWrapper">
        <h2>What is making you happy right now?</h2>
        <form className="formContainer">
          <textarea
            placeholder="'If music be the food of love, play on.' – William Shakespeare"
            value={newThought}
            onChange={handleTextInputChange}
          ></textarea>
        </form>
        <div className="postLength">
          {error && <p>{error}</p>}
          <p>{newThought.length}/140</p>
        </div>
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
      <PostContainer thoughts={thoughts} />
    </>
  );
};

export default Form;
