// FOLLOW THE COMMENTS STEP BY STEP
// log in to you your Airtable account
// make sure you have a base set up with at least one table with data inside it
// go to Account settings
// click the generate API key button
// copy and paste it into line 13 below
// then go to this link https://airtable.com/api?utm_source=google&utm_medium=cpc&utm_extra5=kwd-826617918193&utm_extra2=936407691&utm_extra10=110555501161&creative=465926015426&device=c&cx=us&targetid=kwd-826617918193&campaignid=936407691&adgroupid=110555501161&utm_campaign=brand_creator&utm_content=bofu_freetrial&gclid=Cj0KCQjwmIuDBhDXARIsAFITC_5ScBkfOcfy68SuLtNsXhLoTp8JoYwFlBuOK6yDpmKnA_eCAXZ3kKsaAptkEALw_wcB
// select your base
// copy and paste the base ID into line 14 below

// the next two lines are calling the Airtable API!!
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyiD7ltbsDgqaEHu" }).base(
  "appeXAJ32IieI2Njg"
);

base("my-dinner-table").select({}).eachPage(gotPageOfScenes, gotAllScenes);

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



    var sceneImage = document.createElement("img");
    sceneImage.classList.add("scene-image");
    sceneImage.src = scene.fields.tableware_image[0].url;
    sceneContainer.append(sceneImage);

    // add event listener to add active class to scene container
    sceneContainer.addEventListener("click", function(event) {
      sceneImage.classList.toggle("active");
    });

    // get color field from airtable
    // loop through the array and add each color as
    // a class to the scene container
    var sceneColor = scene.fields.color;
    sceneColor.forEach(function(color) {
      sceneContainer.classList.add(color);
    });





  });
}
