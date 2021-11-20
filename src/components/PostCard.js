import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: "100%",
  },
  link: {
    textAlign: "right",
  },
});

function PostCard(props) {
  const classes = useStyles();
  const { id, title, description } = props;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {description}
        </Typography>
        <Box className={classes.link}>
          <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
            Read
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;
