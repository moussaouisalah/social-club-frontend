import React, { useEffect, useState } from "react";
import Content from "../../../components/content/Content";
import PostCard from "../../../components/post-card/PostCard";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { postProvider } from "../../../providers/data-providers/postProvider";
import { userProvider } from "../../../providers/data-providers/userProvider";
import { Post } from "../../../types/Post";
import { User } from "../../../types/User";
import banner1 from "../../../assets/banner.jpeg";
import banner2 from "../../../assets/banner2.jpeg";
import { SERVER_URL } from "../../../config.json";

type HomePageProps = {
  user: User | undefined;
};

const HomePage = ({ user }: HomePageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;
    // get posts from all clubs where user is a member
    postProvider.getManyByUser(user.id).then((posts) => setPosts(posts));
  }, [user]);

  return (
    <div className="content-wrapper">
      <Content>
        {posts.map((post, key) => (
          <PostCard
            key={key}
            postId={post.id}
            clubId={post.club.id}
            userId={post.user.id}
            firstName={post.user?.firstName || ""}
            lastName={post.user?.lastName || ""}
            clubName={post.club?.name}
            dateTime={post.creationdate}
            profileImage={post.club?.profileImage || undefined}
            color={post.club?.primaryColor}
            text={post.text}
            image={post.image}
            likesCount={post.likesCount || 0}
            commentsCount={post.commentsCount || 0}
          />
        ))}
      </Content>
      <div className="side-banner">
        <img className="banner" src={banner1} />
        <img className="banner" src={banner2} />
      </div>
    </div>
  );
};

export default HomePage;
