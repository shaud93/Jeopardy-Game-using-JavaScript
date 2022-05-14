

let categories = [];
const MainDiv = document.querySelector("#MainDiv");
const StartButton = document.querySelector("#Button");
const ResetButton = document.querySelector("#Rbutton");
let CatId = [];

let test0 = 0;
let test1 = 0;
let test2 = 0;
let test3 = 0;
let test4 = 0;
let test5 = 0;


let QuestionBox = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
];

let AnswerBox = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
];

let box = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
];


StartButton.addEventListener("click", StartGame);



async function createTable() {
    //Creates Header Table
    let Header = document.createElement("table");
    let Hrow = document.createElement("tr");
    for (i = 0; i <= 5; i++) {
        const Api = await GetApi();
        let Hcol = document.createElement("th");
        categories[i] = Api.data[0].category;
        Hcol.innerHTML = categories[i].title;
        CatId[i] = categories[i].id;
        Hrow.appendChild(Hcol);
    }

    Header.appendChild(Hrow);
    MainDiv.appendChild(Header)

    //Creates Main Table
    for (i = 0; i < 5; i++) {
        let Trow = document.createElement("tr");

        for (z = 0; z < 6; z++) {
            let Tcol = document.createElement("td");
            QuestionBox[i][z] = Tcol;
            Trow.appendChild(Tcol);

        }

        Header.appendChild(Trow);
        MainDiv.appendChild(Header);
    }

    Placein();

}

//returns Api Url
async function GetApi() {
    let resource = await axios.get("https://jservice.io/api/random");
    //console.log(resource)
    return resource;
}

async function Placein() {
    for (i = 0; i < 5; i++) {


        //collum 0
        Temp0 = await axios.get(`http://jservice.io/api/category?id=${CatId[0]}`);
        console.log(Temp0.data.clues[0].question);
        QuestionBox[i][0].setAttribute( "id",`${[i]}-${[0]}`);
        box[i][0] = Temp0.data.clues[i].question;

        //collum 1
        Temp1 = await axios.get(`http://jservice.io/api/category?id=${CatId[1]}`);
        QuestionBox[i][1].setAttribute( "id",`${[i]}-${[1]}`);
        box[i][1] = Temp1.data.clues[i].question;

        //collum 2
        Temp2 = await axios.get(`http://jservice.io/api/category?id=${CatId[2]}`);
        QuestionBox[i][2].setAttribute( "id",`${[i]}-${[2]}`);
        box[i][2] = Temp2.data.clues[i].question;

        //collum 3
        Temp3 = await axios.get(`http://jservice.io/api/category?id=${CatId[3]}`);
        QuestionBox[i][3].setAttribute( "id",`${[i]}-${[3]}`);
        box[i][3] = Temp3.data.clues[i].question;

        //collum 4
        Temp4 = await axios.get(`http://jservice.io/api/category?id=${CatId[4]}`);
        QuestionBox[i][4].setAttribute( "id",`${[i]}-${[4]}`); 
        box[i][4] = Temp4.data.clues[i].question;

        //collum 5
        Temp5 = await axios.get(`http://jservice.io/api/category?id=${CatId[5]}`);
        QuestionBox[i][5].setAttribute( "id",`${[i]}-${[5]}`);
        box[i][5] = Temp5.data.clues[i].question;

        //Test collums
        test0 = await axios.get(`http://jservice.io/api/category?id=${CatId[0]}`);
        test1 = await axios.get(`http://jservice.io/api/category?id=${CatId[1]}`);
        test2 = await axios.get(`http://jservice.io/api/category?id=${CatId[2]}`);
        test3 = await axios.get(`http://jservice.io/api/category?id=${CatId[3]}`);
        test4 = await axios.get(`http://jservice.io/api/category?id=${CatId[4]}`);
        test5 = await axios.get(`http://jservice.io/api/category?id=${CatId[5]}`);

        //Store the answer to each box
        AnswerBox[i][0] = await Temp0.data.clues[i].answer;
        AnswerBox[i][1] = await Temp1.data.clues[i].answer;
        AnswerBox[i][2] = await Temp2.data.clues[i].answer;
        AnswerBox[i][3] = await Temp3.data.clues[i].answer;
        AnswerBox[i][4] = await Temp4.data.clues[i].answer;
        AnswerBox[i][5] = await Temp5.data.clues[i].answer;

        QuestionBox[i][0].innerText = "?";
        QuestionBox[i][1].innerText = "?";
        QuestionBox[i][2].innerText = "?";
        QuestionBox[i][3].innerText = "?";
        QuestionBox[i][4].innerText = "?";
        QuestionBox[i][5].innerText = "?";


    }
}


async function StartGame()
{
  
    StartButton.style.visibility = "Hidden";
    $(document).load.show
    createTable();
    MainDiv.addEventListener("click", function(e) {GetAnswers(e)});
    ResetButton.addEventListener("click", Reset);
}

function GetAnswers(event)
{
console.log(event.target);
console.log(event.target.id);



for (i = 0; i < 5; i++) 
   {
       if(event.target.innerText ===  QuestionBox[i][0].innerText && event.target.id === "Go") {QuestionBox[i][0].innerHTML = AnswerBox[i][0]};
       if(event.target.innerText ===  QuestionBox[i][1].innerText && event.target.id === "Go") {QuestionBox[i][1].innerHTML = AnswerBox[i][1]};
        if(event.target.innerText === QuestionBox[i][2].innerText && event.target.id === "Go") {QuestionBox[i][2].innerHTML = AnswerBox[i][2]};
        if(event.target.innerText === QuestionBox[i][3].innerText && event.target.id === "Go") {QuestionBox[i][3].innerHTML = AnswerBox[i][3]};
        if(event.target.innerText === QuestionBox[i][4].innerText && event.target.id === "Go") {QuestionBox[i][4].innerHTML = AnswerBox[i][4]};
        if(event.target.innerText === QuestionBox[i][5].innerText && event.target.id === "Go") {QuestionBox[i][5].innerHTML = AnswerBox[i][5]};
    }


for (i = 0; i < 5; i++) 
    {
        if((event.target.id === `${[i]}-${[0]}`) && (event.target.innerText === "?")) {QuestionBox[i][0].innerText = box[i][0]; QuestionBox[i][0].setAttribute( "id","Go")};
        if(event.target.id === `${[i]}-${[1]}` && event.target.innerText === "?") {QuestionBox[i][1].innerText = box[i][1]; QuestionBox[i][1].setAttribute( "id","Go")};
        if(event.target.id === `${[i]}-${[2]}` && event.target.innerText === "?") {QuestionBox[i][2].innerText = box[i][2]; QuestionBox[i][2].setAttribute( "id","Go")};
        if(event.target.id === `${[i]}-${[3]}` && event.target.innerText === "?") {QuestionBox[i][3].innerText = box[i][3]; QuestionBox[i][3].setAttribute( "id","Go")};
        if(event.target.id === `${[i]}-${[4]}` && event.target.innerText === "?") {QuestionBox[i][4].innerText = box[i][4]; QuestionBox[i][4].setAttribute( "id","Go")};
        if(event.target.id === `${[i]}-${[5]}` && event.target.innerText === "?") {QuestionBox[i][5].innerText = box[i][5]; QuestionBox[i][5].setAttribute( "id","Go")};
    }

}
async function Reset()
{
    //having problems with resting game question do not appear only answers onclick

    /*
    MainDiv.innerText = "";
    StartGame();
    */

    //temp fix
    window.location.reload()


}
