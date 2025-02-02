// Original P5:
//https://editor.p5js.org/ShellyXuan/sketches/kIwwsXAiW

//reference:
//Leaves shape:
//https://editor.p5js.org/Zoe/sketches/SkBQYKdVW
//Amazing ripple:
//https://editor.p5js.org/codingtrain/sketches/tYXtzNSl
let bg;
// let beat;
let ripples;
let wind;
let things = [];
let bird;
let bi;
let loopingSounds=[]
let clickSounds=[]
let board;
let boardactive=true
let soundPlay=[]
let soundIsPlaying=[]
let theRefreshButton=document.getElementById("refreshButton")
// if(theRefreshButton){
//   theRefreshButton.addEventListener("click",refreshCanvas)
// }
theRefreshButton.addEventListener("click",refreshCanvas)


function preload() {
  // beat = loadSound("assets/005Bubbles.mp3");
  loopingSounds[0]=loadSound("assets/00fairy-start.wav");
  loopingSounds[1] = loadSound("assets/01rain.mp3");
  loopingSounds[2] = loadSound("assets/02Ambience_Wind Chimes_B.wav");
  loopingSounds[3] = loadSound("assets/03wind.mp3");
  loopingSounds[4] = loadSound("assets/04bird-whistling-a.wav");
  loopingSounds[5] = loadSound("assets/05river-side-klankbeeld.wav");
  loopingSounds[6] = loadSound("assets/06insects.mp3");

  // clickSounds[0]=loadSound("assets/")
  clickSounds[1]=loadSound("assets/001drops.mp3")
  clickSounds[2]=loadSound("assets/002magic.flac")
  clickSounds[3]=loadSound("assets/003leaves.wav")
  clickSounds[4]=loadSound("assets/004whist.wav")
  clickSounds[5]=loadSound("assets/005Bubbles.mp3")
  clickSounds[6]=loadSound("assets/006frog.wav")

  //default soundPlay
  for(let i=0;i<7;i++){
    soundPlay[i]=false
    soundIsPlaying[i]=false
  }

  bg = loadImage("assets/Jungle.jpg");
  bi=loadImage("assets/bird.gif")
  board=loadImage("assets/direction_board.png")
}

function setup() {
  let cnv=createCanvas(480, 420);
  cnv.parent("canvasContainer")
  wind = new Wind();
  ripples=new Ripple()
  bird = new Bird();
  loopingSounds[2].setVolume(0.1)
  loopingSounds[0].setVolume(0.3)
  loopingSounds[1].setVolume(0.7)
  clickSounds[2].setVolume(0.4)
  clickSounds[4].setVolume(0.5)
  clickSounds[6].setVolume(0.5)

  // things[0] = new Thing(width / 10, (height / 10) * 9);
}

function draw() {
  background(220);
  tint(80, 100, 100, 150);
  background(bg, 20);
  //direction-board
  if(things.length>=3){
    boardactive=false
  }else{
    boardactive=true
  }
  if(boardactive==true){
    tint(255,240)
  }else{
    tint(100,100)
  }
  image(board, 10,height/3*2.1,width/5,height/3.5)

  push();
  textSize(21);
  text("CLICK",20,height/3*2.35);
  pop();

  // push()
  // noFill()
  // rect(16,305,70,34)
  // pop()

  //structure
  // stroke(200,250,200,50)
  // line(width / 3, 0, 0, (height / 3) * 2);
  // line(width / 3, 0, width, (height / 3) * 2);
  // line(width / 3, height, width, (height / 3) * 2);
  // line(width, (height / 3) * 2, 0, (height / 3) * 2);
  // line(width / 6, height / 3, (width / 3) * 2, height / 3);
  // line(width / 4, (height / 3) * 2, width / 4, height);



  //structure!!!
  let h = height;
  let w = width;
  let x = (mouseX / w) * 3;
  let y = (mouseY / h) * 3;

  if (2 * x + y - 2 <= 0 &&x>0 && y>0) {
    //左上-1
    fill(100, 250, 250);
  }else if (2 * x + y - 2 > 0 && x - y - 1 <= 0 && y <= 1) {
    //中上-2
    fill(250, 100, 100);
  } else if (x - y - 1 >= 0&&x<3 && y>0) {
    //右上-3
    fill(250, 250, 250);
  }  else if (2 * x + y - 2 > 0 && x - y - 1 < 0 && y < 2 && y > 1) {
    //中中-4
    fill(200, 250, 250);
  }else if (0.5 * x + y - 3.5 <= 0 && y >= 2 && x > 0.75 && y<3) {
    //中下-5
    fill(100, 100, 250);
  } else if (0.5 * x + y - 3.5 > 0&& y<3 && x<3) {
    //右下-6
    fill(250, 100, 250);
  } else{
    //左下--0
    fill(0)
  }

  // circle(mouseX, mouseY, 10);

  //display
  for (let i = 0; i < things.length; i++) {
    things[i].display();
    things[i].update()
  }

  //judge play
  for(let i=0;i<things.length;i++){
    things[i].checkArea()
  }

  //soundplay
  for (let i = 0; i < 7; i++) {
    if(soundIsPlaying[i]==false && soundPlay[i]==true){
      loopingSounds[i].loop()
      soundIsPlaying[i]=soundPlay[i]
    }else if(soundIsPlaying[i]==true && soundPlay[i]==false){
      loopingSounds[i].stop()
      soundIsPlaying[i]=soundPlay[i]
    }
  }
  //default soundplay
  for(let i=0;i<7;i++){
    soundPlay[i]=false
  }


}

