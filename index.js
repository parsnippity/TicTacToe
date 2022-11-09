"use strict";
let turn = "X";
let ties = Number(document.getElementById("ties").innerHTML);
let exWins = Number(document.getElementById("exWins").innerHTML);
let ohWins = Number(document.getElementById("ohWins").innerHTML);
let gameOver = false;
let exTaken = [];
let ohTaken = [];
//Names each box and its border details, clockwise.
const spaces = [['topLeft', '5px solid rgba(200, 191, 231, 0)', '5px solid black', '5px solid black', '5px solid rgba(200, 191, 231, 0)'], ['topMiddle', '5px solid rgba(200, 191, 231, 0)', '5px solid black', '5px solid black', '5px solid black'], ['topRight', '5px solid rgba(200, 191, 231, 0)', '5px solid rgba(200, 191, 231, 0)', '5px solid black', '5px solid black'], ['middleLeft', '5px solid black', '5px solid black', '5px solid black', '5px solid rgba(200, 191, 231, 0)'], ['middle', '5px solid black', '5px solid black', '5px solid black', '5px solid black'], ['middleRight', '5px solid black', '5px solid rgba(200, 191, 231, 0)', '5px solid black', '5px solid black'], ['bottomLeft', '5px solid black', '5px solid black', '5px solid rgba(200, 191, 231, 0)', '5px solid rgba(200, 191, 231, 0)'], ['bottomMiddle', '5px solid black', '5px solid black', '5px solid rgba(200, 191, 231, 0)', '5px solid black'], ['bottomRight', '5px solid black', '5px solid rgba(200, 191, 231, 0)', '5px solid rgba(200, 191, 231, 0)', '5px solid black']];
//Lists the boxes required for a winning row, in nested arrays.
const winnings = [['topLeft', 'topMiddle', 'topRight'], ['middleLeft', 'middle', 'middleRight'], ['bottomLeft', 'bottomMiddle', 'bottomRight'], ['topLeft', 'middleLeft', 'bottomLeft'], ['topMiddle', 'middle', 'bottomMiddle'], ['topRight', 'middleRight', 'bottomRight'], ['topLeft', 'middle', 'bottomRight'], ['topRight', 'middle', 'bottomLeft']];

