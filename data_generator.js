const fs = require("fs");

function randomNumber(max){
      return Math.floor(Math.random()*max)
}
const COUNTER = {
    male:0,
    female:0
}

function randomChoice(arr){
    let index = randomNumber(arr.length)
    return arr[index];
}

const paths = {
    male_names: "male_names.txt",
    female_names: "female_names.txt",
    last_names: "last_names.txt"
}
const data_folder = "data"

function getFullPath(path){
    return `${__dirname}/${data_folder}/${path}`
}

function loadJsonFile(path){
    let fp = getFullPath(path)    
    const content = fs.readFileSync(fp).toString();
    return JSON.parse(content);
}

function loadTxtFile(path){
    let fp = getFullPath(path)    
    const content = fs.readFileSync(fp).toString();
    return content.split("\n");
}

const names = {
    male_names: loadTxtFile("male_names.txt"),
    female_names: loadTxtFile("female_names.txt"),
    last_names: loadTxtFile("last_names.txt")
}


function unique(arr){
    return [...new Set(arr)]
}

function assignSpeaker(speakers){
    let assignment = {}
    for (let speaker of speakers){
        assignment[speaker] = getRandomPerson()
    }
    return assignment
}

function generateConvo(content){

         let speakers = unique(content.map(x=>x['agent']))
         let assignment = assignSpeaker(speakers)
         const convos = []
         for (let item of content){
             let agent = item['agent']
             let message = item['message']
             convos.push({...assignment[agent], message})
         }

         return convos
}

function generateDataset(n){
    let convos = loadJsonFile("convo.json")

    let keys = Object.keys(convos)
    let count = (keys.length> n)? n: keys.length;
    const result = []
    for(let i=0; i< count; i++){
        let convo = generateConvo(convos[keys[i]]['content'])
        result.push(...convo)
    }
    return result;
}

function getRandomPerson(){
    let person = {}
    if (Math.random()>0.5) {
        COUNTER.male+=1
        person['id'] = COUNTER.male
        person['gender'] = 'men'
        person['first_name'] = randomChoice(names['male_names']).replace("\r", "")

    } else {
        COUNTER.female+=1
        person['id'] = COUNTER.female
        person['gender'] = 'women'
        person['first_name'] = randomChoice(names['female_names']).replace("\r", "")       
    }
    person['last_name'] = randomChoice(names['last_names']).replace("\r", "")

    return person;
}


module.exports = generateDataset
