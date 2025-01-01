let Gameseq=[];// store game's sequence
let userseq=[];// store user's sequence
let highscore =document.querySelector(".Highscore");
let level =0;
let score =-1;
let scores=[];
let started=false;

let colors =["green","yellow","blue","red"];
let h3 = document.querySelector("h3");
let game_start = document.querySelector("body");

function levelup(){
    userseq=[]; // to reset the userseq after each level so they have to put the seq in the exact order from the very beginning
    level++;
    score++;
    h3.innerText=`Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randcolor = colors[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
//    console.log(randIdx);
//    console.log(randcolor);
//    console.log(randbtn);
// TO ADD THE GAME SEQUENCE IN THE ARRAY
Gameseq.push(randcolor);
console.log(Gameseq);
    btnflash(randbtn);
}

document.addEventListener("keypress",function(){
    if(started==false){
        started=true; // Turns on the Game and makes sure that the game only starts once
        console.log("Game starts");
        levelup();
    }
})

function btnflash(btn){
 btn.classList.add("flash");
setTimeout(
    function(){
        btn.classList.remove("flash");
    },100
)}

function btnuserflash(btn){
    btn.classList.add("userflash");
   setTimeout(
       function(){
           btn.classList.remove("userflash");
       },100
   )}

// to check the btn was pressed or not and to identify which button

function btnpress(){
let btn =this;
btnuserflash(this);
// console.log(btn);
usercolor = btn.getAttribute("id");
// console.log(usercolor);
userseq.push(usercolor);
// console.log(userseq);
checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns){
    btn.addEventListener("click",btnpress);

}

let body = document.querySelector("body");

function wrongflash(body) {
    if (!body) {
        console.error("Invalid element passed to wrongflash");
        return;
    }
    body.classList.add("wrongflash");
    setTimeout(() => {
        body.classList.remove("wrongflash"); // Use `body`, not `btn`
    }, 100); // 100 milliseconds
}


function checkAns(idx){
    // console.log(`Current level : ${level}`);

    if (Gameseq[idx]===userseq[idx]){
        if(Gameseq.length==userseq.length){
            levelup();
            if(level>2){
                console.log("Same colors");
            }
            else{
                console.log("Same color");
            }
    }
    }
    else
    {
        let score =level-1;
        h3.innerHTML=`Game Over,Press any key to Restart!<br/><b> Your Score is ${score}</b>`; 
        //  score=score; //updating the score
      
       console.log(`High Score is ${score}`);
       scores.push(score);
       let sortedscores = scores.sort()
       console.log(sortedscores[0]); 
       highscore.innerHTML=`HighScore : ${sortedscores[sortedscores.length-1]}`; // this shows the last element in the sorted array which is always the highest
       highscore.style.color="red";
           //    console.log(scores.sort());

       reset();
       score=score;
        wrongflash(body); // if a function takes an arguement then you HAVE to PUT an arguement when it is called.
       }
      

}

function reset(){
    level=0;
    started = false; // this makes the game reset 
    Gameseq=[];
    userseq=[];
}
