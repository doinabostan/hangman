window.onload = init;

var guess = " ";
var sp = 0


function init() {
    document.getElementById('search').addEventListener('click', changeString, false);
    document.getElementById('selectJson').addEventListener('change', changeString, false);

}

guesss()


function changeString() {

    sp = 0;
    var imagini = document.querySelectorAll(".hangman img")
    for (var x = 0; x < imagini.length; x++) {
        imagini[x].style.display = 'none'
    }

    document.querySelector("#hint_text").innerHTML = "Hint"
    document.querySelector("#wrongg").innerHTML = "Litere gresite: "

    var selectJson = document.getElementById('selectJson')
    if (selectJson.value == "tari") {
        var url = 'tari.json';
    } else if (selectJson.value == "scriitori") {
        var url = 'scriitori.json';
    } else if (selectJson.value == "actori") {
        var url = 'oscar.json';
    } else if (selectJson.value == "none") {
        document.querySelector("#output").innerHTML = "";
    }


    getJSON(url, function(data) {
        showResults(data);
    })
}



function showResults(results) {
    //  console.log(results);
    var random = Math.ceil(Math.random() * results.length - 1);
    guess = results[random].cuvant;
    console.log(guess);
    var html1 = ""
    for (let x = 0; x < guess.length; x++) {
        if (guess[x] == " ") {
            html1 += " "
        } else {
            html1 += "-"
        }

    }

    document.getElementById('hint').addEventListener('click', function() {
        document.querySelector("#hint_text").innerHTML = results[random].hint2
    })


    var newString = html1.replace('-', guess[0]);
    //  console.log(newString)
    var newString = newString.slice(0, -1) + guess[guess.length - 1];
    //  console.log(newString)
    document.getElementById('output').innerHTML = newString;



}




function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        if (xhr.status == 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
}

function guesss() {
    //var litera;

    //console.log(afisare)

    var letters = document.querySelectorAll('#letters div');
    var outputt = document.querySelector("#output");
    for (var x = 0; x < letters.length; x++) {
        letters[x].addEventListener("click", function(event) {
            var litera = event.target.innerHTML
            //    console.log(event.target.innerHTML)

            console.log(litera.toLowerCase());
            var afisare = document.getElementById('output').innerHTML
            if (guess == " ") {
                afisare = "genereaza un cuvant"
            } else {
                var match = locations(litera.toLowerCase(), guess.toLowerCase());
                console.log("match is = " + match);

                if (match == "") {
                    console.log('wrong')
                    document.querySelector('#wrongg').innerHTML += litera + ", ";
                    sp++;
                    console.log(sp)

                    document.querySelector("#h" + sp).style.display = 'block';
                    if (sp == 7) {
                        document.querySelector("#output").innerHTML = `You've lost! The word was ${guess}. Try Again.`
                    }

                } else {


                    for (var i = 0; i < match.length; i++) {
                        afisare = afisare.replaceAt(match[i], litera)
                        console.log(afisare)
                        document.getElementById('output').innerHTML = afisare.toTitleCase()
                    }
                    if (afisare.indexOf("-") == -1) {
                        document.getElementById('output').innerHTML = "BRAVO!!!! You won!"
                    }
                }
            }
            //console.log("afisare is "+afisare)
            //console.log("guess is= "+guess)


        })

    }




}

function locations(substring, string) {
    var a = [],
        i = -1;
    while ((i = string.indexOf(substring, i + 1)) >= 0) a.push(i);
    return a;
}



function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}


String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}