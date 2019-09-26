import * as Papa from "papaparse";

const getDuplicates = (csvdata, settings, callback) => fetch("http://localhost:3001/duplicates", {
	method: "POST",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	},
	body: JSON.stringify({ data: csvdata, ...settings })
})
	.then(response => {
		return response.json();
	})
	.then(data => {
        if(typeof data === "object" && data !== null) callback(data);
	})
	.catch(error => {
		console.log(error);
    });
    
export const parseCSV = (file, callback) => {
	Papa.parse(new Blob(file), {
		header: true,
		complete: function(results) {
			callback(results.data);
		}
	});
};

export default getDuplicates;