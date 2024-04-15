let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

boxes.forEach(box =>{
    box.innerHTML = "";
    box.addEventListener("click", ()=>{
        if(!isGameOver && box.innerHTML === ""){
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn(){
    turn = (turn === "X") ? "O" : "X";
    document.querySelector(".bg").style.left = (turn === "X") ? "0" : "85px";
}

function checkWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for(let i = 0; i < winConditions.length; i++){
        let [a, b, c] = winConditions[i];
        if(boxes[a].innerHTML !== "" && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";

            winConditions[i].forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
        }
    }
}

function checkDraw(){
    let isDraw = true;
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].innerHTML === ""){
            isDraw = false;
            break;
        }
    }
    if(isDraw){
        isGameOver = true;
        document.querySelector("#results").innerHTML = "It's a draw!";
        document.querySelector("#play-again").style.display = "inline";
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box =>{
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });
});
