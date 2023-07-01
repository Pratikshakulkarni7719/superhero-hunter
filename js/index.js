/* Information about keys->
  Public key - 14fc6f1b55d22345494bda7902df431f
  Hash (md5) - e9574d69c8e2df30fe7cf289122c7223
 */

//  Get Id from HTML File, & Search query with HTTP Request, then parse it
var xhrRequest = new XMLHttpRequest();
xhrRequest.open(
  "get",
  "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223",
  true
);
xhrRequest.send();
xhrRequest.onload = function () {
  var allCharacters = JSON.parse(xhrRequest.responseText);
  console.log(allCharacters.data.results);
  getAllCharactersList(allCharacters.data.results);
};

document.getElementById("search-form").addEventListener("keyup", function () {
  var url = getUrl();
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    display(data);
  };
});

//This function display  all characters data.

function getAllCharactersList(results) {
  //  Get Canvas
  let canvas = document.getElementById("canvas");

  // Get Search String
  let searchHero = document.getElementById("search-string").value;
  var superHeroList = document.getElementById("superhero-list");
  superHeroList.innerHTML = "";

  for (let result of results) {
    var templateCanvas = canvas.content.cloneNode(true);

    //  Get all ids of  image and name  of html element and change its text.
    templateCanvas.getElementById(
      "my-img"
    ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
    templateCanvas.getElementById("name").innerHTML = result.name;
    templateCanvas
      .getElementById("about")
      .addEventListener("click", function () {
        localStorage.setItem("id", result.id);
        window.location.assign("./about.html");
      });

    //  EventListner for  favorite button, and set its data to local storage.
    templateCanvas.getElementById("fav").addEventListener("click", function () {
      var index = localStorage.length;
      var data = JSON.stringify(result);
      localStorage.setItem(result.id, data);
    });
    superHeroList.appendChild(templateCanvas);
  }
}

// Get the URL from  API
function getUrl() {
  // From Id I'll get value.
  var searchQuery = document.getElementById("search-string").value;

  //  If search query matches the results then it will redirect to searched hero otherwise moved to home page.
  if (!searchQuery) {
    return "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223";
  } else {
    return `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=1&apikey=14fc6f1b55d22345494bda7902df431f&hash=e9574d69c8e2df30fe7cf289122c7223`;
  }
}

//  Get Canvas
let canvas = document.getElementById("canvas");
let searchHero = document.getElementById("search-string").value;

// This Function will display the Data on the Screen
function display(data) {
  var superHeroList = document.getElementById("superhero-list");
  var results = data.data.results;

  //if array list is empty message will show
  if (results.length === 0) {
    superHeroList.innerHTML = "<b>No Super Hero To Display</b>";
  }

  //otherwise display the superheros from list.
  else {
    superHeroList.innerHTML = "";

    //for loop will help to print all superheros from list.
    for (let result of results) {
      var templateCanvas = canvas.content.cloneNode(true);

      //  Get all the elemets from id and then changes its Inner HTMl
      templateCanvas.getElementById(
        "my-img"
      ).src = `${result.thumbnail.path}.${result.thumbnail.extension}`;
      templateCanvas.getElementById("name").innerHTML = result.name;

      //  EventListener for  about button
      templateCanvas
        .getElementById("about")
        .addEventListener("click", function () {
          localStorage.setItem("id", result.id);
          window.location.assign("./about.html");
        });

      //  EventListener for  about button
      templateCanvas
        .getElementById("fav")
        .addEventListener("click", function () {
          var index = localStorage.length;
          var data = JSON.stringify(result);
          localStorage.setItem(result.id, data);
        });
      superHeroList.appendChild(templateCanvas);
    }
  }
}
//  This function will execute after user added the super hero to favorite.
function addFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
