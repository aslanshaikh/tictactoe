const boxes = document.querySelectorAll(".box");

const gameInfo = document.querySelector('.game-info');

const newgamebtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//init function
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //grenn bg remove
        box.classList = `box box${index+1}`;
    });
    newgamebtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
    // ui par boxes emty 
    
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}
function checkGameOver()
{
    let answer = "";
    
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !==""  )
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] )){
            
            //check if winner is x
            if(gameGrid[position[0]] === 'X')
                answer = "X";
            else  
                answer = "O";

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

        //now we know the winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner is - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }
    //when there is no winner, game tie  
    
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount == 9){
        gameInfo.innerText = "Game Tied";
        newgamebtn.classList.add("active");
    }
}
function handleCLick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //check if anyone won 
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click',()=> {
        handleCLick(index);
    })
});

newgamebtn.addEventListener('click', initGame);


