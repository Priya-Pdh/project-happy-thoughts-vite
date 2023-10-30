import { useState, useEffect } from "react";
import PostContainer from "../PostContainer/PostContainer";

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
      <form></form>
      <PostContainer thoughts={thoughts} />
    </>
  );
};

export default Form;
