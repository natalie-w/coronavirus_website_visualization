console.log( "CASES OVER TIME")

var margin = {top: 30, right: 20, bottom: 45, left: 80}
var width = 400;
var height = 400;


// get data
d3.csv("/data/covid_19_data.csv", function(data) {
	// console.log(data);
	// create svg canvas in div
	var svg = d3.select("#over_time")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// parse date time
	var parseDate = d3.timeParse("%m/%d/%Y");

	// set ranges 
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define axes
	var xAxis = d3.axisBottom(x);
	var yAxis = d3.axisLeft(y);

	// define the line
	var valueLine = d3.line()
		.x(function(d) {return x(parseDate(d.key))})
		.y(function(d) {return y(d.value)});

	// format data
	data.forEach(function(d) {
		d.country = d["Country/Region"],
		d.date = parseDate(d.ObservationDate),
		d.cases = +d.Confirmed,
		d.recoveries = +d.Recovered,
		d.fatalities = +d.Deaths,
		d.month = d.date.getMonth() + 1,
		d.day = d.date.getDate()
	});

	//scale range of data
	x.domain(d3.extent(data, function(d){return d.date}));
	y.domain([0, d3.max(data, function(d) {return d.cases;})]);


	// // find unique countries for color mapping
	// var unique_countries = d3.map(data, function(d) {return d.country}).keys();

	// // console.log(unique_countries);

	// // define colors
	// var colors = d3.scaleOrdinal()
	// 	.domain(unique_countries)
	// 	.range(d3.schemeCategory20);

	// nest entries by country
	var countryCount = d3.nest()
		.key(function(d) {return d.country;})
		.key(function(d) {return d.ObservationDate;})
		.rollup(function(v) {return d3.sum(v, function(d) {return d.cases;});})
		.entries(data);

	console.log(countryCount)

	var selectCountries = ["Mainland China", "Hong Kong", "Macau", "Taiwan", "US", "Japan", "Thailand"];
	// loop through each country / key
	countryCount.forEach(function(d) {
		if (selectCountries.includes(d.key)) {
			console.log(valueLine(d.values));
			svg.append("path")
				.attr("class", "line")
				.attr("d", valueLine(d.values))
				// .attr("stroke", function(v) {return colors(v)})
				.style("stroke-width", 1)
		}
		
	})

	// add axes
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + 350 + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,-50)" )
		.call(yAxis);

	// var countryGroups = svg.selectAll(".countryGroups")
	// 	.data(countryCount)
	// 	.enter()
	// 	.append("g")
	// 	.attr("stroke", function(d){return colors(d.key)})

	// var paths = countryGroups.selectAll(".line")
	// 	.data(function(d) {return d.values})
	// 	.enter()
	// 	.append("path");

	// console.log(paths)

	// paths
	// 	.attr("d", function(d) {
	// 		// console.log(d);
	// 		console.log(valueLine(d))
	// 		return valueLine(d)
	// 	})
	// 	.attr("class", "line")


	// svg.append("line")
	//    .attr("x1", 10)
	//    .attr("y1", 10)
	//    .attr("x2", 250) 
	//    .attr("y2", 250)
	//    .style("stroke", "rgb(255,0,0)")
	//    .style("stroke-width", 2);
});
	


	


console.log("hoolo");




