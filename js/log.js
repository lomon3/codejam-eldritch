const green = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.green");
const brown = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.brown");
const blue = document.getElementById('tracker_wrapper').querySelectorAll(":scope > .stages > .dots-container > .dot.blue");
const startButton = document.getElementById('start');
const CARD = document.getElementById('Card');
const CARDBACK = document.getElementById('CardBack');

let ancient = null;
let diff = null;

let deck = {
    firstStage: {
        greenCards: [],
        brownCards: [],
        blueCards: [],

    },
    secondStage: {
        greenCards: [],
        brownCards: [],
        blueCards: [],

    },
    thirdStage: {
        greenCards: [],
        brownCards: [],
        blueCards: [],

    },
};

function get_deck(imageID, difficult) {
    cleanDeck();
    let stages = ancientsData.filter(function(val) {
        return val.id == imageID;
    })[0];
    let SUMgreenCards = stages.firstStage.greenCards + stages.secondStage.greenCards + stages.thirdStage.greenCards;
    let SUMbrownCards = stages.firstStage.brownCards + stages.secondStage.brownCards + stages.thirdStage.brownCards;
    let SUMblueCards = stages.firstStage.blueCards + stages.secondStage.blueCards + stages.thirdStage.blueCards;
    let greenArray = [],
        brownArray = [],
        blueArray = [];
    console.log(SUMgreenCards + ' ' + SUMbrownCards + ' ' + SUMblueCards);

    for (let i = 0; i < SUMgreenCards; i++) {
        let x = 'green' + Math.floor(Math.random() * 18);
        if (!(greenArray.includes(x))) {
            greenArray.push(x);
        } else { i--; }
    }

    for (let i = 0; i < SUMbrownCards; i++) {
        let x = 'brown' + Math.floor(Math.random() * 21);
        if (!(brownArray.includes(x))) {
            brownArray.push(x);
        } else { i--; }
    }

    for (let i = 0; i < SUMblueCards; i++) {
        let x = 'blue' + Math.floor(Math.random() * 12);
        if (!(blueArray.includes(x))) {
            blueArray.push(x);
        } else { i--; }
    }

    deck.firstStage.greenCards = greenArray.splice(0, stages.firstStage.greenCards);
    deck.secondStage.greenCards = greenArray.splice(0, stages.secondStage.greenCards);
    deck.thirdStage.greenCards = greenArray.splice(0, stages.thirdStage.greenCards);

    deck.firstStage.blueCards = blueArray.splice(0, stages.firstStage.blueCards);
    deck.secondStage.blueCards = blueArray.splice(0, stages.secondStage.blueCards);
    deck.thirdStage.blueCards = blueArray.splice(0, stages.thirdStage.blueCards);

    deck.firstStage.brownCards = brownArray.splice(0, stages.firstStage.brownCards);
    deck.secondStage.brownCards = brownArray.splice(0, stages.secondStage.brownCards);
    deck.thirdStage.brownCards = brownArray.splice(0, stages.thirdStage.brownCards);

    console.log(deck);

    /*  
        let card = cardsData.filter(function(i) {
            return i.difficulty == difficult && i.color == 'green';
        })[0].id;
        CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/MythicCards/blue/blue10.png";
        console.log(card); */

}

function UpdTracker() {
    green[0].textContent = deck.firstStage.greenCards.length;
    brown[0].textContent = deck.firstStage.brownCards.length;
    blue[0].textContent = deck.firstStage.blueCards.length;

    green[1].textContent = deck.secondStage.greenCards.length;
    brown[1].textContent = deck.secondStage.brownCards.length;
    blue[1].textContent = deck.secondStage.blueCards.length;

    green[2].textContent = deck.thirdStage.greenCards.length;
    brown[2].textContent = deck.thirdStage.brownCards.length;
    blue[2].textContent = deck.thirdStage.blueCards.length;
}

function cleanDeck() {
    for (let a in deck) {
        for (let b in deck[a]) {
            deck[a][b].length = 0;
        }
    }
    CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/mythicCard.png";
}

function getCard(obj) {
    let arrOfStage = [];
    for (key in obj) {
        if (obj[key].length > 0) {
            obj[key].forEach(element => {
                arrOfStage.push(element);
            });
        }
    }
    if (arrOfStage.length > 0) {
        let numOfCard = Math.floor(Math.random() * (arrOfStage.length));
        for (key in obj) {
            let indexForDell = obj[key].indexOf(arrOfStage[numOfCard]);
            if (indexForDell !== -1) {
                obj[key].splice(indexForDell, 1);
            }
        }
        return arrOfStage[numOfCard];
    } else return null;
}

function takeCard() {
    let fromFirsArray = getCard(deck.firstStage);
    if (fromFirsArray != null) {
        console.log(deck.firstStage);
        CARD.src = `https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/MythicCards/cards/${fromFirsArray}.png`;
        UpdTracker();
    } else {
        let fromSecondArray = getCard(deck.secondStage);
        if (fromSecondArray != null) {
            CARD.src = `https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/MythicCards/cards/${fromSecondArray}.png`;
            UpdTracker();
        } else {
            let fromTheirdArray = getCard(deck.thirdStage);
            if (fromTheirdArray != null) {
                CARD.src = `https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/MythicCards/cards/${fromTheirdArray}.png`;
                UpdTracker();
            } else CARD.src = "https://raw.githubusercontent.com/lomon3/codejam-eldritch/codejam-eldritch/assets/mythicCard.png";
        }
    };

}

CARDBACK.addEventListener("click", () => {
    takeCard();
});

startButton.addEventListener("click", () => {
    CARD.style.display = "block";
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