const green = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.green");
const brown = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.brown");
const blue = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.blue");

let deck = {
    firstStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
    },
    secondStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
    },
    thirdStage: {
        greenCards: 0,
        blueCards: 0,
        brownCards: 0,
    },
    greenArray: [],
    blueArray: [],
    brownArray: [],
};

const startButton = document.getElementById('start');
const CARD = document.getElementById('Card');
const CARDBACK = document.getElementById('CardBack');

let ancient = null;
let diff = null;

function get_deck(imageID, difficult) {
    cleanDeck();
    let stages = ancientsData.filter(function(val) {
        return val.id == imageID;
    })[0];
    deck.firstStage.greenCards = stages.firstStage.greenCards;
    deck.firstStage.brownCards = stages.firstStage.brownCards;
    deck.firstStage.blueCards = stages.firstStage.blueCards;

    deck.secondStage.greenCards = stages.secondStage.greenCards;
    deck.secondStage.brownCards = stages.secondStage.brownCards;
    deck.secondStage.blueCards = stages.secondStage.blueCards;

    deck.thirdStage.greenCards = stages.thirdStage.greenCards;
    deck.thirdStage.brownCards = stages.thirdStage.brownCards;
    deck.thirdStage.blueCards = stages.thirdStage.blueCards;
    getArrayCards();
    /*  
        let card = cardsData.filter(function(i) {
            return i.difficulty == difficult && i.color == 'green';
        })[0].id;
        CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/MythicCards/blue/blue10.png";
        console.log(card); */

}

function getArrayCards() {
    let greenCards = deck.firstStage.greenCards + deck.secondStage.greenCards + deck.thirdStage.greenCards;
    let brownCards = deck.firstStage.brownCards + deck.secondStage.brownCards + deck.thirdStage.brownCards;
    let blueCards = deck.firstStage.blueCards + deck.secondStage.blueCards + deck.thirdStage.blueCards;

    console.log(greenCards + ' ' + brownCards + ' ' + blueCards);

    for (let i = 0; i < greenCards; i++) {
        let x = 'green' + Math.floor(Math.random() * 19);
        if (!(deck.greenArray.includes(x))) {
            deck.greenArray.push(x);
        } else { i--; }
    }
    console.log(deck.greenArray);

    for (let i = 0; i < brownCards; i++) {
        let x = 'brown' + Math.floor(Math.random() * 22);
        if (!(deck.brownArray.includes(x))) {
            deck.brownArray.push(x);
        } else { i--; }
    }
    console.log(deck.brownArray);

    for (let i = 0; i < blueCards; i++) {
        let x = 'green' + Math.floor(Math.random() * 13);
        if (!(deck.blueArray.includes(x))) {
            deck.blueArray.push(x);
        } else { i--; }
    }
    console.log(deck.blueArray);

}

function UpdTracker() {
    green[0].textContent = deck.firstStage.greenCards;
    brown[0].textContent = deck.firstStage.brownCards;
    blue[0].textContent = deck.firstStage.blueCards;

    green[1].textContent = deck.secondStage.greenCards;
    brown[1].textContent = deck.secondStage.brownCards;
    blue[1].textContent = deck.secondStage.blueCards;

    green[2].textContent = deck.thirdStage.greenCards;
    brown[2].textContent = deck.thirdStage.brownCards;
    blue[2].textContent = deck.thirdStage.blueCards;
}

function cleanDeck() {
    for (let a in deck) {
        for (let b in deck[a]) {
            deck[a][b] = 0;
        }
    }
    deck.greenArray.length = 0;
    deck.brownArray.length = 0;
    deck.blueArray.length = 0;
    CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/mythicCard.png";
}

CARDBACK.addEventListener("click", () => {
    CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/mythicCard.png";
    CARD.style.display = "block";
    CARDBACK.style.display = "block";
    get_deck(ancient, diff);
    UpdTracker();
});

startButton.addEventListener("click", () => {
    CARD.style.display = "block";
    console.log("style.display");
    CARDBACK.style.display = "block";
    get_deck(ancient, diff);
    UpdTracker();
});

document.addEventListener('click', (e) => {
    const image = e.target.closest('img');
    if (image === null || image.id === 'CardBack' || image.id === 'Card') return;
    ancient = image.id;
    console.log(`ancient: ${ancient}, difficulty: ${diff}`);
    /* clean deck */
    cleanDeck();

    UpdTracker();
    /* update map selection */
    for (let i = 0; i < 6; i++) {
        document.images[i].classList.remove('focus');
    }
    image.classList.toggle('focus');

    if (ancient != null && diff != null) {
        startButton.style.display = "block"
    }
});

document.addEventListener('click', (e) => {
    const buttons = document.querySelectorAll('button');
    const difficulty = e.target.closest('button');

    if (difficulty === null || difficulty.id === 'start') return;
    for (let i = 0; i < 5; i++) {
        buttons[i].classList.remove('focus');
    }
    difficulty.classList.toggle('focus');
    diff = difficulty.id;
    console.log(`ancient: ${ancient}, difficulty: ${diff}`);
    /* clean deck */
    cleanDeck();
    UpdTracker();
    if (ancient != null && diff != null) {
        startButton.style.display = "block"
    }
});






/* getElementById
querySelector */