import HeartButton from "../HeartButton/HeartButton";
import "./PostContainer.css";

const PostContainer = ({ thoughts }) => {

  return (
    thoughts && (
      <div className="postedThoughtsContainer">
        {thoughts.map((thought, id) => (
          <>
            <div className="messageList" key={id}>
              <p  className="happyThoughts">
                {thought.message}
              </p>
            </div>
            <div className="infoWrapper">
              <div className="infoLikes">
                <HeartButton thoughts={[thought]} />
              </div>
              <div className="infoTime">Time </div>
            </div>
          </>
        ))}
      </div>
    )
  );
};

export default PostContainer;
