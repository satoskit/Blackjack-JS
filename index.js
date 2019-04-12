new Vue ({
  el: "#app",
  data: {
    deck: [],
    suits: [ "HEARTS", "SPADES", "DIAMONDS", "CLUBS" ],
    card: null,
    canPlay: true,
      playerHand: [],
      playerHandCopy: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
    canDraw: true,
    toFinish: true
  },
  created(){
    let newDeck = this.createAndShuffleDeck()
    this.deck = newDeck
  },
  methods: {
    createAndShuffleDeck() {
      for(let i = 0; i < this.suits.length; i++){
        for(let j = 1; j <= 13; j++){
          let o = {suit: this.suits[i], value: j}
          this.deck.push(o)
        }
      }
      let counter = 0
      for (let i = 0; i < this.deck.length; i++) {
        let random = Math.floor(Math.random() * this.deck.length)
        this.card = this.deck[random]
        this.deck[random] = this.deck[counter]
        this.deck[counter] = this.card
        counter++
      }
      console.log(this.deck.length);
      return this.deck
    },
    startClicked(){
      if(this.deck.length !== 52){
        this.deck = []
        this.deck = this.createAndShuffleDeck()
      }
      console.log(this.deck);
      console.log("something");
      if(this.playerHand !== null){
        this.playerHand = []
        this.dealerHand = []
        this.playerScore = 0
        this.dealerScore = 0
      }
      for(let i = 0; i < 2; i++){
        this.drawACard(this.playerHand, this.playerScore)
        this.drawACard(this.dealerHand, this.dealerScore)
      }
      this.playerScore = this.score2(this.playerHand/*, this.playerScore*/)
      this.dealerScore = this.score2(this.dealerHand/*, this.dealerScore*/)

      console.log(this.deck.length);
      console.log(this.playerScore);
      this.canDraw = false
      this.toFinish = false

      // this.playerHandCopy = [...playerHand]
      // this.dealder
    },
    hitClicked(){
      this.drawACard(this.playerHand, this.playerScore)
      this.playerScore = this.score2(this.playerHand/*, this.playerScore*/)
      if(this.playerScore > 21){
        this.canDraw = true
        this.toFinish = true
        this.sleep(1000).then(() => {
          alert("Your Score: " + this.playerScore + "\nYou loose!")
        })
      }
    },
    standClicked(){
      this.dealerScore = this.score2(this.dealerHand/*, this.dealerScore*/)
      while(this.dealerScore <= 17){
        this.drawACard(this.dealerHand, this.dealerScore)
        this.dealerScore = this.score2(this.dealerHand/*, this.dealerScore*/)
      }
      alert("Your Score: "+ this.playerScore + ", Dealer's Score: "+ this.dealerScore)
      if((this.dealerScore !== 21 && this.playerScore === 21)||
          (this.dealerScore > 21 && this.playerScore <= 21)||
          (this.dealerScore < 21 && this.playerScore < 21 && this.playerScore > this.dealerScore)){
        alert("You win!")
      } else if((this.dealerScore <= 21 && this.playerScore > 21)||
          (this.dealerScore === 21 && this.playerScore !== 21)||
          (this.dealerScore < 21 && this.playerScore < 21 && this.playerScore < this.dealerScore)){
        alert("You loose!")
      } else{
        alert("Even!")
      }
      this.canDraw = true
      this.toFinish = true
    },
    drawACard(someArray, someScore) {
      let card = this.deck.shift()
      someArray.push(card)
    },
    score2(arr/*, score*/) {
      this.unprettifyCard(arr)
      let points = /*score */ 0
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value === 1){
          points += 11
        }
        else if(arr[i].value >= 10 && (arr[i].value <= 13)) {
          points += 10
        }
        else {
          points += arr[i].value
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if(points > 21 && arr[i].value === 1) {
          points -= 10
        }
      }
      return points
    },
    prettyCard(obj) {
        let someSuit = obj.suit
        let someValue = obj.value
        if((typeof obj.value === "number") && (typeof obj.suit === "string") ) {
          if(someSuit === "HEARTS" || someSuit === "hearts") {
              obj["suit"] = "♥"
          }
          else if(someSuit === "SPADES" || someSuit === "spades") {
              obj["suit"] = "♠"
          }
          else if(someSuit === "DIAMONDS" || someSuit === "diamonds") {
              obj["suit"] = "♦"
          }
          else if(someSuit === "CLUBS" || someSuit === "clubes") {
              obj["suit"] = "♣"
          }

          if(someValue === 10) {
              obj["value"] = "T"
          }
          else if(someValue === 11) {
              obj["value"] = "J"
          }
          else if(someValue === 12) {
              obj["value"] = "Q"
          }
          else if(someValue === 13) {
              obj["value"] = "K"
          }
          else if(someValue === 1) {
              obj["value"] = "A"
          }
          else {
              obj["value"] = String(someValue)
          }
       }
        return obj.value + obj.suit
    },
    unprettifyCard(arr){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].value === "T" || arr[i].value === "J" ||
            arr[i].value === "Q" || arr[i].value === "K"){
          arr[i].value = 10
        } else if(arr[i].value === "A"){
          arr[i].value = 1
        } else {
          arr[i].value = Number(arr[i].value)
        }
      }
      return arr
    },
    sleep(seconds){
      return new Promise((resolve) => setTimeout(resolve, seconds))
    }
  },

})
