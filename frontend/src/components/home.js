import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'; 
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import logo from '../assets/splitwiseLogo.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // marginLeft: 280,
     marginTop: 100
  },
  media: {
    height: 300,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Splitwise
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
