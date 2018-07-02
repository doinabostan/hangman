window.onload = init;

function init() {
    document.getElementById('search').addEventListener('click', ySearch, false);
}

function ySearch() {
    var selectJson=document.getElementById('selectJson')
    if(selectJson.value=="tari"){
        var url = 'tari.json';
    }else if(selectJson.value=="scriitori"){
         var url = 'scriitori.json';
    }else if(selectJson.value=="actori"){
         var url = 'oscar.json';
    }

    
    getJSON(url, function(data) {
        showResults(data);
    })
}



function showResults(results) {
    console.log(results);
    var random = Math.ceil(Math.random() * results.length);
    var guess = results[random].cuvant;
    console.log(guess);
    var html = "";
    var html1 = ""
    var html2 = ""
    var html3 = ""
    var html4 = ""
    var cuv = "";
    var lll = "";
    var cuvinte = guess.split(" ");
    var cuv1 = cuvinte[0];
    var cuv2 = cuvinte[1]
    var cuv3 = cuvinte[2]
    var cuv4 = cuvinte[3]

    for (let x = 0; x < cuv1.length - 2; x++) {
        html1 += " - "
    }

    if (cuv2 != undefined) {
        for (let x = 0; x < cuv2.length - 2; x++) {
            html2 += " - "

        }
        var part2 = cuv2[0] + html2 + cuv2[cuv2.length - 1]

    } else {
        part2 = ""

    }

    if (cuv3 != undefined) {
        for (let x = 0; x < cuv3.length - 2; x++) {
            html3 += " - "
        }
        var part3 = cuv3[0] + html3 + cuv3[cuv3.length - 1]

    } else {
        part3 = ""

    }

    if (cuv4 != undefined) {
        for (let x = 0; x < cuv4.length - 2; x++) {
            html4 += " - "
        }
        var part4 = cuv4[0] + html4 + cuv4[cuv4.length - 1]

    } else {
        part4 = ""

    }


   console.log("cuv= " + cuv)

    var html = '<h1>' + cuv1[0] + html1 + cuv1[cuv1.length - 1] + " " + part2 + " " + part3 + " " + part4 + '</h1>';




    document.getElementById('output').innerHTML = html;
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



