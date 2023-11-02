import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import SubmitButton from "../SubmitButton/SubmitButton";
import { FadeLoader } from "react-spinners";

import "./Form.css";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [error, setError] = useState("");
  const [newThoughtId, setNewThoughtId] = useState(null); // State to track the new thought ID
  const [loading, setLoading] = useState(true);
  const [likedPostsCount, setLikedPostsCount] = useState(0);

  //useEffect for storing likes in local storage
  useEffect(() => {
    const storedCount = localStorage.getItem("likedPostsCount");
    if (storedCount) {
      setLikedPostsCount(parseInt(storedCount, 10));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(false);
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
              setError(
                "Your message is too short, it needs at least 5 letters 😔"
              );
              break;
            case "minlength":
              setError(
                `Your message is too short, it needs at least ${message.properties.minlength} letters 😔`
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
          setNewThoughtId(response._id); // Set the new thought ID
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    if (newThought.length > 140) {
      setError("Your message is too long 😔");
    } else {
      setError("");
    }
  }, [newThought.length]);

  const handleTextInputChange = (event) => {
    setNewThought(event.target.value);
  };
  return (
    <>
      {loading ? (
        <div className="loading-spinner">
          <FadeLoader color={"#ffb7d2"} loading={loading} size={150} />
        </div>
      ) : (
        <div>
          <div className="header">
            <h1 className="projectHeading">Project Happy Thoughts</h1>
            <h2 className="subHeading">Priya and Naima Project</h2>
            <p className="totalPostsLiked">Posts 👍 {likedPostsCount}</p>
          </div>
          <div className="postWrapper">
            <h2 className="inputQuestion">
              What is making you happy right now?
            </h2>
            <form className="formContainer">
              <textarea
                placeholder="'If music be the food of love, play on.' – William Shakespeare"
                value={newThought}
                onChange={handleTextInputChange}
              ></textarea>
            </form>
            <div className="postLength">
              {error && <p>{error}</p>}
              <div></div>
              <p
                style={{
                  color: `${newThought.length >= 140 ? "red" : "black"}`,
                }}
              >
                {newThought.length}/140
              </p>
            </div>
            <SubmitButton handleSubmit={handleSubmit} />
          </div>
          <PostContainer
            thoughts={thoughts}
            newThoughtId={newThoughtId}
            likedPostsCount={likedPostsCount}
            setLikedPostsCount={setLikedPostsCount}
          />
        </div>
      )}
    </>
  );
};

export default Form;
