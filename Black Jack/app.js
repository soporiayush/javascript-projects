console.log('the file has been linked')
let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjackresult', 'div':'#your-box','score':0},
    'dealer': {'scoreSpan':'#dealer-blackjackresult', 'div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2': 2, '3': 3, '4': 4, '5':5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A':[1,11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
    'isHit':false,
};
const You = blackjackGame['you'];
const Dealer = blackjackGame['dealer'];
const hitsound = new Audio('blackjackassets/sounds/swish.m4a');
const winsound = new Audio('blackjackassets/sounds/cash.mp3');
const lostsound = new Audio('blackjackassets/sounds/aww.mp3');

document.querySelector("#blackjact-hit-btn").addEventListener('click',blackjackhit);
document.querySelector("#blackjact-deal-btn").addEventListener('click',blackJackdeal);
document.querySelector("#blackjact-stand-btn").addEventListener('click',dealerLogic);

function blackjackhit(){
    if (blackjackGame['isStand']===false){
        let card = randomCard();
        showCard(You,card);
        updateScore(You,card);
        showScore(You);
        blackjackGame['isHit'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer,card){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src='blackjackassets/images/'+ card +'.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
    
}

function blackJackdeal(){
    if(blackjackGame['turnsOver']===true){
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        yourImages.forEach(image => {
            image.remove();
        });
        dealerImages.forEach(image => {
            image.remove();
        });
        You['score'] = 0;
        Dealer['score'] = 0;
        document.querySelector(You['scoreSpan']).textContent = 0;
        document.querySelector(You['scoreSpan']).style.color = 'white';
        document.querySelector(Dealer['scoreSpan']).textContent = 0;
        document.querySelector(Dealer['scoreSpan']).style.color = 'white';
        document.querySelector(Dealer['scoreSpan']).style.color = 'white';
        updateTable();
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
        blackjackGame['isHit'] = false;
    }
}

//calculating the score in backend
function updateScore(activePlayer,card){
    if(card ==='A')       //checking wheather to pick 1 or 11
    {
        if(activePlayer['score'] + blackjackGame['cardsMap']['A'][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap']['A'][1];
        }
        else{
            activePlayer['score']+= blackjackGame['cardsMap']['A'][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

//updating the score on UI
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}
function sleep(ms){
    return new Promise(time => setTimeout(time,ms));
}

async function dealerLogic(){
    
    while(Dealer['score']<=15 && blackjackGame['isHit'] === true){
        blackjackGame['isStand'] = true;
        let card = randomCard();
        showCard(Dealer,card);
        updateScore(Dealer,card);
        showScore(Dealer,card);
        await sleep(700);
    }
    if (blackjackGame['isHit'] === true && blackjackGame['isStand'] === true){
        blackjackGame['turnsOver'] = true;
        let winner = computWinner();
        showResult(winner);
    }
}

function computWinner(){
    let winner;
    if(You['score']<=21){

        if(You['score'] > Dealer['score'] || Dealer['score'] > 21){
            winner=You;
            blackjackGame['wins']++;
        }
        else if(You['score'] < Dealer['score']){
            winner=Dealer;
            blackjackGame['losses']++;
        }
        else if(You['score'] === Dealer['score']){
            blackjackGame['draws']++;
        }
    }
    else if(You['score']>21 && Dealer['score']<=21){
        blackjackGame['losses']++;
        winner=Dealer;
    }
    else if(You['score']>21 && Dealer['score']>21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(Winner){
    let message;
    let messageColor;
    if(Winner===You){
        message = 'You Won!!' ;
        messageColor = 'green';
        winsound.play();
        document.querySelector('#blackjack-result').textContent = message;
    }
    else if(Winner===Dealer){
        message = 'You Lost!!' ;
        messageColor = 'red';
        lostsound.play();
    }
    else{
        message = 'You drew!!' ;
        messageColor = 'blue';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

function updateTable(){
    document.querySelector('#wins').textContent = blackjackGame['wins'];
    document.querySelector('#losses').textContent = blackjackGame['losses'];
    document.querySelector('#draws').textContent = blackjackGame['draws'];
}