//A function called when any one of the boxes is clicked, with the name of the box passed to it as a parameter.
function boxClicked(boxName) {
    switch (turn) {
        //Runs if it is X's turn.
        case "X":
            //Changes the picture in the box to an X.
            document.getElementById(boxName).setAttribute("src", "./ex.png");
            //Removes the "onclick", so the box can't be clicked again.
            document.getElementById(boxName).removeAttribute("onclick");
            //Adds the box to the list of boxes with Xs in them, sets the "turn" variable to O, and changes the turn header color to O's color.
            exTaken.push(boxName);
            turn = "O";
            document.getElementById("turnHeader").style.color = "rgb(0,162,232)";
            break;
        //Runs if it is O's turn.
        case "O":
            //Changes the picture in the box to an O.
            document.getElementById(boxName).setAttribute("src", "./oh.png");
            //Removes the "onclick", so the box can't be clicked again.
            document.getElementById(boxName).removeAttribute("onclick");
            //Adds the box to the list of boxes with Os in them, sets the "turn" variable to X, and changes the turn header color to X's color.
            ohTaken.push(boxName);
            turn = "X";
            document.getElementById("turnHeader").style.color = "rgb(63,72,204)";
            break;
        default:
            break;
    }
    //Sets the turn value on the page to the turn variable's value.
    document.getElementById("turn").innerHTML = turn;
    for(let i = 0; i < winnings.length; i++){
        switch(true){
            //Runs if the list of boxes with Xs in them includes any three boxes that are a winning row, as listed in the "winnings" array.
            case exTaken.includes(winnings[i][0]) && exTaken.includes(winnings[i][1]) && exTaken.includes(winnings[i][2]):
                //Changes the color of the header and displays who won.
                turn = "X";
                document.getElementById("turnHeader").style.color = "rgb(63,72,204)";
                document.getElementById("turn").innerHTML = turn;
                document.getElementById("turnHeaderEnd").innerHTML = " wins! Good job, " + turn + "!";
                //Adds one to the count of X's wins.
                document.getElementById("exWins").innerHTML = exWins + 1;
                //Highlights the boxes in the winning row by changing their border color.
                document.getElementById(winnings[i][0]).style.border = "5px solid rgb(163,73,164)";
                document.getElementById(winnings[i][1]).style.border = "5px solid rgb(163,73,164)";
                document.getElementById(winnings[i][2]).style.border = "5px solid rgb(163,73,164)";
                gameOver = true;
                //Removes the "onclick" from all of the boxes, unless they have already been clicked and therefore have already had it removed.
                for(let j = 0; j < spaces.length; j++){
                    switch (true) {
                        case exTaken.includes(spaces[j][0]) || ohTaken.includes(spaces[j][0]):
                            break;
                        default:
                            document.getElementById(spaces[j][0]).removeAttribute("onclick");
                            break;
                    }
                }
                break;
            //Runs if the list of boxes with Os in them includes any three boxes that are a winning row, as listed in the "winnings" array.
            case ohTaken.includes(winnings[i][0]) && ohTaken.includes(winnings[i][1]) && ohTaken.includes(winnings[i][2]):
                //Changes the color of the header and displays who won.
                turn = "O";
                document.getElementById("turnHeader").style.color = "rgb(0,162,232)";
                document.getElementById("turn").innerHTML = turn;
                document.getElementById("turnHeaderEnd").innerHTML = " wins! Good job, " + turn + "!";
                //Adds one to the count of O's wins.
                document.getElementById("ohWins").innerHTML = ohWins + 1;
                //Highlights the boxes in the winning row by changing their border color.
                document.getElementById(winnings[i][0]).style.border = "5px solid rgb(163,73,164)";
                document.getElementById(winnings[i][1]).style.border = "5px solid rgb(163,73,164)";
                document.getElementById(winnings[i][2]).style.border = "5px solid rgb(163,73,164)";
                gameOver = true;
                //Removes the "onclick" from all of the boxes, unless they have already been clicked and therefore have already had it removed.
                for(let j = 0; j < spaces.length; j++){
                    switch (true) {
                        case exTaken.includes(spaces[j][0]) || ohTaken.includes(spaces[j][0]):
                            break;
                        default:
                            document.getElementById(spaces[j][0]).removeAttribute("onclick");
                            break;
                    }
                }
                break;
            //Runs if all the boxes are filled and no one has won yet.
            case ohTaken.length + exTaken.length == 9 && gameOver == false:
                //Displays that the game is a tie, changes the color of the header, and adds one to the count of ties.
                document.getElementById("turn").innerHTML = "";
                document.getElementById("turnHeaderEnd").innerHTML = "It's a tie!";
                document.getElementById("turnHeader").style.color = "rgb(163,73,164)";
                document.getElementById("ties").innerHTML = ties + 1;
                break;
            default:
                break;
        }
    }
}
//Runs if the user clicks the "play again" button.
function resetBoard() {
    //Resets all of the variables.
    turn = "X";
    exTaken = [];
    ohTaken = [];
    gameOver = false;
    ties = Number(document.getElementById("ties").innerHTML);
    exWins = Number(document.getElementById("exWins").innerHTML);
    ohWins = Number(document.getElementById("ohWins").innerHTML);
    //Resets the text on the website.
    document.getElementById("turn").innerHTML = turn;
    document.getElementById("turnHeaderEnd").innerHTML = "'s Turn!";
    document.getElementById("turnHeader").style.color = "rgb(63,72,204)";
    //Goes through each of the boxes and resets their image, onclick, and border.
    for(let i = 0; i < spaces.length; i++){
        document.getElementById(spaces[i][0]).setAttribute("src", "./blank.png");
        document.getElementById(spaces[i][0]).setAttribute("onclick", `boxClicked("` + spaces[i][0] + `")`);
        document.getElementById(spaces[i][0]).style.borderTop = spaces[i][1];
        document.getElementById(spaces[i][0]).style.borderRight = spaces[i][2];
        document.getElementById(spaces[i][0]).style.borderBottom = spaces[i][3];
        document.getElementById(spaces[i][0]).style.borderLeft = spaces[i][4];
    }
}