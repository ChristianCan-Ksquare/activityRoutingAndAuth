import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useHistory, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

function PostCard() {
  const { id } = useParams();
  let history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return id > 100 ? (
    <Redirect to="/error_404" />
  ) : (
    <Box m={4} textAlign="center">
      <Typography gutterBottom variant="h6" component="h2">
        {`Post #${data.id}`}
      </Typography>
      <Typography gutterBottom variant="h4" component="h2">
        {data.title}
      </Typography>
      <Typography variant="body2" color="textPrimary" component="p">
        {data.body}
      </Typography>
      <Box display="flex" justifyContent="center" my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Return
        </Button>
      </Box>
    </Box>
  );
}

export default PostCard;
