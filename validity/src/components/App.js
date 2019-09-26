import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import getDuplicates, { parseCSV } from "../utils/services.js";
import CSVLoader from "./csvloader.js";
import Settings from "./settings.js";
import "./App.css";
import DuplicatesContainer from "./duplicatescontainer.js";
import CSVTable from "./csvtable.js";
import Button from "@material-ui/core/Button";

class App extends Component {
	state = {
		csvData: null,
		fileName: null,
		colNames: [],
		settings: {
			minMatches: 5,
			maxDistance: 3,
			ignoreColumns: []
		},
		exact: null,
		possible: null,
		csvPage: 0,
		csvRowsPerPage: 10,
		csvSelected: -1
	};

	handleJSON = data =>
		this.setState({
			exact: data.exact || null,
			possible: data.possible || null
		});

	handleFile = file => {
		this.setState({ filename: file[0].name });
		parseCSV(file, data =>
			this.setState({
				csvData: data || null,
				colNames: Object.keys(data ? data[0] : {})
			})
		);
	};

	handleTableClick = index => () =>
		this.setState({
			csvPage: Math.floor(index / this.state.csvRowsPerPage),
			csvSelected: index
		});

	handlePage = newPage => this.setState({ csvPage: newPage });

	handleChangeRowsPerPage = event =>
		this.setState({
			csvRowsPerPage: parseInt(event.target.value, 10),
			csvPage: 0
		});

	handleSettings = type => {
		switch (type) {
			case "min":
				return event => {
					this.setState({
						settings: {
							...this.state.settings,
							minMatches:
								event.target.value !== "" ? parseInt(event.target.value, 10) : 0
						}
					});
					console.log(this.state.settings);
				};
			case "max":
				return event => {
					this.setState({
						settings: {
							...this.state.settings,
							maxDistance:
								event.target.value !== "" ? parseInt(event.target.value, 10) : 0
						}
					});
					console.log(this.state.settings);
				};
			case "ignore":
				return event => {
					const options = event.target.value;
					console.log(options);
					this.setState({
						settings: {
							...this.state.settings,
							ignoreColumns:
								event.target.value || this.state.settings.ignoreColumns
						}
					});
					console.log(this.state.settings);
				};
			default:
				return () => {};
		}
	};

	handleSubmit = () => {
		getDuplicates(this.state.csvData, this.state.settings, this.handleJSON);
	};

	reset = () => this.setState({ exact: null, possible: null, csvSelected: -1 });

	render = () => {
		return (
			<div className="App">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<h1>CSV Duplicate Finder</h1>
					</Grid>
					<Grid item sm={6}>
						{this.state.exact === null ? (
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<CSVLoader
										handleFile={this.handleFile}
										handleSubmit={this.handleSubmit}
										fileName={this.state.filename || null}
									></CSVLoader>
								</Grid>
								<Grid item xs={12}>
									<Settings
										columns={this.state.colNames}
										currentSettings={this.state.settings}
										handleChange={this.handleSettings}
									></Settings>
								</Grid>
							</Grid>
						) : (
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Button fullWidth onClick={this.reset}>
										Reset
									</Button>
								</Grid>
								<Grid item xs={12}>
									<DuplicatesContainer
										exact={this.state.exact}
										possible={this.state.possible}
										handleClick={this.handleTableClick}
									/>
								</Grid>
							</Grid>
						)}
					</Grid>
					{this.state.csvData !== null && (
						<Grid item sm={6}>
							<CSVTable
								data={this.state.csvData}
								page={this.state.csvPage}
								rowsPerPage={this.state.csvRowsPerPage}
								handleChangePage={this.handlePage}
								handleChangeRowsPerPage={this.handleChangeRowsPerPage}
								selected={this.state.csvSelected}
							/>
						</Grid>
					)}
				</Grid>
			</div>
		);
	};
}

export default App;
