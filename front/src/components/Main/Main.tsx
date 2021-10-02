import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Main = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6}>
        <h1>Your Story Starts With Us.</h1>
        <h4>
          Every landing page needs a small description after the big bold
          title, that{"'"}s why we added this text here. Add here all the
          information that can make you or your product create the first
          impression.
        </h4>
        <br/>
        <Button>
          <i className="fas fa-play"/>
          Watch video
        </Button>
      </Grid>
    </Grid>
  );
}

export default Main;

