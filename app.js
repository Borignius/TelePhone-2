let highScoreNum = 0
let highScore
let secondPlaceNum = 0
let secondPlace
let thirdPlaceNum = 0
let thirdPlace
let scoresArea = document.getElementById('scores')

fetch('https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/GBP')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    data.forEach(function(currentData){
      if (currentData.score > highScoreNum) {
        highScoreNum = currentData.score
        highScore = currentData
      }
      if (currentData.score > secondPlaceNum && currentData.score != highScoreNum) {
        secondPlaceNum = currentData.score
        secondPlace = currentData
      }
      if (currentData.score > thirdPlaceNum && currentData.score != highScoreNum && currentData.score != secondPlaceNum){
        thirdPlaceNum = currentData.score
        thirdPlace = currentData
      }
    })
    showScore(highScore)
    showScore(secondPlace)
    showScore(thirdPlace)
  })
  .catch(function(err) {
    console.log(err.message)
  })

function showScore(thisScore){
  let p = document.createElement('p')
  let span = document.createElement('span')
  let span2 = document.createElement('span')
  p.className = "score-card"
  span.class = "player-name"
  span.textContent = thisScore.player_name
  span2.clas = "score"
  span2.textContent = thisScore.score
  scoresArea.appendChild(p)
  p.appendChild(span)
  p.appendChild(span2)
}

var gCanvas = document.getElementById(`myCanvas`)
gCanvas.addEventListener('gameOver', gameIsOver)
function gameIsOver(){
  if (score < 14) {
    alert("wow i didn't think that was possible, a score of " + score)
  }else if (score == 14) {
    alert("14 is the lowest possible score if you got this you must be terrible, or testing")
  }else if (score > 14 && score <= 20) {
    alert("you're actually trying now and you got " + score + "? whatever i wont judge you, to your face that is")
  }else if (score > 20 && score <= 41){
    alert("congrats a score of " + score + " hope it fills you with a sense of pride and accomplisment")
  }else if (score == 42) {
    alert("a score of 42? who are you? CJ?")
  }else if (score > 42 && score <= 100) {
    alert(score + "! thats quite a bit, dont you have something important to get back too?")
  }else if (score > 100 && score <= 300) {
    alert("you ended the existence of " + score + " dont feel too bad i'm sure their family's will get compensation")
  }else if (score > 300) {
    alert(score + "... are you sure you're not cheating?")
  }
  
  fetch(`https://galvanize-leader-board.herokuapp.com/api/v1/leader-board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        game_name: 'GBP',
        player_name: document.querySelector('.big-input').value,
        score
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .catch(err => alert(err))
}
