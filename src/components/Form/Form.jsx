import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";
import HeartButton from "../HeartButton/HeartButton";

const Form = () => {
  const [thoughts, setThoughts] = useState([]);

 

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        console.log(data)
      });
  }, []);
  return (
    <>
    <div className="mainWrapper">
      <form></form>
      <PostContainer thoughts={thoughts} />
      </div>
    </>
  );
};

export default Form;