function mousePressed() {

  let h = height;
  let w = width;
  let x = (mouseX / w) * 3;
  let y = (mouseY / h) * 3;

  if (2 * x + y - 2 <= 0) {
    //左上-1
    clickSounds[1].play()
  }else if (2 * x + y - 2 > 0 && x - y - 1 <= 0 && y <= 1) {
    //中上-2
    clickSounds[2].play()
  } else if (x - y - 1 >= 0) {
    //右上-3
    clickSounds[3].play()
  }  else if (2 * x + y - 2 > 0 && x - y - 1 < 0 && y < 2 && y > 1) {
    //中中-4
    clickSounds[4].play()
  }else if (0.5 * x + y - 3.5 <= 0 && y >= 2 && x > 0.75) {
    //中下-5
    clickSounds[5].play()
  } else if (0.5 * x + y - 3.5 > 0 && x<3 && y<3) {
    //右下-6
    clickSounds[6].play()
  } else{
    // clickSounds[0].play()
  }

//Problem of push
  // rect(16,305,70,34)
  if (boardactive==true){
    if(mouseX> 16 && mouseX <86 && mouseY>305 && mouseY<339){
      let f=new Thing(random(10,width / 5), random((height / 4)*3,height-10))
      things.push(f)
      loopingSounds[0].play()
    }
  }

  for (let i = 0; i < things.length; i++) {
    things[i].checkMove()
  }

}
// function mouseDragged() {
//   for (let i = 0; i < things.length; i++) {
//     things[i].update();
//   }

// }

class Thing {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.thingmove=false
  }

  display() {
    push();
    translate(this.x, this.y);

    // if (this.y > (height / 3) * 2) {
    //   circle(0, 0, 50);
    // } else {
    //   wind.display();
    //   wind.move();
    // }

    //structure!!!
    let h = height;
    let w = width;
    let x = (this.x / w) * 3;
    let y = (this.y / h) * 3;

    if (2 * x + y - 2 <= 0) {
      //左上--wind
      wind.display();
      wind.move()
    } else if (x - y - 1 >= 0) {
      //右上
      wind.display();
      wind.move();
    } else if (0.5 * x + y - 3.5 <= 0 && y >= 2 && x > 0.75) {
      //中下--water
      ripples.display();
      ripples.move();
    } else if (x <= 1 && y > 2) {
      circle(0, 0, 30);
    } else if (0.5 * x + y - 3.5 > 0) {
      //右下--
      bird.display();
      bird.move();   
    } else if (2 * x + y - 2 > 0 && x - y - 1 <= 0 && y <= 1) {
      //中上
      fill(250, 100, 100);
      ripples.display();
      ripples.move();
    } else if (2 * x + y - 2 > 0 && x - y - 1 < 0 && y < 2 && y > 1) {
      //中中
      bird.display();
      bird.move();    
    }
    pop();
  }
  update() {
    if(this.thingmove){
      this.x = mouseX;
      this.y = mouseY;
    }

  } 

  checkMove(){
   //drag the wind
   let dis = dist(mouseX, mouseY, this.x, this.y);
   if (dis < 20) {
    this.thingmove=!this.thingmove
   }
  }
  checkArea(){
    
    let h = height;
    let w = width;
    let x = (this.x / w) * 3;
    let y = (this.y / h) * 3;

    if (2 * x + y - 2 <= 0 &&x>0 && y>0) {
      //左上-1
      soundPlay[1]=true
    }else if (2 * x + y - 2 > 0 && x - y - 1 <= 0 && y <= 1) {
      //中上-2
      soundPlay[2]=true
    } else if (x - y - 1 >= 0&&x<3 && y>0) {
      //右上-3
      soundPlay[3]=true
    }  else if (2 * x + y - 2 > 0 && x - y - 1 < 0 && y < 2 && y > 1) {
      //中中-4
      soundPlay[4]=true
    }else if (0.5 * x + y - 3.5 <= 0 && y >= 2 && x > 0.75 && y<3) {
      //中下-5
      soundPlay[5]=true
    } else if (0.5 * x + y - 3.5 > 0&& y<3 && x<3) {
      //右下-6
      soundPlay[6]=true
    } else{
      //左下--0
      // soundPlay[0]=true
    }
  }
  
}

