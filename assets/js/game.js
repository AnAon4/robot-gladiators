//game states
//"win" - player robot has defeated all enemy robots
//  * fight all enemy robots
//  * defeat each enemy robots
//"lose" - player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple valies at once like this
console.log(playerName, playerAttack, playerHealth);


var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        //ask user if they's like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        //if user picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("are you sure you'd like to skip?");

            if (playerMoney >= 5) {

                // if yes, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight . Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 5;
                console.log("playerMoney", playerMoney);
                break;
            }
            }
        };

        // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + "health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died! ");
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left. ")
        }

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and us the rsult to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + " . " + playerName + " now has " + playerHealth + "health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died! ");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left. ")
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
            if (playerMoney >= 5) {
                window.alert("Refilling player's health by 20 for 5 dollars.");

                //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 5;
            }
            else {
                window.alert("You don't have enough money!")
            }

            break;

        case "UPGRADE":    
        case "upgrade":
            if (playerMoney >= 5) {
                window.alert("Increasing players attack by 10 for 5 dollars.");

                //upgrade attack and decrease money
                playerAttack = playerAttack + 10;
                playerMoney = playerMoney - 5; 
            }
            else {
                window.alert("you don't have neough money!")
            }
            
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
        window.alert("Thabk you for playing Robot Gladiators! Come back soon!")
    }

};

//function to start a new game
var startGame = function () {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        debugger
        if (playerHealth > 0) {

            //let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + " " + (enemyNames[i]));

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            //reset enemyHealth before starting new fight
            enemyHealth = 50;

            //use debugger to pause script from running and check what's going on at that moment in the code
            //debugger:

            //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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

startGame();
