const cards = document.querySelectorAll('.memory-card')
const scoreDisplay = document.querySelector('#resultScore')
const moveDisplay = document.querySelector('#resultMove')
const refreshButton = document.querySelector('.refresh-button');

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard
let score = 0
let move = 0
let match = 0

let star3 = 8
let star2 = 12
let star1 = 16

const refreshPage = () => {
    setTimeout(()=>{
        location.reload();
    }, 300)
  }

function flipCard(){
    if(lockBoard) return

    if( this === firstCard) return

    this.classList.toggle('flip')

    if(!hasFlippedCard){
        //first click

        hasFlippedCard = true
        firstCard = this

        return
    } 
    // second click
    hasFlippedCard = false
    secondCard = this

    move++
    setTimeout(()=>{
        moveDisplay.textContent = move
    }, 500)

    setRating(move)

    checkForMatch()
}

//check cards match or not
function checkForMatch(){

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    isMatch ? disableCards() : unflipCards()
    
    setTimeout(()=> {
        if(isMatch) match++
        if(match == 6){
            alert(`You earned ${score} star(s) with ${move} moves!`)
        }
    }, 1000)
   
}

//if it matches
function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    
    resetBoard()
}

// if it doesn't match
function unflipCards(){
    lockBoard = true
    
    setTimeout(()=> {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false] 
    [firstCard, secondCard] = [null, null]
}

function setRating(move){
    var rating = 3
    if(move > star3 && move < star2){
        rating = 2
    } else if(move > star2 && move < star1){
        rating = 1
    } else if(move > star1){
        rating = 0
    }

    score = rating;
    
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard))
refreshButton.addEventListener('click', refreshPage)