function refreshCanvas(){
  // let t=things.length
  // for(let i=0;i<t;i++){
  //     let index = 0;
  //     things.splice(index, 1);
  // }
  things=[]
  console.log(theRefreshButton)
  // redraw()
}



class Bird {
  constructor() {
    this.speed = 2;
    this.deg=0
  }

  display() {
    push();
    let ra=radians(this.deg)
    tint(255,240)
    image(bi,-60+sin(ra)*20,-40+cos(ra)*20,120,70)
    pop();
  }

  move() {
 
    this.deg+=this.speed

  }
}

class Ripple {
  constructor() {
    // this.lx = [];
    // this.ly = [];
    this.speed = 0.5;
    this.blue = [];
    this.rad = [];
    this.weight=[]
    this.width=10
    
    for(let i=0;i<4;i++){
      this.rad[i]=10*i
      this.weight[i]=abs((i+1)/2)
    }
   
  }

  display() {
    push();
    noFill();
    // circle(0, 0, 60);
    //leaves
    for (let i = 0; i < 4; i++) {
      push();
      stroke(255)
      strokeWeight(this.weight[i])
      circle(0,0,this.rad[i])
//       translate(this.lx[i], this.ly[i]);
      
      
      pop();
    }
    pop();
  }

  move() {
    //water visualization
    for (let i = 0; i < 4; i++) {
     this.rad[i]+=this.speed
      this.weight[i]=abs(i-this.weight[i])
      if(this.rad[i]>90){
        this.rad[i]=0
        this.speed-=0.1
      if(this.speed<=0.2){
      this.speed=0.5
      }
      }
    }

  }
}

class Wind {
  constructor() {
    this.lx = [];
    this.ly = [];
    this.speed = [];
    this.green = [];
    this.deg = [];

    //defalt leaves' positions
    for (let i = 0; i < 2; i++) {
      this.lx[i] = random(16, 45);
      this.ly[i] = random(-20, 20);
      this.speed[i] = random(0.6);
      this.green[i] = random(235, 255);
      this.deg[i] = random(0.1, 2);
    }
    for (let i = 2; i < 4; i++) {
      this.lx[i] = random(-45, -16);
      this.ly[i] = random(-20, 20);
      this.speed[i] = random(0.6);
      this.green[i] = random(220, 255);
      this.deg[i] = random(0.1, 2);
    }
  }

  display() {
    push();
    noFill();
    // circle(0, 0, 60);
    //leaves
    for (let i = 0; i < 4; i++) {
      // console.log(this.ly[1]);
      push();

      translate(this.lx[i], this.ly[i] - 25);

      if (i >= 2) {
        scale([-i / 10 - 0.2, i / 10 + 0.1]);
        rotate(this.deg[i]);
      } else {
        scale([0.7 - i / 10]);
        rotate(this.deg[i]);
      }

      stroke(220, this.green[i], 220);
      strokeWeight(2);
      arc(50, 60, 40, 40, 0, PI, OPEN);
      noFill();
      arc(65, 60, 40, 80, PI / 1.5, (3 * PI) / 2, OPEN); //leaf vein
      arc(65, 60, 70, 80, PI, (3 * PI) / 2, OPEN);
      arc(70, 20, 10, 80, PI / 2, PI, OPEN);
      fill(230, this.green[i], 230);
      strokeWeight(1);
      triangle(46, 75, 69, 62, 44, 68);
      triangle(44, 68, 32, 60, 46, 75);
      triangle(45, 60, 65, 44, 45, 51);
      triangle(45, 60, 33, 44, 45, 51);
      triangle(49, 36, 43, 30, 47, 40);
      triangle(49, 36, 65, 31, 47, 40);
      noFill();
      pop();
    }

    pop();
  }
  //flatting
  move() {
    //wind visualization
    for (let i = 0; i < 4; i++) {
      this.ly[i] += this.speed[i];
      this.lx[i] += random(-0.3, 0.3);
      if (this.ly[i] < -25 || this.ly[i] > 25) {
        this.speed[i] = -this.speed[i];
        // console.log(this.ly[i])
      }
    }
  }
}
