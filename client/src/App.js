import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Chart from "./components/Chart";
import VisualizationsList from "./components/VisualizationsList";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid
          container
          justify={"center"}
          spacing={40}
          alignContent={"space-between"}
        >
          <VisualizationsList />
          <Chart />
        </Grid>
      </div>
    );
  }
}

export default App;
