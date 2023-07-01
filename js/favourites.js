//  getting Id of canvas.
var canvas = document.getElementById("canvas");

// Now, Traversing on local storage for favourites
for (let i = 0; i < localStorage.length; i++) {
  if (localStorage.key(i) == "id") {
    continue;
  }
  // Get data from local storage in form of JSON
  let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

  //  Create a Canvas template for Showing results
  var templateCanvas = canvas.content.cloneNode(true);

  // here I will add all the data of favourite character.
  templateCanvas.getElementById(
    "my-img"
  ).src = `${myStorage.thumbnail.path}.${myStorage.thumbnail.extension}`;
  templateCanvas.getElementById("name").innerHTML =
    "<b>Name: </b> " + myStorage.name;
  templateCanvas.getElementById("about").addEventListener("click", function () {
    localStorage.setItem("id", myStorage.id);
    window.location.assign("./about.html");
  });

  //if User click on remove Button
  templateCanvas.getElementById("fav").addEventListener("click", function () {
    myStorage.innerHTML = null;
    localStorage.removeItem(localStorage.key(i));
    window.location.assign("./favourites.html");
  });
  // Now, Appending to the list
  document.getElementById("superhero-list").appendChild(templateCanvas);
}
