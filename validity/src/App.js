import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";

class App extends Component {

  state = {
    data: [
			{ a: "asdf", b: "asdf" },
			{ a: "asdf", b: "asdf" },
			{ a: "asdd"}
		]
  };

  handleClick = () => {
    fetch("http://localhost:3001/duplicates", {
			method: "POST",
			headers: {
				Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(this.state.data)
		})
			.then(response => {
				return response.json();
      })
      .then(data => {
        console.log(data);
      })
			.catch(error => {
				console.log(error);
			});
  }

  render = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={this.handleClick}>Test</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
