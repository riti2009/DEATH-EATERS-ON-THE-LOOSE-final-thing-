var slytherin, draco
var death1, kill1
var death2, kill2
var death3, kill3
var death4, kill4
var death5, kill5
var death6, kill6
var death7, kill7
var death8, kill8
var death9, kill9
var death10, kill10
var death11, kill11
var bgimg
var gamestate = 'intro'
var edges
var degroup;
var greenspell;
var score = 0;
var redspell;
var redgroup, greengroup;
var antihero;

function preload(){

    slytherin = loadImage('draco.png');

    death1 = loadImage('1.png');
    death2 = loadImage('2.png');
    death3 = loadImage('3.png');
    death4 = loadImage('4.png');
    death5 = loadImage('5.png');
    death6 = loadImage('6.png');
    death7 = loadImage('7.png');
    death8 = loadImage('8.png');
    death9 = loadImage('9.png');
    death10 = loadImage('10.png');
    death11 = loadImage('11.png');

    bgimg = loadImage('malfoy.webp');

    greenspell = loadImage('greenlight.png');
    redspell = loadImage('redlight.png');

    antihero = loadSound('antihero.mp3');

}

function setup(){

    createCanvas(1200, 600);
    edges = createEdgeSprites();

    draco = createSprite(600, 540);
    draco.addImage(slytherin);
    draco.scale = 0.3
     
    degroup = new Group()
    redgroup = new Group()
    greengroup = new Group()

    antihero.play()

}

function draw(){

    background(bgimg);
    if (gamestate == 'intro'){

       textSize(30);
       fill('white');
       text('Death Eaters On The Loose', 400, 50);
       textSize(20);
       text('Try to hit death eaters with the green spells', 400, 100);
       text('to kill, but try not to get hit yourself.', 400, 125);
       text('If you get hit with a red one, u lose points.', 400, 150);
       text('You will have limited green spells, so choose wisely', 400, 175);
       text('when to use.', 400, 200);
       text('Press right and left arrow keys to move.', 400, 225);
       text('Up for red, down for green spells', 400, 250);
       textSize(30);
       text('Press the space bar to continue...', 400, 300);
       
       if (keyDown('space')){

        gamestate = 'play';
        clear()



       }

    }
    
    if (gamestate == 'play'){
    
       fill('white');
       textSize(20)
       text('Score: '+score, width-150, 50);
       
       if (score>=100){
        gamestate = 'end'
        
       }

       


       for (i = 0; i<degroup.length; i++){
        var de = degroup.get(i);
        if (de.y >= 300){
            de.velocityY = 0;
        
     
        }

        if (frameCount%150==0){
            var green = createSprite(de.x, de.y+10);
        green.addImage(greenspell);
        green.scale = 0.2;
        green.velocityY = +8;
        greengroup.add(green);
    
        }

        if (redgroup.isTouching(de)){
            de.destroy()
            score += 10;

        }


       }
    
       for (i = 0; i<greengroup.length; i++){
        var greendeath = greengroup.get(i);
        if (greendeath.isTouching(draco)){
            greendeath.destroy()
            score -= 30;
        }
       }

       if (keyIsDown(37)){
        draco.x -= 10;
       }
       
       if (keyIsDown(39)){
        draco.x += 10;
       }

    if (keyWentDown(38)){
        var red = createSprite(draco.x, draco.y-10);
        red.addImage(redspell);
        red.scale = 0.2;
        red.velocityY = -8;
    
        redgroup.add(red);
    }

       draco.collide(edges);
       spawnDeath()
       drawSprites()
    }

    else if (gamestate == 'end'){
      textSize(70)
      fill('white')
      text('GAME OVER', 370, 250)
      textSize(40)
      text('You scored 100!', 420, 300)

      //if (antihero.isPlaying()){
        //antihero.stop()
    //}
    }







}




function spawnDeath(){
    if (frameCount % 50 == 0){
       var kill1 = createSprite(random(100, width-100), -20);
       var ran = Math.round(random(1, 11));
       switch(ran){
        case 1: kill1.addImage(death1);break;
        case 2: kill1.addImage(death2);break;
        case 3: kill1.addImage(death3);break;
        case 4: kill1.addImage(death4);break;
        case 5: kill1.addImage(death5);break;
        case 6: kill1.addImage(death6);break;
        case 7: kill1.addImage(death7);break;
        case 8: kill1.addImage(death8);break;
        case 9: kill1.addImage(death9);break;
        case 10: kill1.addImage(death10);break;
        case 11: kill1.addImage(death11);break;
       }

      kill1.velocityY = 4;

      kill1.setCollider('rectangle', 0, 0, 60, 100);

      kill1.lifetime = 150

      
      degroup.add(kill1);

    }
}
