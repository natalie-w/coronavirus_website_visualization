// read in data and update current cases, recoveries, fatalities, and days

//Circle Data Set
 var circleData = [
	{ "cx": 10, "cy": 10, "radius": 10, "color" : "green" }
];


d3.csv("/data/covid_19_data.csv", function(data) {
	// console.log(data)

	var cases = 0;
	var recoveries = 0;
	var fatalities = 0;

	// parse date time
	var parseDate = d3.timeParse("%m/%d/%Y");

	// formate date
	var formatDate = d3.timeFormat("%b %d, %Y");

	// format numbers for readability
	var formatNum = d3.format(",");

	// find newest date
	var latest = d3.max(data.map(function(d) {return parseDate(d.ObservationDate)}));

	// format data
	data.forEach(function(d) {
		d.country = d["Country/Region"],
		d.date = parseDate(d.ObservationDate),
		d.cases = +d.Confirmed,
		d.recoveries = +d.Recovered,
		d.fatalities = +d.Deaths

		// only add newest counts for each country
		if ((d.date.getFullYear() == latest.getFullYear()) &&
			(d.date.getMonth() === latest.getMonth()) &&
			(d.date.getDate() == latest.getDate())) {
			
			cases += d.cases
			recoveries += d.recoveries
			fatalities += d.fatalities
		}
		
	});

	// insert cases, recoveries, and fatalities metrics into cards
	var counts = [cases, recoveries, fatalities];
	var classes = ["#total_cases", "#recover", "#fatal"];

	for (var j = 0; j < counts.length; j++) {
		// console.log(counts[j])
		// console.log(classes[j])

		var svg = d3.select(classes[j])
			.append("svg")
			.attr("width", 150)
			.attr("height", 50);

		var text = svg.selectAll("text")
			.data(circleData)
			.enter()
			.append("text");

		var textLabels = text
	     .attr("x", 10)
	     .attr("y", 40)
	     .text(formatNum(counts[j]))
	     .attr("font-family", "nunito")
	     .attr("font-size", "30px")
	     .attr("font-weight", "bold")
	     .attr("fill", "dark-gray");
	}

	// updated on card
	var svg = d3.select("#days")
			.append("svg")
			.attr("width", 150)
			.attr("height", 50);

	var text = svg.selectAll("text")
		.data(circleData)
		.enter()
		.append("text");

	var textLabels = text
		.attr("x", 10)
		.attr("y", 40)
		.text(formatDate(latest))
		.attr("font-family", "nunito")
		.attr("font-size", "22px")
		.attr("font-weight", "bold")
		.attr("fill", "dark-gray");	
});


console.log("PLS WORK OMG")