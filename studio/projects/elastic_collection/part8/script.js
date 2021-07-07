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

		// in scene.fields.color, find the first value that's included in the 'colors' array defined way up above
		var firstMatchingColor = scene.fields.color.find((color) => colors.includes(color));

		if (firstMatchingColor) {
			// for example, if the colors are 'blue red,' then sceneContainer will be appended to images.blue
			images[firstMatchingColor].appendChild(sceneContainer);
		} else {
			// if nothing in scene.fields.color is in the 'colors' array, it goes in images.unsorted
			images.unsorted.appendChild(sceneContainer);
		}
	});

	// now sort the 'images' object in the order of the colors listed in 'colors' array and append everything
	var sortableImages = colors.map((color) => images[color]);
	document.querySelector('.container').append(...sortableImages, images.unsorted);

	/* move filtering stuff outside the forEach loop
	 * using this method, you don't have to repeat yourself
	 * add event listener to .filter and use event delegation to read 'data-color' attributes of clicked buttons */
	document.querySelector('.filter').addEventListener('click', (event) => {
		if (event.target.tagName === 'BUTTON') {
			// check if the element being clicked on is a button
			var scenes = document.querySelectorAll('.scene-container');

			if (event.target.hasAttribute('data-color')) {
				/* this selects all .scene-container elements with the class equal to the 'data-color' attribute of the button
				* if the button has a 'data-color' of 'red', then this will select .scene-container.red */
				var matchingScenes = document.querySelectorAll(`.scene-container.${event.target.getAttribute('data-color')}`);

				scenes.forEach((scene) => scene.style.display = 'none');
				matchingScenes.forEach((scene) => scene.style.display = '');
			} else {
				scenes.forEach((scene) => scene.style.display = '');
			}
		}
	});
}
