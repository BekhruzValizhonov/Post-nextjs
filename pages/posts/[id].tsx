import React, { FC } from "react";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
import Head from "next/head";

interface IPost {
  title: string;
  body: string;
}

interface IAlbum {
  url: string;
}

interface ISinglePostProps {
  post: IPost;
  album: IAlbum;
}

const SinglePost: FC<ISinglePostProps> = ({ post, album }) => (
  <>
    <Head>
      <title>Post.com - {post.title}</title>
      <link
        rel="icon"
        href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMMrz1O09fU_EOSF7kQzHNoqIHgJLg5k2kw&usqp=CAU"
      />
    </Head>

    <Box sx={{ width: "90%", margin: "auto", textAlign: "center", mt: 2 }}>
      <Card sx={{ p: 5 }}>
        <img
          src={album.url}
          width={200}
          height={200}
          alt="404"
          style={{ borderRadius: 5 }}
        />
        {/* <Image src={album.url} width={50} height={50} alt="404" /> */}
        <h1>{post.title}</h1>
        <hr />
        <h1>{post.body}</h1>
      </Card>
    </Box>
  </>
);

export default SinglePost;

export async function getServerSideProps({ params }: any) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const post = await response.json();

    const albumResponse = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${params.id}`
    );
    const album = await albumResponse.json();

    return {
      props: { post, album },
    };
  } catch {
    return {
      props: { post: null, album: null },
    };
  }
}
