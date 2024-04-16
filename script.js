function playerInfo(){

    let turn;

    let player1;
    let player2;

    const playersInfoDiv = document.createElement('div');
    playersInfoDiv.classList.add('playersInfo');

    const player1Div = document.createElement('div');
    player1Div.classList.add('player1');
    

    const turnDiv = document.createElement('div');
    turnDiv.classList.add('TURN');
    turnDiv.textContent = "x";

    const player2Div = document.createElement('div');
    player2Div.classList.add('player2');
    
    playersInfoDiv.style.cssText = `
            width: 99vw;
            padding: 0.2rem;
            display: flex;
            justify-content: space-between;
    `

    playersInfoDiv.appendChild(player1Div);
    playersInfoDiv.appendChild(turnDiv);
    playersInfoDiv.appendChild(player2Div);

    return {
       
        appendInto:(playGround,p1,p2)=>{
                turn=1
                player2Div.removeAttribute("style")
                player1=p1;
                player2=p2;
                player1Div.textContent = player1;
                player2Div.textContent = player2;
                player1Div.style = "Background-color:green;"
                turnDiv.textContent =  `${player1}'s Turn`
                playGround.append(playersInfoDiv)
        },
        Toggle:()=>{
            if(turn==1){
                player1Div.removeAttribute("style")
                player2Div.style = "Background-color:green;"
                turnDiv.textContent =  `${player2}'s Turn`
                turn=2;
            }else{
                player2Div.removeAttribute("style")
                player1Div.style = "Background-color:green;"
                turnDiv.textContent =  `${player1}'s Turn`
                turn=1;
            }
           
        }
    }
}

function Game(playGround,p1,p2,controlInfo){
    let game_board_array=[" "," "," "," "," "," "," "," "," "];

    let player1={
        name:p1,
        Symbol:"X"
    };
    let player2={
        name:p2,
        Symbol:"O"
    };
    
    let currentState=player1;

    function setPlaceCss(position){
        switch (position) {
            case 1:
                return `
                border-left: 0px solid white;
                border-top: 5px solid white;
                border-top-left-radius: 20px;
                `
                break;
            case 2:
                return `
                border-top: 0px solid white;
                `
            case 3:
                return `
                border-right: 0px solid white;
                border-top: 5px solid white;
                border-top-right-radius: 20px;
                `;
                break;
            case 4:
                return `
                border-left: 0px solid white;
                `   
                break;
            case 6:
                return `
                border-right: 0px solid white;
                `
                break;
            case 7:
                return `
                border-left: 0px solid white;
                border-bottom: 0px solid white;
                border-bottom-left-radius: 20px;
                ` 
            case 8:
                return `
                border-bottom: 0px solid white;
                `
            case 9:
                return `
                border-right: 0px solid white;
                border-bottom: 5px solid white;
                border-bottom-right-radius: 20px;
                `
            default:
                return ``;
                break;
        }
    }

    function restartGame(){
        playGround.innerHTML = "";
        dialogModal2.close();
        playerInfoComponent.appendInto(playGround,player1Name,player2Name)
        game_board = Game(playGround,player1Name,player2Name,playerInfoComponent);
        game_board.start()
    }
    
    function endGame(result){
            let end_message;
            if(result=="tie"){
                result=null;
                end_message="its a tie!";
            }else{
               end_message= player1.Symbol===result ? `${player1.name} Won!!!` : `${player2.name} Won!!!`
               result=null;
            }
            let message_place = dialogModal2.querySelector(".won");
            message_place.textContent = end_message;
            dialogModal2.showModal();
            let restart = dialogModal2.querySelector(".restart");
            restart.addEventListener("click",restartGame);
    }

    function checkwin(){
            // checking verticle lines
            for(let i=0;i<9;){
                if((game_board_array[i]===game_board_array[i+1] && game_board_array[i+1]===game_board_array[i+2])&&game_board_array[i]!==" "){
                   endGame(game_board_array[i]);
                   return;
                }
                i=i+3;
            }
            //checking horizontal lines
            for(let i=0;i<3;i++){
                if((game_board_array[i]===game_board_array[i+3] && game_board_array[i+3]===game_board_array[i+6])&&game_board_array[i]!==" "){
                    endGame(game_board_array[i]);
                    return;
                }
            }
            //checking right diagnol
            if((game_board_array[0]===game_board_array[4] && game_board_array[4]===game_board_array[8]) && game_board_array[0]!==" "){
                 endGame(game_board_array[0]);
                 return;
            }
            //checking left diagnol
            if((game_board_array[2]===game_board_array[4] && game_board_array[4]===game_board_array[6]) && game_board_array[2]!==" "){
                endGame(game_board_array[2]);
                return;
            }
            // checking tie
            for(let i=0;i<=9;i++){
                if(game_board_array[i]===" "){
                        break
                }
                if(i==9){
                    endGame("tie");
                    return;
                }
            }
    }

    function playTurn(e){
        if(game_board_array[e.target.id]!==" "){
            return;
        }
        if(currentState===player1){
            game_board_array[e.target.id]=player1.Symbol;
            e.target.textContent=player1.Symbol;
            currentState=player2;
        }else{
            game_board_array[e.target.id]=player2.Symbol;
            e.target.textContent=player2.Symbol;
            currentState=player1;
        }
        controlInfo.Toggle()
        checkwin()
    }

    function createBoard (playGround){
        const board = document.createElement("div");
        board.classList.add("board");
        board.style.cssText = `
                width: 75%;
                height: 65%;
                display: grid;
                grid-template-rows: repeat(3,1fr);
                grid-template-columns: repeat(3,1fr);
        `
        for (let i = 0; i < 9; i++) {
           let place = document.createElement("div");
           place.classList.add("place");
           place.id = i;
           place.style.cssText = `
                font-size:4.9rem;
                font-family: indie_flower;
                color:black;
                display:flex;
                justify-content:center;
                align-items:center;
                background-color:white;
                border:3px groove #0F0F0F;
           `+setPlaceCss(i+1);
           place.addEventListener('click',(e)=>{
               playTurn(e);
           })
           board.appendChild(place) ;
        }
        playGround.append(board);
    }
    

    return {
        start:()=>{
            createBoard(playGround);
        }
    }
}


const playGround = document.querySelector(".playGround");

const start_button = document.querySelector(".strtGame");

const dialogModal1 = document.querySelector(".d1");

const strtModal = document.querySelector(".strtModal");

const dialogModal2 = document.querySelector(".d2");

const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

let player1Name;
let player2Name;

const playerInfoComponent=playerInfo();

start_button.addEventListener('click',(e)=>{
    dialogModal1.showModal();
    playGround.innerHTML = "";
}) 

strtModal.addEventListener('click',()=>{
    if(player1Name==="" || player2Name===""){
        window.alert("please enter player's name");
        return;
    }
    player1Name=p1.value;
    player2Name=p2.value;
    dialogModal1.close();
    playerInfoComponent.appendInto(playGround,player1Name,player2Name);
    let game_board = Game(playGround,player1Name,player2Name,playerInfoComponent);
    game_board.start();
})
