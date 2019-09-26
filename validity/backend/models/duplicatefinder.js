const levenshtein = require("js-levenshtein");

class DuplicateFinder {
	constructor(data) {
        if (typeof data !== 'object' || !Array.isArray(data) || typeof (data[0] || {}) !== 'object' || data[0] === null) return;
        this.data = data;
		this.keys = Object.keys(data[0] || {});
	}
	/**
	 * checks if data is formatted correctly.
     * 
	 * @return boolean
	 */
	validate() {
		if (this.data === undefined) return false;
		for (let row of this.data) {
			if (typeof row !== 'object' || row === null) return false;
			for (let key of this.keys) {
				if (!(key in row)) return false;
			}
		}
		return true;
	}
	/**
	 * Checks for exact and possible duplicates, then returns the results of each in an object.
	 *
	 * @param {number} minMatches passthrough for possibleDuplicates()
	 * @param {number} maxDistance passthrough for possibleDuplicates()
	 * @param {string[]} ignoreColumns passthrough for possibleDuplicates(), does not affect exactDuplicates.
     * 
     * @return object
	 */
	checkDuplicates(minMatches, maxDistance, ignoreColumns = []) {
		const exact = this.exactDuplicates();
		let possible = this.possibleDuplicates(
			minMatches,
			maxDistance,
			ignoreColumns
		);
		return { exact: exact, possible: possible };
	}
	/**
	 * quick-and-dirty check for exact duplicates.
     * 
	 * @return array
	 */
	exactDuplicates() {
		const lookup = {};
		const duplicates = [];
		this.data.forEach((row, index) => {
			const key = generateKey(row);
			if (key in lookup) {
				// I really didn't need to include the row here, but I think it'll be nice to do so, since we'll just return this directly into props on the frontend. It is redundant though, and it will add to the size of the json object we're returning in our API call.
				duplicates.push({ index: index, previous: lookup[key], ...row });
			} else lookup[key] = index;
		});
		return duplicates;
	}

	/**
	 * Check for close matches using levenshtein distance.
	 *
	 * @param {number} minMatches integer for how many close matches we need to flag something as a possible duplicate.
	 * @param {number} maxDistance integer for what distance we consider to be a "close match".
	 * @param {string[]} ignoreColumns (optional) array of keys to ignore when calculating distances.
	 *
	 * @return array
	 */
	possibleDuplicates(minMatches=1, maxDistance=2, ignoreColumns = []) {
		const duplicates = [];
		//lets use our existing function to make a quick lookup table
		const exacts = this.exactDuplicates()
			.map(row => {
				const out = {};
				out[row.index] = row.previous;
				return out;
			})
			.reduce((p, v) => ({ ...p, ...v }), {});
		for (let i = 0; i < this.data.length; i++) {
			if ("" + i in exacts) continue;
			for (let j = 0; j < i; j++) {
				if ("" + j in exacts) continue;
				const rowA = this.data[j];
				const rowB = this.data[i];
				const distances = {};
				let matches = 0;
				// no need to duplicate our duplicates.
				if (generateKey(rowA) === generateKey(rowB)) continue;
				for (let key of this.keys) {
					if (ignoreColumns.indexOf(key) > -1) continue;
					if ((rowA[key] || "") === (rowB[key] || "")) {
						distances[key] = 0;
					} else
						distances[key] = levenshtein(
							"" + (rowA[key] || ""),
							"" + (rowB[key] || "")
						);
				}
				for (let value of Object.values(distances)) {
					if (value <= maxDistance) {
						matches++;
					}
				}
				if (matches >= minMatches) {
					duplicates.push({ index: i, previous: j, ...rowB });
				}
			}
		}
		return duplicates;
	}
}

/**
 * Creates a simple key string from a row of our data. We'll use this to quickly check for exact matches.
 *
 * @param {Object} row row of data being turned into key
 * 
 * @return string
 */
const generateKey = row => Object.values(row).map(v => "/" + v).reduce((p, v) => p + v);

module.exports = DuplicateFinder;