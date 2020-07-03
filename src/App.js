import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Graph from './Graph';
import Controls from './Controls';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    width: '100%',
  },
  box: {
    padding: theme.spacing(2),
  }
}));

const App = () => {
  const styles = useStyles();
  const [graph, setGraph] = useState();

  const handleMine = (params) => {
    console.log(params);
    setGraph(null);
    fetch('http://localhost:4567/mine', { method: 'POST', body: JSON.stringify(params) })
      .then(r => r.json())
      .then(setGraph)
  };
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Fuzzy Miner
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} className={styles.container}>
        <Grid item xs={9}>
          <Paper className={styles.box}>
            <Graph graph={graph} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={styles.box}>
            <Controls onMine={handleMine} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
