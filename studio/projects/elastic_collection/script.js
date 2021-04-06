//console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
//console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "keyiD7ltbsDgqaEHu" }).base(
  "appANnEJ17E5RKEbT"
);

// get our collection base, select all the records
// specify functions that will receive the data
base("films").select({}).eachPage(gotPageOfScenes, gotAllScenes);

// an empty array to hold our data
var scenes = [];

// callback function that receives our data
function gotPageOfScenes(records, fetchNextPage) {
  console.log("gotPageOfScenes()");
  // add the records from this page to our array
  scenes.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllScenes(err) {
  console.log("gotAllScenes()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the scenes
  consoleLogScenes();
try{
  showScenes();
} catch (e) {
  console.log(e);
}
}

// just loop through the scenes and console.log them
function consoleLogScenes() {
  console.log("consoleLogScenes()");
  scenes.forEach(scene => {
    console.log("Scene:", scene);
  });
}

// look through our airtable data, create elements
function showScenes() {
  console.log("showScenes()");
  scenes.forEach(scene => {
    // create container for each scene
    var sceneContainer = document.createElement("div");
    sceneContainer.classList.add("scene-container");
    document.querySelector(".container").append(sceneContainer);

    // add scene titles
    var sceneTitle = document.createElement("h1");
    sceneTitle.classList.add("title");
    sceneTitle.innerText = scene.fields.title;
    sceneContainer.append(sceneTitle);

    var nameOfDirector = document.createElement("h3");
    nameOfDirector.classList.add("director");
    nameOfDirector.innerText = scene.fields.director;
    sceneContainer.append(nameOfDirector);

    var sceneImage = document.createElement("img");
    sceneImage.classList.add("scene-image");
    sceneImage.src = scene.fields.film_image[0].url;
    sceneContainer.append(sceneImage);

  });
}
