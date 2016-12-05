var inquirer = require("inquirer");

function Players(name, position){
	this.name = name;
	this.position = position;
	this.offense = Math.floor(Math.random() * 10 + 1);
	this.defense = Math.floor(Math.random() * 10 + 1);
	this.goodGame = function(){
		if (Math.floor(Math.random() * 2) === 0) {
      this.offense++;
      console.log(this.name + "'s offense has gone up!\n----------");
    }
    else {
      this.defense++;
      console.log(this.name + "'s defense has gone up!\n----------");
    }
	};
	this.badGame = function(){
		if (Math.floor(Math.random() * 2) === 0) {
      this.offense--;
      console.log(this.name + "'s offense has gone down!\n----------");
    }
    else {
      this.defense--;
      console.log(this.name + "'s defense has gone down!\n----------");
    }
	};
	this.printStats = function(){
		console.log("Name: " + this.name + "\nPosition: " + this.position + "\nOffense: " + this.offense + "\nDefense: " + this.defense);
	}
}/*
Players.prototype.printInfo = function(){
	console.log("Name: " + this.name + "\nPosition: " + this.position + "\nOffense: " + this.offense + "\nDefense: " + this.defense);
};*/
var count = 0;
var starterArray = [];
var subArray = [];
//var team = [];
var theStarters = function(){
	if(count < 5){
		console.log("New Starter");
		inquirer.prompt([
		{
			name: "name",
			message: "What is the starter's name?"
		},
		{
			name: "position",
			message: "What is the starter's position?"
		}
		]).then(function(starters){
			var starterBro = new Players(starters.name, starters.position);
			starterArray.push(starterBro);
			//team.push(starterBro);
			count++;
			theStarters();
		});
	} else if(count < 8){
		console.log("New Sub");
		inquirer.prompt([
		{
			name: "name",
			message: "What is the sub's name?"
		},
		{
			name: "position",
			message: "What is the sub's position?"
		}
		]).then(function(subs){
			var subBro = new Players(subs.name, subs.position);
			subArray.push(subBro);
			//team.push(subBro);
			count++;
			theStarters();
		})
	} else {
		for(var x = 0; x < starterArray.length; x++){
			starterArray[x].printStats();
			console.log("----------");
		}
		for(var y = 0; y < subArray.length; y++){
			subArray[y].printStats();
			console.log("----------");
		}	
		playGame(0);
	}
}
theStarters();
var score = 0;
function playGame(z) {
	if (z < 9){
		z++;
		console.log("----------\nROUND " + z + "\n----------");
		var firstRNG = Math.floor(Math.random()*50 + 1);
		var secondRNG = Math.floor(Math.random()*50 + 1);
		var totalOffense = 0;
		var totalDefense = 0;
		for(var j = 0; j < starterArray.length; j++){
			totalOffense += starterArray[j].offense;
			totalDefense += starterArray[j].defense;
		}
		console.log("Team Offense: " + totalOffense);
	    console.log("Team defense: " + totalDefense);
	    console.log("Random O: " + firstRNG);
	    console.log("Random D: " + secondRNG);
		if(firstRNG < totalOffense){
				score ++;
				console.log("You scored a point!");
		}
		if(secondRNG > totalDefense){
				score --;
				console.log("You were scored upon!");
		}
		//subPlayer();
		inquirer.prompt([
		{
			type: "confirm",
				message: "Do you want to sub a starter out?",
				name: "confirmSub",
				default: true
		}
		]).then(function(user){
			if(user.confirmSub){
				inquirer.prompt([
				{
					type: "rawlist",
						message: "Choose a starter to swap out",
						choices: starterArray,
						name: "substarter"
				}
				]).then(function(input){
					var sideline = {};
					var number = 0;
					for (var l = 0; l < starterArray.length; l++){
						if(starterArray[l].name === input.substarter){
							number = l;
							sideline = starterArray[l];
						}
					}
					inquirer.prompt([
					{
					type: "rawlist",
						message: "Choose a sub to swap in",
						choices: subArray,
						name: "subsub"
					}
					]).then(function(output){
					for (var l = 0; l < subArray.length; l++){
						if(subArray[l].name === output.subsub){
							starterArray[number] = subArray[l];
							subArray[l] = sideline;
							console.log("Substitution was made");
						}
					}
					playGame(z);
					});
				});
			} else {
				playGame(z);
			}
		});
	} else {
		console.log("FINAL SCORE: " + score);
		if (score > 0){
			console.log("Good game, everyone!\nYour current starters' stats have improved!");
			for(var a = 0; a < starterArray.length; a ++){
				starterArray[a].goodGame();
			}
		}
		if (score < 0){
			console.log("That was a poor performance!\nYour current starters' stats have decreased!");
			for(var b = 0; b < starterArray.length; b ++){
				starterArray[b].badGame();
			}
		}
		if (score === 0){
			console.log("Tie game.");
		}
		inquirer.prompt(
		{
			name: "again",
			type: "confirm",
			message: "Play again?"
		}).then(function(answer){
			if(answer.again === true){
				playGame(0);
			}
			else{
				console.log("Thanks for playing!");
			}
		});
	}
	
}