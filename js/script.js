// word

const tab = ["pudełko", "obwarzanek", "YouTube", "Łączność", "Francja", "Świtezianka", "Algorytmika", "Kocham piwo", "Idzie luty - ubierz buty"];
var word = tab[getRandomInt(0, tab.length)].toUpperCase();
const content = document.querySelector(".content");

let endWord = document.querySelectorAll(".endWord");
endWord.forEach(element => {
    element.innerHTML = `${word}`;
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const asciiPolskieZnaki = ['Ą','Ć','Ę','Ł','Ń','Ó','Ś','Ź','Ż'];

function isLetter(c) {
    if((/[a-zA-Z]/).test(c) || asciiPolskieZnaki.includes(c.toUpperCase()))
    {
        return true;
    }
    else{
        return false;
    }
}

let n = word.length;
const wordContainer = document.querySelector(".word");
for(let i = 0; i<n; i++)
{
    let el = document.createElement("p");
    if(isLetter(word[i]))
    {
        el.innerHTML = "_";
        el.classList.add(`${word[i]}`);
        el.classList.add(`p`);
    }
    else{
        el.innerHTML = `${word[i]}`;
    }
    wordContainer.appendChild(el);
}


// keyboard

var licznik = 0;

const keyboardContainer = document.querySelector(".keyboard");

for(let x=97;x<=122;x++)
{
    let el = document.createElement("p");
    let a = String.fromCharCode(x).toUpperCase();
    el.innerHTML = `${a}`;
    keyboardContainer.appendChild(el);
    el.classList.add(`${a}`);
    el.onclick = check;
}

for(let i=0;i<asciiPolskieZnaki.length;i++)
{
    let el = document.createElement("p");
    let a = asciiPolskieZnaki[i].toUpperCase();
    el.innerHTML = `${a}`;
    keyboardContainer.appendChild(el);
    el.classList.add(`${a}`);
    el.onclick = check;
}


// check

function check(){
    let letter = this.innerHTML;
    if(word.includes(letter)){
        this.style.backgroundColor = "green";
        let elements = document.querySelectorAll(`.${letter}`);
        elements.forEach(element => {
            element.innerHTML = `${letter}`;
        });
        this.style.cursor = "not-allowed";
        win();
    }
    else{
        if(this.style.cursor != "not-allowed")
        {
            if(licznik < 10)
            {
                this.style.backgroundColor = "red";
                licznik += 1;
                let img = document.querySelector(`#w${licznik}`);
                clearDisplayImg();
                img.style.display = "block";
                this.style.cursor = "not-allowed";
            }
            else{
                over();
            }
        }
    }
}

function clearDisplayImg(){
    for(let i =0; i<11; i++)
    {
        let img = document.querySelector(`#w${i+1}`);
        img.style.display = "none";
    }
}

// end

function over(){
    let img = document.querySelector(`#w11`);
    clearDisplayImg();
    img.style.display = "block";
    //alert("Game over!");
    let over = document.querySelector(".gameOver");
    over.style.display = "block";
    content.style.display = "none"; 
    endWord.forEach(element => {
        element.style.color = `red`;
    });

}


for(let i = 0; i<word.length; i++)
{
    if(!isLetter(word[i]))
    {
        word = word.replace(word[i], " ");
    }
}
word = word.replace(/\s/g, '');

function win(){
    let isWin = 0;
    let elements = document.querySelectorAll(`.p`);
    elements.forEach(element => {
        if(element.innerHTML != "_"){
            isWin += 1;
        }
    });
    if(isWin == word.length){
        //alert("Win");
        let win = document.querySelector(".win");
        win.style.display = "block";
        content.style.display = "none"; 
        endWord.forEach(element => {
            element.style.color = `green`;
        });
    }
}