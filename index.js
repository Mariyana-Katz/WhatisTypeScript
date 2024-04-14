// Import stylesheets
// import './style.css';
var form = document.querySelector('#defineform');
form.onsubmit = function () {
    var formData = new FormData(form);
    console.log(formData);
    var text = formData.get('defineword');
    console.log(text);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(text))
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        appendData(data);
    })
        .catch(function (err) {
        console.log('error: ' + err);
    });
    return false; // prevent reload
};
function appendData(data) {
    console.log(data);
    //let mainContainer = document.getElementById("quotes")!;
    // let p = document.createElement("p");
    // let w = document.createElement("p");
    var w = document.getElementById("word");
    //let p = document.getElementById("definition")!;
    w.innerHTML = data[0].word;
    //p.innerHTML = data[0].meanings[0].definitions[0].definition;
    console.log(data[0]);
    // mainContainer.appendChild(w);
    // mainContainer.appendChild(p);
    var meanings = document.getElementById("meanings");
    //remove all children
    while (meanings.firstChild) {
        meanings.removeChild(meanings.firstChild);
    }
    //dynamically display all meanings
    for (var i = 0; i < data[0].meanings.length; i++) {
        var meaningEl = document.createElement("li"); //
        meaningEl.textContent = data[0].meanings[i].partOfSpeech;
        meanings.appendChild(meaningEl);
        var pDef = document.createElement("p");
        pDef.classList.add("lead");
        pDef.innerHTML = data[0].meanings[i].definitions[0].definition;
        meaningEl.appendChild(pDef);
        if (data[0].meanings[i].synonyms.length > 0) {
            var pSyn = document.createElement("p");
            pSyn.innerText = "Synonyms:";
            var synonyms = document.createElement("ul");
            for (var j = 0; j < data[0].meanings[i].synonyms.length; j++) {
                var synonymEl = document.createElement("li");
                synonymEl.textContent = data[0].meanings[i].synonyms[j];
                synonyms.appendChild(synonymEl);
            }
            pSyn.appendChild(synonyms);
            meaningEl.appendChild(pSyn);
        }
        if (data[0].meanings[i].antonyms.length > 0) {
            var pAnt = document.createElement("p");
            pAnt.innerText = "Antonyms:";
            var antonyms = document.createElement("ul");
            for (var j = 0; j < data[0].meanings[i].antonyms.length; j++) {
                var antonymEl = document.createElement("li");
                antonymEl.textContent = data[0].meanings[i].antonyms[j];
                antonyms.appendChild(antonymEl);
            }
            pAnt.appendChild(antonyms);
            meaningEl.appendChild(pAnt);
        }
    }
}
