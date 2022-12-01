import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Navbar from "@/layout/Navbar";
import { Box } from "@mui/system";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import style from "../styles/create.module.css";
import { IUser } from "interface/IUser";
import { useRouter } from "next/router";
import Head from "next/head";

const Create: React.FC = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [newPost, setNewPost] = React.useState<IUser>({
    id: 7,
    avatar: "",
    content: "",
    date: value,
    user: "",
  });
  const { push } = useRouter();
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const createChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        id: newPost.id++,
        user: newPost.user,
        avatar: newPost.user,
        content: newPost.content,
        date: value,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  return (
    <>
      <Head>
        <title>Post.com - Create-Post</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMMrz1O09fU_EOSF7kQzHNoqIHgJLg5k2kw&usqp=CAU"
        />
      </Head>

      <Navbar>
        <Box
          sx={{ margin: "auto" }}
          className={style.main_wrapper}
          component="form"
          onSubmit={handleSubmit}
        >
          <Card sx={{ padding: "5px 10px", width: "100%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Full name"
              variant="outlined"
              name="user"
              value={newPost.user || ""}
              onChange={createChange}
              sx={{ mb: 2 }}
              required
              autoFocus
            />
            <TextField
              id="outlined-multiline-static"
              label="Post"
              placeholder="Lorem....."
              multiline
              rows={5}
              fullWidth
              name="content"
              value={newPost.content || ""}
              onChange={createChange}
              sx={{ mb: 2 }}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            <div style={{ textAlign: "end" }}>
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  if (newPost.user && newPost.content) return push("/posts");
                }}
              >
                Create
              </Button>
            </div>
          </Card>
        </Box>
      </Navbar>
    </>
  );
};

export default Create;
