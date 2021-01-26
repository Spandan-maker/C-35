var ball, database, position, ballposition;

function setup(){
    createCanvas(500,500);

    ball = createSprite(250,250,20,20);
    ball.shapeColor = "red";

    database = firebase.database();

    ballposition = database.ref('ball/position');

    ballposition.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set(
        {

    'x' : position.x + x,
    'y' : position.y + y
        }
  )
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error");
}