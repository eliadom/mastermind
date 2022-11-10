function addItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
    var li = document.createElement("li");
    var litext = document.createTextNode(candidate.value)
    li.setAttribute('id',candidate.value);
    li.appendChild(litext);
    ul.appendChild(li);
    candidate.value = '';
}

function removeItem(){
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
    candidate.value = '';
}