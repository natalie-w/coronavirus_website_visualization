// read in data and update current cases, recoveries, fatalities, and days

//Circle Data Set
 var circleData = [
	{ "cx": 10, "cy": 10, "radius": 10, "color" : "green" }
];


d3.csv("/data/covid_19_data.csv", function(data) {
	console.log(data)

	var cases = 0;
	var recoveries = 0;
	var fatalities = 0;

	// parse date time
	var parseDate = d3.timeParse("%m/%d/%Y");

	// format numbers for readability
	var formatNum = d3.format(",");

	// format data
	data.forEach(function(d) {
		d.country = d["Country/Region"],
		d.date = parseDate(d.ObservationDate),
		d.cases = +d.Confirmed,
		d.recoveries = +d.Recovered,
		d.fatalities = +d.Deaths

		cases += d.cases
		recoveries += d.recoveries
		fatalities += d.fatalities
	});

	var counts = [cases, recoveries, fatalities];
	var classes = ["#total_cases", "#recover", "#fatal"];

	for (var j = 0; j < counts.length; j++) {
		console.log(counts[j])
		console.log(classes[j])

		var svg = d3.select(classes[j])
			.append("svg")
			.attr("width", 150)
			.attr("height", 60);

		var text = svg.selectAll("text")
			.data(circleData)
			.enter()
			.append("text");

		var textLabels = text
	     .attr("x", 0)
	     .attr("y", 50)
	     .text(formatNum(counts[j]))
	     .attr("font-family", "nunito")
	     .attr("font-size", "30px")
	     .attr("font-weight", "bold")
	     .attr("fill", "dark-gray");
	}

	
});





console.log("PLS WORK OMG")