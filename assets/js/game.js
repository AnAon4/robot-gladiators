//game states
//"win" - player robot has defeated all enemy robots
//  * fight all enemy robots
//  * defeat each enemy robots
//"lose" - player robot's health is zero or less

var fight = function (enemy) {
    console.log(enemy);
    while (enemy.health > 0 && playerInfo.health > 0) {
        //ask user if they's like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if user picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("are you sure you'd like to skip?");

                // if yes, leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight . Goodbye!");
                // subtract money from playerInfo.Money for skipping
                playerInfo.Money = Math.max(0, playerInfo.Money - 5);
                console.log("playerInfo.Money", playerInfo.Money);
                break;
            }
        };

        //generate random damage value based on players attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + " . " + enemy.name + " now has " + enemy.health + "health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! ");
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left. ")
        }

        //generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + " . " + playerInfo.name + " now has " + playerInfo.health + "health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died! ");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left. ")
        }
    }
};

var shop = function () {
    //ask mplayer what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    //use switch to carry out action
    switch (shopOptionPrompt) {

        case "REFILL":
        case "refill":
           playerInfo.refillHealth();
            break;

        case "UPGRADE":    
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        case "leave":
        case "leave":
            window.alert("leaving the store.")

            //do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.")

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

//function to end the entire game
var endGame = function () {
    //if player is still alive , player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.Money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    //ask player if theyd like to playagain
    var playAgainConfirm = window.confirm("Would you like to play again?")
    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }

};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

//function to start a new game
var startGame = function () {
    //reset player stats
    playerInfo.reset()
    for (var i = 0; i < enemyInfo.length; i++) {
        //debugger
        if (playerInfo.health > 0) {

            //let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + " " + (enemyInfo[i].name));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            //reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            enemyAttack = randomNumber(10, 14)

            //use debugger to pause script from running and check what's going on at that moment in the code
            //debugger:

            //pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if the user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store() funtion
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 5) {
            window.alert("Refilling player's health by 20 for 5 dollars.")
            this.health += 20;
            this.money -= 5;
        }
        else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 5) {
            window.alert("Upgrading player's attack power by 10 for 5 dollars.")
            this.attack += 10;
            this.money -= 5;
        }
        else {
            window.alert("You don't have enough money!")
        }   
    }
};

// You can also log multiple valies at once like this
console.log(playerInfo);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();
