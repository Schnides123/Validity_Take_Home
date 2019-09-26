import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(0, 3)
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary
	},
	button: {
		margin: theme.spacing(1)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	chips: {
		display: "flex",
		flexWrap: "wrap"
	},
	chip: {
		margin: 2
	},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(column, columnName, theme) {
  return {
    fontWeight:
      columnName.indexOf(column) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Settings = ({columns, currentSettings, handleChange}) => {
	const classes = useStyles();
    const theme = useTheme();
	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<h3>Possible-Match Settings</h3>
				</Grid>
				<Grid item lg={3} sm={6} xs={12}>
					<div className={classes.paper}>
						<Typography>
							Set the maximum edit distance between two columns for a close
							match.
						</Typography>

						<TextField
							fullWidth
							id="max-distance"
							label="Max Edits for Close-Match"
							value={currentSettings.maxDistance}
							onChange={handleChange("max")}
							type="number"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							margin="normal"
						/>
					</div>
				</Grid>
				<Grid item lg={3} sm={6} xs={12}>
					<div className={classes.paper}>
						<Typography>
							Set the minimum matching columns for an row to
							be flagged as a duplicate.
						</Typography>
						<TextField
							fullWidth
							id="min-matches"
							label="Min. Matching Columns"
							value={currentSettings.minMatches}
							onChange={handleChange("min")}
							type="number"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							margin="normal"
						/>
					</div>
				</Grid>
                { columns.length > 0 &&
				<Grid item lg={6} sm={12} xs={12}>
					<Paper className={classes.paper}>
						<Typography>Select columns to ignore when searching for close matches.</Typography>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="select-multiple-chip">Columns</InputLabel>
							<Select
								multiple
								value={currentSettings.ignoreColumns}
								onChange={handleChange("ignore")}
								input={<Input id="select-multiple-chip" />}
								renderValue={selected => (
									<div className={classes.chips}>
										{selected.map(value => (
											<Chip
												key={value}
												label={value}
												className={classes.chip}
											/>
										))}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{columns.map(col => (
									<MenuItem
										key={col}
										value={col}
										style={getStyles(col, currentSettings.ignoreColumns, theme)}
									>
										{col}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Paper>
				</Grid>
                }
			</Grid>
		</div>
	);
};

export default Settings;

/*
<FormControl className={classes.formControl}>
						<InputLabel htmlFor="select-multiple-checkbox">Columns</InputLabel>
						<Select
							multiple
							value={columns}
							onChange={handleChange("ignore")}
							input={<Input id="select-multiple-checkbox" />}
							MenuProps={MenuProps}
						>
							{columns.map(col => (
								<MenuItem key={col} value={col}>
									<Checkbox
										checked={currentSettings.ignoreColumns.indexOf(col) === -1}
									/>
									<ListItemText primary={col} />
								</MenuItem>
							))}
						</Select>
                    </FormControl>
                    */