let playerTurnText = document.getElementById('playerTurnText')
let restartButton = document.getElementById('restartButton')
let winningMessageText = document.getElementById('winningMessageText')
let cells = Array.from(document.getElementsByClassName('cell')) //גורם לכל התאים שבפנים להתנהג כמו מערך, כולל את כל התאים


let winningCombColor = getComputedStyle(document.body).getPropertyValue('--winningComb') // משיכה ל-JS - CSS


const PLAYER_O_TEXT = "O"
const PLAYER_X_TEXT = "X"
let = currPlayer = PLAYER_X_TEXT 
let occupancy = Array(9).fill(null) // יצירת מערך עם ערך null
playerTurnText.innerHTML = "Turn " + currPlayer


//פונקציות

const winningComb = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
] 

const startGame = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked)) //  לולאה - לכל תא מה אני רואה שיקרה לובעת לחיצה תופעל הפונקציה cellClicked
}

restartButton.addEventListener('click', restartClicked)


function cellClicked(e)//שרשרת של פעולות שיקרו בעת לחיצה על תא - לוודא שהתור שלי, שהתא לא תפוס, ובדיקה האם ניצחון
{
    const id=e.target.id
    if(!occupancy[id]) // אם הוא ריק - נרצה להכניס ערך של השחקן
    {
        occupancy[id] = currPlayer // הכנסת הערך למערך מאחורי הקלעים
        e.target.innerHTML = currPlayer // מגיעים לתוך התוכן של התא עצמו ויכולים לשנות את הערך שלו
    }

    if(ifHasWon()){
        winningMessageText.innerHTML =  " The Winner is "+ currPlayer +" !"
        cells.forEach(cell => cell.removeEventListener('click', cellClicked))//הורדת האפשרות להפעיל את הפונקציה 
        let WinningComb = ifHasWon();
        WinningComb.forEach(cell => cells[cell].style.color = winningCombColor)
    }

    currPlayer = currPlayer == PLAYER_X_TEXT ? PLAYER_O_TEXT : PLAYER_X_TEXT // עדכון התור - כתיבה של עדכון משתנה על בסיס תנאי מסויים
    playerTurnText.innerHTML = "Turn " + currPlayer

}


function ifHasWon(){
    for(const comb of winningComb)//ריצה על כל המערכים
    {
        let[a,b,c] = comb 
        
        if(occupancy[a] == currPlayer && occupancy[b] == currPlayer && occupancy[c] == currPlayer)
        {
            return [a, b,c]
        }
        
    }
    return false
}


function restartClicked(){
    occupancy.fill(null)
    cells.forEach(cell => {
        cell.innerText = '' 
        cell.style.color =''
    } )

    winningMessageText.innerHTML ='' // מטיפוס שורת כתיבה ולכן HTML
    startGame()
}

startGame()