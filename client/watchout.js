// start slingin' some d3 here.

d3.select('body').select('div')
	.selectAll('div')
	.data([5,5,10])
	.enter().append('div')
	.style({'color' : 'blue' , 'font-size' : '250%'})
	.text("testing");

d3.select('body')
	.append("svg")
	.attr("width",400)
	.attr("height" ,200)
	.style("border", "10px solid black");

d3.select('svg').selectAll("image").data([{x : 50 , y : 50},{x : 100 , y : 100}])
	.enter()
	.append("svg:image")
	.attr("xlink:href", "asteroid.png")
	.attr("x", function(d){ return d.x.toString()+"px";})
	.attr("y", function(d){ return d.y.toString() + "px";})
	.attr("width", "60px")
	.attr("height", "60px");


//d3.select("image").