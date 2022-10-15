"use strict";

// ------ Time ------
const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minute");
// ------------------

let miniseconds = 0;
let counter = 0;
let min = 0;

function time() {
	resetTime();
	miniseconds++;
	if (miniseconds === 10) { // change 10 to 1000 later
		counter++;
		if (counter === 60) {
			// function call
			minute(1);
			counter = 0;
		}
		seconds.innerHTML = counter;
		miniseconds = 0;
	}
}

function minute(m) {
	min += m;
	if (min <= 10) {
		minutes.innerHTML = min;
	}
}

function resetTime() {
	if (min === 10) {
		miniseconds = 0;
		counter = 0;
		min = 0;
	}	

	seconds.innerHTML = counter;
	minutes.innerHTML = min
}

setInterval(time, 10); // change 10 to 1000 later
