//------------
//System Vars
//------------
var stage = document.getElementById("fallCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
var ctx2 = stage.getContext("2d");
ctx.fillStyle = "transparent";
ctx.font = GAME_FONTS;

var diction = ["I", "am", "my", "abandon", "ability", "a", "able", "about","above", "abroad", "absence", "absent",
"absolute","abstract","academic", "acceptance", "accident", "account", "accompany","accurate", "name", "is", "school", "Rutgers", "Tom", "Harry", "friend", "live", "life", "family", "love", "college", "fun","play", "run", "active","admire","achieve"];

var scientists = ["Barbara McClintock", "Marie Curie", "Stephanie Louise Kwolek", "Benjamin Fraklin", "Issac Newton", "Louis Pasteur", "Jane Goodall", "Niels Bohr", "Charles Darwin", "Grace Hopper", "Joseph Priestley", "Dorothy Hodgkin", "Percy Julian", "Chien-Shiung Wu", "Albert Einstein", "Gertrude Elion", "Hypatia of Alexandria", "Jocelyn Bell Burnell", "Hedy Lamarr", "Erwin Schrodinger"];


var select = "";
var rand = 0;

/*
//-----------------
//Browser Detection
//-----------------
navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

var browser;
if (navigator.sayswho[0] == "Firefox")
	browser="f";
else if (navigator.sayswho[0] == "Chrome")
	browser="c";
else if (navigator.sayswho[0] == "Safari")
	browser="s";
else  if (navigator.sayswho[0] == "Microsoft")
	browser="m";
else
	browser="f";
*/

var gameloop, mouseX, mouseY, isClicked, boxArray, score;

//Init values
isClicked = false;
score = 0;

//Setup the Rectangles Array
boxArray = new Array();

gameloop = setInterval(update, TIME_PER_FRAME);		

/*
stage.addEventListener("click", canvasClick, false);

function canvasClick(event)
{	
	if (browser == "f" || browser == "m")
	{
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
	isClicked = true;
}	
*/

//------------
//Game Loop
//------------
function update()
{		
	//Clear Canvas
	ctx.fillStyle = "transparent";
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//Check if we should generate a new Rectangle to drop down
	if (Math.random() < 0.01)
	{
		var newBox = new Object();
		newBox.x = Math.floor(Math.random() * stage.width);
		newBox.y = -10;
        newBox.w = scientists[Math.floor(Math.random() * (20))];
		boxArray.push(newBox);
		//
	}

	//Update the position of the rectangles
	for (var i=boxArray.length - 1; i >= 0; i--)
	{
		boxArray[i].y++;
		if (boxArray[i].y > stage.height)
			boxArray.splice(i, 1);

		else
		{
			drawRect(boxArray[i].x, boxArray[i].y);
			drawWord(boxArray[i].x+5,boxArray[i].y+15,boxArray[i].w);
			
			if (isClicked)
			{
				//Check for collision
				if (hitTestPoint(
					boxArray[i].x, boxArray[i].y, BOX_WIDTH, BOX_HEIGHT, mouseX, mouseY))
				{
					score++;
					boxArray.splice(i, 1);
				}					
			}
		}		
	}
	
	isClicked = false;
	
	//Update Score
	
	ctx.fillStyle = "black";
	ctx.fillText(score, 30, 30);
}

function drawRect(xPos, yPos)
{
	ctx.beginPath();
	ctx.rect(xPos,yPos, BOX_WIDTH, BOX_HEIGHT);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.strokeStyle = 'black';
	ctx.stroke();
}

function selectWord() {
	select = scientists[Math.floor(Math.random() * (37))]; 
	return select;
}

function drawWord(xPos, yPos, word){
    //var width = ctx.measureText(word).width;
    //ctw.strokeRect(xPos,yPos,width,15);
	ctx2.font = "15px Arial";
	ctx2.fillStyle = "white";
	ctx2.fillText(word, xPos, yPos);
}

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
	//x1, y1 = x and y coordinates of object 1
	//w1, h1 = width and height of object 1
	//x2, y2 = x and y coordinates of object 2 (usually midpt)
	if ((x1 <= x2 && x1+w1 >= x2) &&
		(y1 <= y2 && y1+h1 >= y2))
			return true;
	else
		return false;
}