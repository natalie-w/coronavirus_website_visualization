console.log( "CASES OVER TIME")


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

	console.log(data);
	// update metrics
	// var cases = d3.select("#cases")
	// 	.attr("text", "helo")

	var svg = d3.select("#over_time")
	.append("svg")
	.attr("width", 100)
	.attr("height", 200);

	svg.append("line")
	   .attr("x1", 10)
	   .attr("y1", 10)
	   .attr("x2", 250) 
	   .attr("y2", 250)
	   .style("stroke", "rgb(255,0,0)")
	   .style("stroke-width", 2);
});
	


	


console.log("hoolo");




