const PostContainer = ({ thoughts }) => {
  return (
    thoughts && (
      <ul>
        {thoughts.map((thought, id) => (
          <li key={id}>{thought.message}</li>
        ))}
      </ul>
    )
  );
};

export default PostContainer;
