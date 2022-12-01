import React, { FC } from "react";
import PostCard from "@/components/Card";
import Navbar from "@/layout/Navbar";
import style from "../styles/posts.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

interface IPostsProps {
  id: number;
  avatar: string;
  user: string;
  date: any;
  content: string;
}

interface IUsersProps {
  users: IPostsProps[];
}

const Posts: FC<IUsersProps> = ({ users }) => {
  const { push } = useRouter();
  const handleClick = (id: number) => {
    push(`/posts/${id}`);
  };

  return (
    <>
      <Head>
        <title>Post.com - All-Posts</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMMrz1O09fU_EOSF7kQzHNoqIHgJLg5k2kw&usqp=CAU"
        />
      </Head>
      <Navbar>
        <div className={style.posts_wrapper}>
          {users?.map(({ avatar, content, date, id, user }) => {
            return (
              <PostCard
                key={id}
                id={id}
                avatar={avatar}
                content={content}
                date={date}
                user={user}
                handleClick={handleClick}
              />
            );
          })}
        </div>
      </Navbar>
    </>
  );
};

export default Posts;

export async function getStaticProps() {
  try {
    const response = await fetch(`${process.env.API_HOST}/posts`);
    const users = await response.json();
    return {
      props: { users },
    };
  } catch {
    return {
      props: { users: null },
    };
  }
}
