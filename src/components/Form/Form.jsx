import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import HeartButton from "../HeartButton/HeartButton";
import SubmitButton from "../SubmitButton/SubmitButton";
import { FadeLoader } from "react-spinners";

import "./Form.css";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [error, setError] = useState("");
  const [newThoughtId, setNewThoughtId] = useState(null); // State to track the new thought ID
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    setLoading(true);
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false)
        console.log(data)
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newThought.length < 5) {
      setError("Your message is too short, it needs at least 5 letters 😔");
    } else {
      setLoading(true);
      fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newThought }),
      })
        .then((res) => res.json())
        .then((response) => {
          setThoughts([response, ...thoughts]);
          setNewThought("");
          setError("");
          setNewThoughtId(response._id); // Set the new thought ID
          setLoading(false);

        });
    }
  };

  const handleTextInputChange = (event) => {
    setNewThought(event.target.value);
  };
  return (
    <>
  
    {
      loading ? (
        <div className="loading-spinner" >
        <FadeLoader
        color={"#ffb7d2"} 
        loading={loading}
        size={150} 
        
        />
        </div>
      ) : (
        <div>
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
      <PostContainer thoughts={thoughts} newThoughtId={newThoughtId}/>
      </div>
      )
    }
      
    </>
  );
};

export default Form;
