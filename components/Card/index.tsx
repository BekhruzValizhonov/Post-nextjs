import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface IPostCardProps {
  id: number;
  avatar: string;
  user: string;
  date: any;
  content: string;
  handleClick: (id: number) => void;
}

const PostCard: React.FC<IPostCardProps> = ({
  id,
  avatar,
  content,
  date,
  user,
  handleClick,
}) => {
  return (
    <Card sx={{ maxWidth: 345, mt: 2, cursor: "pointer" }} key={id}>
      <CardHeader
        onClick={() => handleClick(id)}
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
              width: "50px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
            aria-label="recipe"
          >
            {avatar}
          </Avatar>
        }
        title={user}
        subheader={date}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          onClick={() => handleClick(id)}
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
