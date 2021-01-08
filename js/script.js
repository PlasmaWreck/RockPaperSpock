let titleInjectable = document.getElementById("titleInjectable");
let playerHands = ["",""];
let winningPlayer = 0;
let player1Score = 0;
let player2Score = 0;
let maxWins;
let vsBot;
let handTypes = {
    rock: {
        hand:'rock',
        winsAgainst: ['scissors','lizard']
    },
    paper: {
        hand:'paper',
        winsAgainst: ['rock','spock']
    },
    scissors: {
        hand:'scissors',
        winsAgainst: ['paper','lizard']
    },
    lizard: {
        hand:'lizard',
        winsAgainst: ['spock','paper']
    },
    spock: {
        hand:'spock',
        winsAgainst: ['scissors','rock']
    }
};
function compareHands(hand1,hand2){
    if(hand1.winsAgainst.includes(hand2.hand)){
        winningPlayer = 1;
        player1Score = player1Score + 1;
    }else if(hand2.winsAgainst.includes(hand1.hand)){
        winningPlayer = 2;
        player2Score = player2Score + 1;
    }else{
        winningPlayer = 0;
    } 

    grabDom('win');
};
async function getFetch(){
    let data = await fetch("https://csa2020studentapi.azurewebsites.net/rpsls");
    data = await data.text();
    assignHand(data, 2);
};
function assignHand(handType, playerNum){
    switch(handType){
        case "Rock":
            playerHands[playerNum - 1] = handTypes.rock;
        break;
        case "Paper":
            playerHands[playerNum - 1] = handTypes.paper;
        break;
        case "Scissors":
            playerHands[playerNum - 1] = handTypes.scissors;
        break;
        case "Lizard":
            playerHands[playerNum - 1] = handTypes.lizard;
        break;
        case "Spock":
            playerHands[playerNum - 1] = handTypes.spock;
        break;
    };
    if(playerHands[0] !== "" && playerHands[1] !== ""){
        compareHands(playerHands[0],playerHands[1]);
        playerHands = ["",""];
    };
};
function initializeGameSpace(inner, type){
    titleInjectable.innerHTML = inner;
    switch(type){
    case 'player':
        let rockBtn = document.getElementById("rockBtn") ,paperBtn = document.getElementById("paperBtn") ,lizardBtn = document.getElementById("lizardBtn") ,scissorsBtn = document.getElementById("scissorsBtn") ,spockBtn = document.getElementById("spockBtn");
        rockBtn.addEventListener("click", () => {
            assignHand("Rock", 1);
        });
        paperBtn.addEventListener("click", () => {
            assignHand("Paper", 1);
        });
        scissorsBtn.addEventListener("click", () => {
            assignHand("Scissors", 1);
        });
        lizardBtn.addEventListener("click", () => {
            assignHand("Lizard", 1);
        });
        spockBtn.addEventListener("click", () => {
            assignHand("Spock", 1);
        });
        
        rockBtn2.addEventListener("click", () => {
            assignHand("Rock", 2);
        });
        paperBtn2.addEventListener("click", () => {
            assignHand("Paper", 2);
        });
        scissorsBtn2.addEventListener("click", () => {
            assignHand("Scissors", 2);
        });
        lizardBtn2.addEventListener("click", () => {
            assignHand("Lizard", 2);
        });
        spockBtn2.addEventListener("click", () => {
            assignHand("Spock", 2);
        });
    break;
    case 'rounds':
        let oneWinBtn = document.getElementById("oneWinBtn") ,threeWinBtn = document.getElementById("threeWinBtn") ,fourWinBtn = document.getElementById("fourWinBtn");
        oneWinBtn.addEventListener("click", () => {
            vsBot ? grabDom('botGame') : grabDom('playerGame');
            maxWins = 1;
        });
        threeWinBtn.addEventListener("click", () => {
            vsBot ? grabDom('botGame') : grabDom('playerGame');
            maxWins = 3;
        });
        fourWinBtn.addEventListener("click", () => {
            vsBot ? grabDom('botGame') : grabDom('playerGame');
            maxWins = 4;
        });
    break;
    case 'bot':
        let rockBotBtn = document.getElementById("rockBotBtn") ,paperBotBtn = document.getElementById("paperBotBtn") ,lizardBotBtn = document.getElementById("lizardBotBtn") ,scissorsBotBtn = document.getElementById("scissorsBotBtn") ,spockBotBtn = document.getElementById("spockBotBtn");
        rockBotBtn.addEventListener("click", () => {
            assignHand("Rock", 1);
            getFetch();
        });
        paperBotBtn.addEventListener("click", () => {
            assignHand("Paper", 1);
            getFetch();
        });
        scissorsBotBtn.addEventListener("click", () => {
            assignHand("Scissors", 1);
            getFetch();
        });
        lizardBotBtn.addEventListener("click", () => {
            assignHand("Lizard", 1);
            getFetch();
        });
        spockBotBtn.addEventListener("click", () => {
            assignHand("Spock", 1);
            getFetch();
        });
    break;
    case 'home':
        let multiplayerBtn = document.getElementById("multiplayerBtn"), botBtn = document.getElementById("botBtn");
        multiplayerBtn.addEventListener("click", () => {
            grabDom('rounds');
            vsBot = false;
        });
        botBtn.addEventListener("click", () => {
            grabDom('rounds');
            vsBot = true;
        });
    break;
    case 'win':
        if(maxWins === player1Score || maxWins === player2Score){
            let winText = document.getElementById("winningInjectable"), returnBtn = document.getElementById("returnBtn"), continueBt = document.getElementById("continueBtn"), player1ScoreText = document.getElementById("player1Score"), player2ScoreText = document.getElementById("player2Score");
            returnBtn.addEventListener("click", () => {
                grabDom();
            });
            continueBtn.remove();
            player1ScoreText.innerText = player1Score;
            player2ScoreText.innerText = player2Score;
            if(winningPlayer === 0){
                winText.innerText = "It's a tie!";
            }else winText.innerText = `Player ${winningPlayer} wins this whole game!`;

        }else{
            let winText = document.getElementById("winningInjectable"), returnBtn = document.getElementById("returnBtn"), continueBt = document.getElementById("continueBtn"), player1ScoreText = document.getElementById("player1Score"), player2ScoreText = document.getElementById("player2Score");
            returnBtn.addEventListener("click", () => {
                grabDom();
            });
            continueBtn.addEventListener("click", () => {
                vsBot ? grabDom('botGame') : grabDom('playerGame');
            });
            player1ScoreText.innerText = player1Score;
            player2ScoreText.innerText = player2Score;
            if(winningPlayer === 0){
                winText.innerText = "It's a tie!";
            }else winText.innerText = `Player ${winningPlayer} wins this round!`;
        }
            
    break;
    }
};
async function grabDom(screenType){
    if(screenType === 'botGame'){
        let temp = await fetch('../html/botGame.html');
        temp = await temp.text();
        initializeGameSpace(temp, 'bot');
    }else if(screenType === 'playerGame'){
        let temp = await fetch('../html/playerGame.html');
        temp = await temp.text();
        initializeGameSpace(temp, 'player');
    }else if(screenType === 'win'){
        let temp = await fetch('../html/winScreen.html');
        temp = await temp.text();
        initializeGameSpace(temp,'win');
        
    }else if(screenType === 'rounds'){
        let temp = await fetch('../html/gameChoice.html');
        temp = await temp.text();
        initializeGameSpace(temp,'rounds');
    }else{
        let temp = await fetch('../html/homeMenu.html');
        player1Score = 0;
        player2Score = 0;
        temp = await temp.text();
        initializeGameSpace(temp,'home');
    }
}


grabDom();