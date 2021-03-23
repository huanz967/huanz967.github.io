function changeNobi() {
  var image = document.getElementById('nobi');
  if (image.src.match("nobitaroom")) {
    image.src = "pic_bulboff.gif";
  } else {
    image.src = "pic_bulbon.gif";
  }
}

function slider(set) {
	const sliderContainer = document.querySelector(set.name),
		slider = sliderContainer.querySelector('.slider'),
		sliderItem = slider.querySelectorAll('.slider__item'),
    sliderArrows = sliderContainer.querySelectorAll('.arrows__item');

	let dotsCreate,
		dotsClass,
		dotsFunk;

	// calculate the maximum width of all slides
	function forSliderItem(t) {
		t = 0;
		for(let i = 0; i < sliderItem.length - 1; i++) {
			t += sliderItem[i].clientWidth;
		}
		return t;
  }

	let maxWidth = forSliderItem(sliderItem), // maximum width of all slides
		slidWidth = 0, // main variable for calculating the movement of the slider
    count = 0; // counter

	//===== flip left
	sliderArrows[0].addEventListener('click', function() {
		if(count !== 0) {
			count--;
			slidWidth -= sliderItem[count].clientWidth;
			slider.style.transform = `translateX(-${slidWidth}px)`;
		} else {
			count = sliderItem.length - 1;
			slidWidth = maxWidth;
			slider.style.transform = `translateX(-${slidWidth}px)`;
    }

		if(set.dots) {
			dotsFunk();
		}
  });

	//===== flip right
	sliderArrows[1].addEventListener('click', function() {
		if(count < sliderItem.length - 1) {
			count++;
			slidWidth += sliderItem[count].clientWidth;
			slider.style.transform = `translateX(-${slidWidth}px)`;
		} else {
			count = 0;
			slidWidth = 0;
			slider.style.transform = `translateX(-${slidWidth}px)`;
    }

		if(set.dots) {
			dotsFunk();
		}
  });

	//===== dots
	if(set.dots) {
		dotsCreate = function() {
			const dotContainer = document.createElement('div'); // create dots container
			dotContainer.classList.add('dots');
			// create the required number of dots and insert a container into the dots
			sliderItem.forEach(() => {
				let dotsItem = document.createElement('span');
				dotContainer.append(dotsItem);
			});
			sliderContainer.append(dotContainer);
		};
    dotsCreate();

		// add the class to the desired dots, and remove from the rest
		dotsClass = function(remove, add) {
			remove.classList.remove('dots_active');
			add.classList.add('dots_active');
    };

		// move slides by clicking on the dot
		dotsFunk = function() {
			const dotsWork = sliderContainer.querySelectorAll('.dots span'); // we get dots
			dotsWork.forEach((item, i) => {
				dotsClass(dotsWork[i], dotsWork[count]);
				item.addEventListener('click', function() {
					count = i;
					// multiply the slide size by the number of the dots, and get the number by which you need to move the slider
					slidWidth = sliderItem[0].clientWidth * i;
					slider.style.transform = `translateX(-${slidWidth}px)`;
					for(let j = 0; j < dotsWork.length; j++) {
						dotsClass(dotsWork[j], dotsWork[count]);
					}
					if(set.dots && set.numberSlid) {
						numberSliderWork(count);
					}
					if(set.line) {
						sliderExecutionLineWork(count);
					}
				});
			});
		};
		dotsFunk();
  }


	//=====  slider execution line
	if(set.line) {
		sliderExecutionLine = function() {
			const sliderLine = document.createElement('div'),
				sliderLineProgress = document.createElement('div');
			sliderLine.classList.add('slider-execution-line');
			sliderLineProgress.classList.add('slider-execution-line__progress');
			sliderLine.append(sliderLineProgress);
			slider.after(sliderLine);
		};
    sliderExecutionLine();

		sliderExecutionLineWork = function(itemCount) {
			const sliderLineProgress = sliderContainer.querySelector('.slider-execution-line__progress');
			let t = 100 / sliderItem.length; // how much % each slide takes
			t *= (itemCount + 1);
			sliderLineProgress.style.width = `${t}%`;
		};
		sliderExecutionLineWork(0);
	}
}

slider({
	name: ".your-class-1",
	dots: true,
	numberSlid: true,
	line: true
});

slider({
	name: ".your-class-2",
	dots: true,
	numberSlid: true,
	line: true
});
