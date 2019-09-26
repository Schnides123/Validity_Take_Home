import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary
	},
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: "none"
	}
}));

const CSVLoader = ({ handleFile, handleSubmit, fileName }) => {
	const classes = useStyles();
		return (
			<Paper className={classes.root}>
				<Grid container spacing={3}>
					{fileName !== null && (
						<Grid item xs={12}>
							<h2>{fileName} is loaded.</h2>
						</Grid>
					)}
					{fileName !== null && (
						<Grid item xs={12}>
							<Button
								onClick={handleSubmit}
								color="primary"
								fullWidth={true}
								className={classes.button}
							>
								Check for duplicates
							</Button>
						</Grid>
					)}
					<Grid item xs={12}>
						<Grid container spacing={2} className={classes.paper}>
							<Grid item xs={12}>
								<Typography>
									{fileName !== null ? "Or," : "To get started,"}
								</Typography>
								<DropzoneArea
									onChange={handleFile}
									acceptedFiles={[".csv"]}
									filesLimit={1}
									dropzoneText={
										fileName
											? "Choose a different CSV file to load."
											: "Choose a CSV file to load."
									}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		);
};

export default CSVLoader;
