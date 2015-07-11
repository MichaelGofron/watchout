// start slingin' some d3 here.


var svgWidth = 600;
var svgHeight = 400;
var enemies = [];
var numEnemies = 30;
var playerObj = [{x:100, y:100}];
var scoreBoardArray = [0,0,0];

for(var i  = 0 ; i < numEnemies ; i ++){
	var obj = {x:svgWidth/2 , y:svgHeight/2};
	enemies.push(obj);
}
d3.select('body').select('div')
	.selectAll('div')
	.data([5,5,10])
	.enter().append('div')
	.style({'color' : 'blue' , 'font-size' : '250%'})
	.text("testing");

var svg = d3.select('body')
	.append("svg")
	.attr("width", svgWidth)
	.attr("height" ,svgHeight)
	.style("border", "10px solid black");

var images = d3.select('svg').selectAll("image").data(enemies)
	.enter()
	.append("svg:image")
	.attr("xlink:href", "asteroid.png")
	.attr("x", function(d){ return d.x.toString()+"px";})
	.attr("y", function(d){ return d.y.toString() + "px";})
	.attr("width", "20px")
	.attr("height", "20px");

var moveEnemies = function(){
	for(var i = 0 ; i < enemies.length ; i++){
		enemies[i].x = Math.random()*svgWidth;
		enemies[i].y = Math.random()*svgHeight;
	}
	images.data(enemies)
		.transition().duration(1500)
		.attr("x", function(d){ return d.x.toString()+"px";})
		.attr("y", function(d){ return d.y.toString() + "px";});

}

var player = d3.select("svg").selectAll(".spaceship").data(playerObj)
	.enter()
	.append("svg:image")
	.attr("xlink:href","alienblaster.png")
	.attr("class", "spaceship")
	.attr("x", function(d){return d.x + "px";})
	.attr("y", function(d){return d.y + "px";})
	.attr("width", "40px")
	.attr("height", "40px");

var stopTime = function(){
	moveEnemies();
	setTimeout(stopTime,1000);
}

var dragmove = function(d){
	playerObj[0].x = d3.event.x;
	playerObj[0].y = d3.event.y;
	d3.select(this)
		.attr("y", d3.event.y)
		.attr("x", d3.event.x);
}

var drag = d3.behavior.drag()
	.on("drag",dragmove);

svg.select(".spaceship")
		.call(drag);

var count = 0;
var checkForCollision = function(){
	count++;
	increaseScore(collision());
	if(count%25===0){
	moveEnemies();
	}
	setTimeout(checkForCollision, 40);
};
var collision = function(){
	//console.log(images[0][0].x.animVal.value);
	var imageEnemies = [images[0][0], images[0][1]];
	//console.log(imageEnemies);
	for (var i = 0; i < enemies.length ; i++){
		var xOffset = (images[0][i].x.animVal.value) - (playerObj[0].x);
		var yOffset = (images[0][i].y.animVal.value) - (playerObj[0].y);
		if(Math.sqrt(Math.pow(xOffset,2) + Math.pow(yOffset,2)) < 45){
//			console.log("collision");
			return true;
		}
	}
	return false;
};

var increaseScore = function(wasCollision){
	if (wasCollision){
		if(scoreBoardArray[0]<scoreBoardArray[1]){
			scoreBoardArray[0]=scoreBoardArray[1];
		}
		scoreBoardArray[2]++;
		scoreBoardArray[1] = 0;
	}else{
		scoreBoardArray[1]++;
	}

	d3.select('.high').select('span').data([scoreBoardArray[0]]).text(function(d) {return d});
	d3.select('.current').select('span').data([scoreBoardArray[1]]).text(function(d) {return d});
	d3.select('.collisions').select('span').data([scoreBoardArray[2]]).text(function(d) {return d});

}
checkForCollision();
// stopTime();


