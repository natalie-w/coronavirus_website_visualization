
console.log( "GOV RESPONSES")


// parse date time
var parseDate = d3.timeParse("%b %d, %Y")

// set ranges 
// var x = d3.time.scale().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);


// get data
d3.csv("/data/COVID 19 Containment measures data.csv", function(data) {

	// for (var i = 0; i < data.length; i++) {
	// 	console.log(data[i].Country);
	// 	console.log(data[i].Keywords);
	// }

	// format data
	data.forEach(function(d) {
		d.country = d.Country,
		d.keywords = d.Keywords,
		d.start_date = parseDate(d["Date Start"]),
		d.description = d["Description of measure implemented"],
		d.target_country = d["Target country"],
		d.target_state = d["Target state"]
	});

	// console.log(data);
	// update metrics
	// var cases = d3.select("#cases")
	// 	.attr("text", "helo")

	// function to generate table
	function tabulate(data, columns) {
		var table = d3.select("#gov").append("table")
			.style("border-collapse", "collapse")
			.style("border", "2px black solid"),
		thead = table.append("thead")
		tbody = table.append("tbody");

		// append header
		thead.append("tr")
			.selectAll("th")
			.data(columns)
			.enter()
			.append("th")
			.text(function(column) {
				return column;
			});

		// create rows
		var rows = tbody.selectAll("tr")
	        .data(data)
	        .enter()
	        .append("tr");

	    // create cells for each column
	    var cells = rows.selectAll("td")
	        .data(function(row) {
	            return columns.map(function(column) {
	                return {column: column, value: row[column]};
	            });
	        })
	        .enter()
	        .append("td")
	        .attr("style", "font-family: Courier") // sets the font style
	            .html(function(d) { return d.value; });
	    
	    return table;
	}

	// render table
	var govTable = tabulate(data, ["country","start_date", "keywords", "description"])

	console.log("hmmm")
});
	


	


console.log("one day this will work");