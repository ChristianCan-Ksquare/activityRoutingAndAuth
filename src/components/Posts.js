import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default function Posts() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const currentPage = useMemo(
    () => new URLSearchParams(location.search).get("page"),
    [location.search]
  );

  const [data, setData] = useState([]);
  const [page, setPage] = useState(currentPage ? Number(currentPage) : 1);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const changePage = (newPage) => {
    if (newPage === 0 || newPage > 10) return;

    history.replace(`${location.pathname}?page=${newPage}`);
    setPage(newPage);
  };

  return (
    <Box>
      <Grid container spacing={2} className={classes.gridContainer}>
        {data.map((element, index) => (
          <Grid key={element.id} item xs={12} sm={6} md={3}>
            <PostCard
              key={element.id}
              id={element.id}
              title={element.title}
              description={element.body}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
        mx={4}
        mb={1}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => changePage(page - 1)}
        >
          Previous page
        </Button>
        <Typography component="h4" variant="h4">
          {page}
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => changePage(page + 1)}
        >
          Next page
        </Button>
      </Box>
    </Box>
  );
}
