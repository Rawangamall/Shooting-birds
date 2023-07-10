let start = document.querySelector("button");
let intro = document.querySelector("h1");
let username = document.querySelector("label[name=username]");

let game = new Audio("audio/game.mp3");


start.onclick=function(){

  game.play();

  if (localStorage.getItem("name") === null) {
    alert("Please enter your name first");
    return;
}else{

  intro.innerText += localStorage.getItem("name");
  username.innerText += localStorage.getItem("name");
  
}

    let welcomeDiv = document.querySelector("#start");
    welcomeDiv.style.display="none"
class BirdObj{
    constructor(src,score){
       this.src = src;
       let birdimg = document.createElement("img");
        birdimg.src = src;
        this.image=birdimg;
        this.score = score;
 
    }
    getimage(){return this.image;}
    getimage_src(){
        return this.src;
    }
    setimage_src(src){
    this.src = src;
    }
}

class Birds extends BirdObj{
    static TotalScore=0;
    static count=0;

    constructor(src,score){
        super(src,score);

   this.shootSound = new Audio("audio/shot2.mp3");

      document.body.append(this.image);
      if(this.src == "images/black.gif")
      {this.image.classList.add("black");}
      
      if(this.src == "images/white.gif")
      {this.image.classList.add("white");}
      
      if(this.src == "images/cyan.gif")
      { this.image.classList.add("cyan");}

      this.image.style.top=this.getRandom(0,window.innerHeight-80)+"px";
      this.image.style.left=0 +"px";
      this.score=score;
      this.shooting();
    }
get BirdImg(){return this.image;}
static get Totalscore(){return Birds.TotalScore};
static set Totalscore(TotalScore){Birds.TotalScore +=TotalScore;}     //shooting func
static set count(count){ Birds.count = count++;}
static get count(){return Birds.count};

getRandom(min, max){
    let result= Math.floor(Math.random() * (max - min + 1) + min); 
     return result;
      }

  moving_right(speed)
{
  let left=0;
  let id=setInterval(()=>
  {
    left+=speed;            
      if(left<window.innerWidth-this.image.width)
      {
        this.image.style.left=left+"px";
      }
      else{clearInterval(id); 
      this.image.style.display="none";
    }

  },150);

}
 
  shooting(){ 
    this.image.addEventListener('click', kill => {
      
      this.shootSound.play();

    if(this.score == 5)
    {this.image.style.display="none";
    Birds.Totalscore = 5;
    Birds.count++;
    }
   else if(this.score == 10)
   {this.image.style.display="none";
    Birds.Totalscore = 10;
    Birds.count++;
    }
    else if(this.score == -10)
     {this.image.style.display="none";
    Birds.Totalscore = -10;
    Birds.count++;
    }
  document.querySelector("label[name=score]").innerHTML = "Score: " + Birds.TotalScore;
  document.querySelector("label[name=killed]").innerHTML = "Birds killed: " + Birds.count;


});
    if(Birds.TotalScore > 50){
      document.querySelector("#status").innerHTML = "YOU WON";
      }else{ document.querySelector("#status").innerHTML = "YOU LOSE";
     };
  }

}
class Bomb extends BirdObj{
  constructor(src,score=0){  
    super(src,score)

    this.bombSound = new Audio("audio/bomb2.mp3");

    document.body.append(this.image);
    this.image.style.top=0+"px";
    this.image.style.left=getRandom(0,window.innerWidth-80) +"px";
    this.explosion();
  }
get bombImg(){return this.image};
 
moving_down(speed)
{
  let top=0;
  let id=setInterval(()=>
  {
      top +=speed;            
      if(top < window.innerHeight-this.image.height)
      {
        this.image.style.top=top+"px";
      }
      else{clearInterval(id); 
      this.image.style.display="none";
    }
  },500);
}

explosion() {

  let positionx = parseInt(this.image.style.left);
  let BOwidth = parseInt(this.image.width);
  let BOheight = parseInt(this.image.height);
  this.image.onclick =  () => {

    var currentSrc = this.image.src;
    var newSrc = currentSrc.split("images/")[0] + "images/explosion.png";
    this.image.src = newSrc;
    
    this.bombSound.play()

    let positiony = parseInt(this.image.style.top);
    let Bbirds = document.querySelectorAll(".black");
    let Wbirds = document.querySelectorAll(".white");
    let Cbirds = document.querySelectorAll(".cyan");

    for (let index = 0; index < Bbirds.length; index++) {
      let element = Bbirds[index];
      if (
        positionx - 100 < parseInt(element.style.left) &&
        (positionx + BOwidth + 100) > parseInt(element.style.left) + element.width &&
        positiony - 100 < parseInt(element.style.top) &&
        (positiony + BOheight + 100) > parseInt(element.style.top) + element.height){

        Birds.Totalscore = 10;
        Birds.count++;
        element.style.display="none";
        document.querySelector("label[name=score]").innerHTML = "Score: " + Birds.TotalScore;
        document.querySelector("label[name=killed]").innerHTML = "Birds killed: " + Birds.count;
      }
    }
    for (let index = 0; index < Wbirds.length; index++) {
      let element = Wbirds[index];
      if (
        positionx - 100 < parseInt(element.style.left) &&
        (positionx + BOwidth + 100) > parseInt(element.style.left) + element.width &&
        positiony - 100 < parseInt(element.style.top) &&
        (positiony + BOheight + 100) > parseInt(element.style.top) + element.height){

          Birds.Totalscore = 5;
         Birds.count++;
         element.style.display="none";
         document.querySelector("label[name=score]").innerHTML = "Score: " + Birds.TotalScore;
         document.querySelector("label[name=killed]").innerHTML = "Birds killed: " + Birds.count;
       
      }
    }
    for (let index = 0; index < Cbirds.length; index++) {
      let element = Cbirds[index];
      if (
        positionx - 200 < parseInt(element.style.left) &&
        (positionx + BOwidth + 200) > parseInt(element.style.left) + element.width &&
        positiony - 200 < parseInt(element.style.top) &&
        (positiony + BOheight + 200) > parseInt(element.style.top) + element.height){
 
          Birds.Totalscore = -10;
          Birds.count++;
          element.style.display="none";
          document.querySelector("label[name=score]").innerHTML = "Score: " + Birds.TotalScore;
          document.querySelector("label[name=killed]").innerHTML = "Birds killed: " + Birds.count;
 
       
      }
    }
    setTimeout(() => {
      this.image.remove();
    }, 500);  }
}

}//class bomb


function getRandom(min, max){
    
    let result= Math.floor(Math.random() * (max - min + 1) + min); 
     return result;
  }

images_arr =["images/black.gif","images/white.gif","images/cyan.gif"];
let birds=[];
let  randbird;
let  randNum = getRandom(40,60);
let i = 0;
let id = setInterval(function(){
    randbird = getRandom(0, 2);
    if(birds.length <= randNum)
 {
    switch (randbird) {
        case 0:
            birds[i] = new Birds(images_arr[0],10);
            birds[i].moving_right(35);          
            i++;
            break;
            case 1:
            birds[i] = new Birds(images_arr[1],5);
            birds[i].moving_right(20);
            i++;
            break;
            case 2:
            birds[i] = new Birds(images_arr[2],-10);
            birds[i].moving_right(20);
            i++;
            break;

    }

}else{clearInterval(id);}
},1000);

let endDiv = document.querySelector("#end");
let  seconds = 60;

let timerID = setInterval(function(){
    seconds--;
    document.querySelector("label[name=timer]").innerHTML = "Timer 0"+":" + seconds; 
    if(seconds == 0){
      game.pause();
    clearInterval(timerID);
    clearInterval(id);
    clearInterval(bombID);
    endDiv.style.display="block"
  }
 },1000);

 let bombID = setInterval(function(){
    let bomb1= new Bomb("images/bomb_3-removebg.png");
    bomb1.moving_down(30);
 },20000);


}
