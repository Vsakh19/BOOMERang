import './pages/style.css';
import {API} from "./API"

const submitForm = document.querySelector(".urbanForm__submit");
const formField = document.querySelector(".urbanForm__field");
const main = document.querySelector(".main");

const resultContainer = document.createElement("div");
const keyword = document.createElement("h2");
const currentDefinition = document.createElement("p");
const nextDefinitionBtn = document.createElement("button");
const errorMessage = document.createElement("p");

let definitionCounter = 0;
let resultArray = [];


nextDefinitionBtn.innerText = "Next Definition";
errorMessage.innerText = "Something went wrong or there is no such word in Urban Dictionary.";
keyword.classList.add("searchResult__keyword");
nextDefinitionBtn.classList.add("searchResult__nextBtn");
currentDefinition.classList.add("searchResult__definition");
errorMessage.classList.add("errorMessage");


formField.addEventListener("input", ()=>{
    if(formField.value.length > 0){
        submitForm.removeAttribute("disabled");
    }
    else {
        submitForm.setAttribute("disabled", "")
    }
});

submitForm.addEventListener("click", (event)=>{
    event.preventDefault();
    resultContainer.innerHTML = "";
    resultArray = [];
    const newReq = new API(formField.value);
    keyword.innerText = formField.value;
    formField.value = "";
    submitForm.setAttribute("disabled", "");
    newReq.findWord()
        .then(res=>{
            console.log(res);
            if(res.length > 0){
                return res
            }
            else {
                return Promise.reject()
            }
        })
        .then(res => {
            res.forEach(value=>{
                resultArray.push(value.definition.split('').filter((value) => {
                    return (value!=="[" && value!=="]")
                }).join(""));
            });
            definitionCounter = 0;
            currentDefinition.innerHTML = resultArray[definitionCounter];
            resultContainer.appendChild(keyword);
            resultContainer.appendChild(currentDefinition);
            resultContainer.appendChild(nextDefinitionBtn);
            document.querySelector(".searchResult").appendChild(resultContainer);
            main.style.display="block";
        })
        .catch(err => {
            resultContainer.innerHTML = "";
            document.querySelector(".searchResult").appendChild(resultContainer);
            resultContainer.appendChild(errorMessage);
            main.style.display="block";
        });
});

nextDefinitionBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    if(definitionCounter < resultArray.length-1) {
        definitionCounter += 1;
        currentDefinition.innerHTML = resultArray[definitionCounter];
        document.querySelector(".searchResult").appendChild(resultContainer);
    }
    else {
        definitionCounter = 0;
        currentDefinition.innerHTML = resultArray[definitionCounter];
        document.querySelector(".searchResult").appendChild(resultContainer);
    }
});