import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { PostProps } from "../typings/post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/post");
      const posts = await response.json();
      setPosts(posts);
    })();
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <PostCard {...post} />)}</>;
};

export default Home;
