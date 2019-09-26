import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5)
	}
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = event => {
		onChangePage(0);
	};

	const handleBackButtonClick = event => {
		onChangePage(page - 1);
	};

	const handleNextButtonClick = event => {
		onChangePage(page + 1);
	};

	const handleLastPageButtonClick = event => {
		onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles(theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	table: {
		minWidth: 500
	},
	highlighted: {},
	tableWrapper: {
		overflowX: "auto"
    },
    selectedRow: {
        backgroundColor: "#ADD8E6"
    },
	tableCell: {
		minWidth: 100
	}
}));

const CSVTable = ({
	data,
	page,
	rowsPerPage,
	handleChangePage,
    handleChangeRowsPerPage,
    selected
}) => {
    
	const classes = useStyles2();
	if (data === null) return <div></div>;
	const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

	return (
		<Paper className={classes.root}>
			<div className={classes.tableWrapper}>
				<Table className={classes.table} size="small">
					<TableHead>
						<TableRow>
							<TableCell>Index</TableCell>
							{Object.keys(data && data.length > 0 ? data[0] : {}).map(key => (
								<TableCell
									className={classes.tableCell}
									key={"header" + key}
									align="right"
								>
									{key}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => (
								<TableRow
									key={"csvrow" + index}
									{...(selected === page * rowsPerPage + index
										? { className: classes.selectedRow }
										: {})}
								>
									<TableCell>{page * rowsPerPage + index}</TableCell>
									{Object.values(row).map((value, i) => (
										<TableCell
											className={classes.tableCell}
											key={index + i}
											align="right"
										>
											{value}
										</TableCell>
									))}
								</TableRow>
							))}

						{emptyRows > 0 && (
							<TableRow style={{ height: 48 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								colSpan={3}
								count={data.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: { "aria-label": "rows per page" },
									native: true
								}}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</Paper>
	);
};
export default CSVTable;
