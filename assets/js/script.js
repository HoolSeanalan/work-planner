//Variables used in functions for ease.
const dayJSON = 'savedDay';
const now = new Date();
const iToS = {
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen'
};

//Clears tasks and updates the day.
function newDate() {
    let newDay = [now];
    window.localStorage.setItem(dayJSON, JSON.stringify(newDay));
}

//Checks if the date needs to be updated and sets the date at the top of the page.
function checkDate() {
    let savedDay = JSON.parse(window.localStorage.getItem(dayJSON)) ?? [];
    let savedDate = new Date(savedDay[0]);

    if (now.getDate != savedDate.getDate||
        now.getMonth != savedDate.getMonth ||
        now.getFullYear != savedDate.getFullYear) {
            newDate();
    }

    document.getElementById("currentDay").innerHTML = now.toDateString();
}

//Checks the current hour and colors timeblocks accordingly.
function checkHour() {
    currentHour = now.getHours();
    for (i = 9; i<18; i++) {
        var hourBlock = document.getElementById("hour"+iToS[i]+"Text");
        if (i<currentHour) {
            hourBlock.classList.add("past");
        }
        else if (i=currentHour) {
            hourBlock.classList.add("present");
        }
        else if (i>currentHour) {
            hourBlock.classList.add("future");
        }
    }
}

//Displays the tasks saved in local storage.
function loadTasks() {
    let savedDay = JSON.parse(window.localStorage.getItem(dayJSON) ?? []);

    for (i = 9; i<18; i++) {
        document.getElementById("hour"+iToS[i]+"Text").innerHTML = savedDay[i-8] ?? "";
    }
}

//Saves the content of the timeblocks to local storage.
function save(hour) {
    let savedDay = JSON.parse(window.localStorage.getItem(dayJSON)) ?? [];
    let newText = document.getElementById("hour"+iToS[hour]+"Text").value;

    savedDay[hour-8] = newText;
    window.localStorage.setItem(dayJSON, JSON.stringify(savedDay));
}

//Assigns functions to the buttons.
document.getElementById("buttonNine").addEventListener("click", function() {save(9);});
document.getElementById("buttonTen").addEventListener("click", function() {save(10);});
document.getElementById("buttonEleven").addEventListener("click", function() {save(11);});
document.getElementById("buttonTwelve").addEventListener("click", function() {save(12);});
document.getElementById("buttonThirteen").addEventListener("click", function() {save(13);});
document.getElementById("buttonFourteen").addEventListener("click", function() {save(14);});
document.getElementById("buttonFifteen").addEventListener("click", function() {save(15);});
document.getElementById("buttonSixteen").addEventListener("click", function() {save(16);});
document.getElementById("buttonSeventeen").addEventListener("click", function() {save(17);});

//Updates the page on load.
window.onload = function() {
    checkDate();
    loadTasks();
    checkHour();
};