
//Age in days
function AgeInDays(){
    let birthYear = prompt('What is your birth year');
    let resultclassName = 'flex-box-result';
    let ageindays = calculateAge(birthYear,getCurrentYear());
    
    if(ageindays <= 0 || ageindays===false){
        alert('Incorrect date!! ')
    }
    else{
        ageindays = ageindays * 360;
        createResultDiv(ageindays,resultclassName);
    }
}

function calculateAge(birthYear,currentYear){
    let birthYearInt = parseInt(birthYear);

    console.log((Math.sign(birthYearInt)));
    console.log((Math.sign(birthYearInt) && Number.isInteger(birthYearInt)));
    console.log(birthYearInt < currentYear && positiveNumber(birthYearInt) && Number.isInteger(birthYearInt));
    if((birthYearInt < currentYear) && (positiveNumber(birthYearInt) && Number.isInteger(birthYearInt))==true){
        let ageInDays = (currentYear - birthYearInt);
        return ageInDays;
    }
    else{
        return false;
    }
}

function createResultDiv(content,classname){
    let h1 = document.createElement('h1');
    let textanswer = document.createTextNode('Your are ' + content + ' days old');
    h1.setAttribute('id','ageindays');
    h1.appendChild(textanswer);
    document.getElementById(classname).appendChild(h1);

}

function getCurrentYear(){
    var date = new Date();
    var currentYear = date.getFullYear();
    return currentYear;
}

function reset(){
    document.getElementById('ageindays').remove();
}

function positiveNumber(number){
    if(Math.sign(number)===1){
        return true;
    }
    else{
        return false;
    }
}


//Change colors
let all_btns = document.getElementsByTagName('button') ;
let copyAllbtns = [];
for(let i = 0; i<all_btns.length; i++){
    copyAllbtns.push(all_btns[i].classList[1]);
}


function btnColorChange(BtnColorSel){
    if(BtnColorSel.value=='red'){
        buttonRed();
    }
    else if (BtnColorSel.value=='green'){
        buttonGreen();
    }
    else if (BtnColorSel.value=='reset'){
        buttonColorReset();
    }
    else if (BtnColorSel.value='random'){
        randomColors();
    }
}

function buttonRed(){
    for(i=0; i < all_btns.length; i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i<all_btns.length;i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for (i=0;i<all_btns.length;i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(copyAllbtns[i]);
    }
}

function randomColors(){
    let choice = ['btn-success', 'btn-primary', 'btn-danger','btn-warning'];
    for(i=0;i<all_btns.length;i++){
        all_btns[i].classList.remove(all_btns[i].classList[1]);
        all_btns[i].classList.add(choice[Math.floor(Math.random()*4)]);
    }
}