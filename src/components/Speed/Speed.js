import React from 'react';
import './Speed.css';

export default class Speed extends React.Component {
  render() {
    return (
      <div className="newSpeedRecord">
        <form className="form">
          <h2>New Speed Record</h2>
          <p>Store your speed scores here :)</p>
          <label>Event: 
            <select name="event">
              <option value="" disabled selected>Select your event</option>
              <option value="1x30sec Running Step">1x30sec Running Step</option>
              <option value="30 seconds DU">30 seconds Double Unders</option>
            </select>
          </label>
          <label>
            Score:
            <input type="number" name="score" placeholder="Enter your speed score"></input>
          </label>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}