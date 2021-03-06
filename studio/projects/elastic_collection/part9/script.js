//console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
//console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({
    apiKey: "keyiD7ltbsDgqaEHu"
}).base(
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
    try {
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

        // in the next 8 lines, we will create an 'images' object consisting of document fragments
        var images = {
        unsorted: document.createDocumentFragment()
        };
        var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

        colors.forEach((color) => {
        /* you can select an object key using brackets as well
         * images.red === images['red'] */
        images[color] = document.createDocumentFragment();
        });

        /* finally, the 'images' object will look like this:
        {
        red: document.createDocumentFragment(),
        orange: document.createDocumentFragment(),
        yellow: document.createDocumentFragment(),
        green: document.createDocumentFragment(),
        blue: document.createDocumentFragment(),
        purple: document.createDocumentFragment(),
        unsorted: document.createDocumentFragment()
        } */

        scenes.forEach(scene => {
                // create container for each scene
                var sceneContainer = document.createElement("div");
                sceneContainer.classList.add("scene-container");

                var sceneImage = document.createElement("img");
                sceneImage.classList.add("scene-image");
                sceneImage.src = scene.fields.film_image[0].url;
                sceneContainer.append(sceneImage);

                // fixed this part
                sceneContainer.style.left = (100 * Math.random()) + '%';
                sceneContainer.style.top = (100 * Math.random()) + '%';

                /* you can add multiple classes to an element at the same time using a comma-separated list
                 * https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
                 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax */
                sceneContainer.classList.add(...scene.fields.color);

                /* create a new array based on scene.fields.color
                 * this array called 'includedColors' will only include colors in the 'colors' array defined way up above */
                var includedColors = scene.fields.color.filter((color) => colors.includes(color));

                if (includedColors.length > 0) {
                      /* prioritize the first color listed on Airtable
                       * for example, if the colors are 'blue red,' then sceneContainer will be appended to images.blue */
                      images[includedColors[0]].appendChild(sceneContainer);
                } else {
                      // if the colors of the image are not in the 'colors' array, they go in images.unsorted
                      images.unsorted.appendChild(sceneContainer);
                }
        });

        // now sort the 'images' object in the order of the colors listed in 'colors' array and append everything
        var sortableImages = colors.map((color) => images[color]);
        document.querySelector('.container').append(...sortableImages, images.unsorted);


        /* move filtering stuff outside the forEach loop
        * using this method, you don't have to repeat yourself
        * first, select all buttons inside .filter and attach click event listeners to them */
        document.querySelectorAll('.filter > button').forEach((button) => {
                button.addEventListener('click', () => {
                  var scenes = document.querySelectorAll('.scene-container');

                  if (button.hasAttribute('data-color')) {
                    /* this selects all .scene-container elements with the class equal to the 'data-color' attribute of the button
                     * if the button has a 'data-color' of 'red', then this will select .scene-container.red */
                    var matchingScenes = document.querySelectorAll(`.scene-container.${button.getAttribute('data-color')}`);

                    scenes.forEach((scene) => scene.style.display = 'none');
                    matchingScenes.forEach((scene) => scene.style.display = '');
                  } else {
                    scenes.forEach((scene) => scene.style.display = '');
                  }
                });
        });
}
