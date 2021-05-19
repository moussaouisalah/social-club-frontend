import React, { useEffect, useState } from "react";
import Content from "../../../components/content/Content";
import PostCard from "../../../components/post-card/PostCard";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { postProvider } from "../../../providers/data-providers/postProvider";
import { userProvider } from "../../../providers/data-providers/userProvider";
import { Post } from "../../../types/Post";
import { User } from "../../../types/User";

type HomePageProps = {
  user: User | undefined;
};

const HomePage = ({ user }: HomePageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;
    // get posts from all clubs where user is a member
    postProvider
      .getManyByUser(user.id)
      .then(async (posts) => {
        return Promise.all(
          posts.map(async (post) => {
            // fill user
            post.user = await userProvider.getOne(post.userId);
            // fill club
            post.club = await clubProvider.getOne(post.clubId);
            return post;
          })
        );
      })
      .then((posts) => setPosts(posts));
  }, [user]);

  return (
    <Content>
      {posts.map((post, key) => (
        <PostCard
          key={key}
          clubId={post.clubId}
          userId={post.userId}
          firstName={post.user?.firstName || ""}
          lastName={post.user?.lastName || ""}
          clubName={post.club?.name}
          dateTime={post.creationDateTime}
          profileImage={post.club?.profileImage || undefined}
          color={post.club?.primaryColor}
          text={post.text}
          image={post.image}
          likesCount={post.likesCount || 0}
          commentsCount={post.commentsCount || 0}
        />
      ))}
    </Content>
  );
};

export default HomePage;
