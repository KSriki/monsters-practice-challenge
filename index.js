

// Srikant Kumar Kalaputapu

let num = 1;
let max = 10;

document.addEventListener("DOMContentLoaded", function() {
    fetchAll();
    load50();
    addNewMonsterListener();
    addPageListener();
})

function fetchAll(){
    fetch('http://localhost:3000/monsters')
    .then(resp => resp.json(),function(error){
        alert(`Please run server with command 'json-server monsters.json'`)
    })
    .then(json => max = Math.floor(json.length / 50));

}

function render(json){
    if(json){
        let list = document.getElementById("monster-list");
        // debugger;
        let row = document.createElement("li");
        row.innerHTML = `ID: ${json.id}, Name: ${json.name}`;
        // debugger;
        row.innerHTML += `<ul><li>Age: ${json.age}</li> <li>Description: ${json.description}</li></ul>`;
        list.appendChild(row);
    }
}
function render50(json) {
    let results = document.getElementById("monster-container");
    results.innerHTML = "";
    let monlist = document.createElement("ul");
    monlist.id = "monster-list";
    results.appendChild(monlist);
    for (let i = 0; i < 50; i++) {

        render(json[i]);
    }

}
function fetchMonsters() {
    // debugger;
    let mons = fetch('http://localhost:3000/monsters/?_limit=50')
    mons.then(resp => resp.json()).then(json => render50(json));

}

function load50() {
    let results = document.getElementById("monster-container");
    fetchMonsters()
}

function fetchNewMonster() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let desc = document.getElementById("description").value;

    let data = {
        name: name,
        age: age,
        description: desc
    };
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)

    })
    //weird but works

    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(function(json) {fetchPage(Math.floor(json.length/50)+1)})

}



function addNewMonsterListener() {

    let form = document.getElementById("monster-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        fetchNewMonster();
    });
}

function fetchPage(number){

    let mons = fetch(`http://localhost:3000/monsters/?_limit=50&_page=${number}`)
    mons.then(resp => resp.json()).then(json => render50(json));
    num = number;
    if(num > max){
        max = num;
    }
}

function addPageListener(){

    let forward = document.getElementById("forward");

    forward.addEventListener("click",function(){
            num+=1;
            if(num > max){
                num = max;
            }
            fetchPage(num);

    });

    let backward = document.getElementById("back");
    backward.addEventListener("click",function(){
        num-=1;
        if(num < 1){
            num = 1;
        }
        fetchPage(num);
    })


}
