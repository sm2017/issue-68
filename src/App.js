import React, {Component} from "react";
import FlightsPage from "./flights/FlightsPage";
import FlightData from "./flights/FlightData";
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const store = createStore((state = FlightData, action) => {
  return state
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FlightsPage/>
      </Provider>
    )
  }
}