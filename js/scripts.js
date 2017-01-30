
var Alaska = new Country("Alaska", 1, "nw","no one");
var riskCountries = [Alaska, "North West Territory", "Alberta", "Ontario", "Quebec", "Western United States", "Eastern United States", "Central America", "Greenland"];

var newPlayer = new Player("Melvin", 1);
newPlayer.countryArray=["Alaska", "Ontario","NW US"];

var newTurn = new Turn(newPlayer);

function Game(countries, players) {
  // The Game class contains the player objects and the country objects
  this.countries = countries;
  this.players = players;
  this.playing = false;
};

function Player(playerName, playerId) {
  this.playerName = playerName;
  this.playerId = playerId;
  this.reinforcements = 0;
  this.countryArray = [];
  this.active = true;
};

function Country(countryName, countryId, continent, adjacent) {
  this.countryName = countryName;
  this.countryId = countryId;
  this.continent = continent;
  this.owner;
  this.unitCount = 0;
  this.adjacent = adjacent;
};

// begin Turn functions

function Turn(player) {
  this.currentPlayer = player;
  this.stage = 0;
  this.availableTroops = 0;
};

Turn.prototype.AssignTroops = function(){
  this.availableTroops = Math.floor(this.currentPlayer.countryArray.length / 3);
}


Turn.prototype.outputTroops = function () {

};

Game.prototype.setup = function() {
  var countriesIdArray = []
  for (var item = 0; item < this.countries.length; item++) {
    countriesIdArray.push(item);
  }
  var numberOfPlayers = this.players.length;
  var numberOfCountries = this.countries.length;
  console.log(numberOfCountries);
  var remainderCountries = numberOfCountries % numberOfPlayers;
  console.log(remainderCountries);
  var countriesPerPlayer = (numberOfCountries - remainderCountries) / numberOfPlayers;
  console.log(countriesPerPlayer);
  for (var playerIndex = 0; playerIndex < numberOfPlayers; playerIndex++) {
    for (var index = 0; index < countriesPerPlayer; index++) {
      var randomIndex = Math.floor(Math.random() * countriesIdArray.length);
      newCountryId = countriesIdArray[randomIndex];
      this.players[playerIndex].countryArray.push(this.countries[newCountryId]);
      this.countries[newCountryId].owner = this.players[playerIndex].playerName;
      countriesIdArray.splice(randomIndex,1);
      console.log("added " + this.countries[newCountryId].countryName + " to " + this.players[playerIndex].playerName);
    }
  }
  for (var remainder = 0; remainder < remainderCountries; remainder++) {
    var randomIndex = Math.floor(Math.random() * countriesIdArray.length);
    newCountryId = countriesIdArray[randomIndex];
    this.players[this.players.length-(remainder+1)].countryArray.push(this.countries[newCountryId]);
    this.countries[newCountryId].owner = this.players[this.players.length-(remainder+1)].playerName;
    countriesIdArray.splice(randomIndex,1);
    console.log("added " + this.countries[newCountryId].countryName + " to " + this.players[this.players.length-(remainder+1)].playerName);
  }
}

// end Turn functions


var Die = function (sides) {
    this.sides = sides || 6;  //Creates n-sided Die Object or 6 sided if no args
}

Die.prototype.roll = function () {
    return Math.floor((Math.random() * this.sides) + 1)//simulate roll
}

function battleRolls (numOfDice) {
    var rolls = []
    for (i = 0; i < numOfDice; i++) {
        var die = new Die();
        rolls.push(die.roll());//new roll into array of rolls
    }
    return rolls;
}

function battle (attackDice, defendDice) {  //pass number of dice for each player

    //create sorted array of rolls for attack and defense
    var attackRolls = battleRolls(attackDice).sort(function(a, b){return b-a});
    var defendRolls = battleRolls(defendDice).sort(function(a, b){return b-a});
    var armiesLost = [0, 0];//array of armiesLost

    for (i = 0; i < Math.min(attackRolls.length, defendRolls.length); i++) {
        if (attackRolls[i] > defendRolls[i]) {
            armiesLost[1] -= 1;//defense loses one army
        } else {
            armiesLost[0] -= 1;//attack loses one army
        }
    }

    return armiesLost;
}

//=====================================================

$(function() {
  // $(".clickable-space").click(function() {
    var spaceClicked = $(this).attr('id');//get country id of clicked space
  //   console.log(spaceClicked);
  // })

  $('.clickable-space').click(function(){
    if(newTurn.availableTroops > 0){
      var spaceClicked = $(this).attr('id');
      riskCountries[spaceClicked].unitCount++;
      $(this).children("span").text(riskCountries[spaceClicked].unitCount);
    }

  })

  $('#next-turn').click(function() {
    var newTurn = new Turn()
  })
})
