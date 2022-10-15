// ES6
"use strict";
// count variable
let questionNumber = 1;
// JSON
let quiz = {
	"question": '',
	"options": [],
	// "answer": '' - This would be compared in the backend
}

let answeredQuestions = {
	"questions": {
		"question_ids": [],
		"currentAnswer": ''
		// "isCorrect": []
	}
}
// For previous question
let size = answeredQuestions.questions.question_ids.length - 1;

// This is to get all button inside HTML document
const buttons = document.querySelectorAll("button");
const displayCount = document.querySelector(".count");
const nextButton = document.querySelector(".next");
const errorBox = document.querySelector(".errorBox");
const errorMsg = document.querySelector(".errorMsg");
const cancelButton = document.querySelector(".cancel");
const q_number = document.querySelector(".page_number");
// iterate through the button to detect which ever is clicked upon
buttons.forEach(button => {
	button.onclick = (e) => {
		let operation = e.target.dataset.button;

		switch(operation) {
			case "next":
				// alert(`${operation} => ${setQuestionNumber()}`);
				size += 1; 
				// alert(size)
				let isMax = numbering();
				if (!isMax) submit();
				break;
			case "previous":
				size -= 1;
				if (size < 0) {
					return;
				}
				// alert(size)
				question_id = answeredQuestions.questions.question_id[size]
				getQuestion("previous", question_id);
				break;
			default:
				errorMsg.innerHTML = "You have not clicked on valid button.";
		}
	}
})

cancelButton.onclick = () => {
	errorBox.classList.remove("show");
	errorBox.classList.add("hide");
}

// numbering function
function setQuestionNumber() {
	return questionNumber++;
}
// set numbering to default value
function setDefault() {
	questionNumber = 1;
}

function getQuestion(state = '', qID = null) {

	switch(state) {

		case "next":
			fetch('http:/127.0.0.1:5000/questions', {
				'method': 'GET',
				'header': {
					'Content-Type': 'application/json'
				}
			})
			.then(response => {
				renderQuestion(response);
			})
			.catch(error => {
				errorMsg.innerHTML = "Server error for next question.";
			});
			break;

		case "previous":
			let question_id = 2;
			fetch(`http:/127.0.0.1:5000/questions/${qID}`, {
				'method': 'GET',
				'header': {
					'Content-Type': 'application/json'
				}
			})
			.then(response => {
				renderQuestion(response);
			})
			.catch(error => {
				errorMsg.innerHTML = "Server error for previous question.";
			});
			break;

		default:
			errorMsg.innerHTML = "State is not set.";
	}
}

function renderQuestion(data) {
	alert(data);
}

function submit() {
	fetch('http:/127.0.0.1:5000/submissions', {
			'method': 'POST',
			'header': {
				'Content-Type': 'application/json'
			},
			'body': answeredQuestions
		})
		.then(response => {
			alert("Continues question submitted successfully.");
			getQuestion("next");
		})
		.catch(error => {
			// alert()
			if (errorBox.classList.contains("hide")) {
				errorBox.classList.remove("hide");
				errorBox.classList.add("show");
			}
			errorMsg.innerHTML = "Server error question not submitted.";
	});
}

function numbering() {
	let number = setQuestionNumber();
	if (number === 10) {
		nextButton.innerHTML = "Submit All";
		displayCount.style.backgroundColor = "red";
		displayCount.style.color = "#ddd";
	}
	if (number > 10) {
		nextButton.disabled = true;
		alert("You can only attempt 10 questions at a go. Thanks! \nYour answers have been submitted.");
		return true;
	}
	displayCount.innerHTML = number < 10 ? number : 10;
	q_number.innerHTML = number < 10 ? number : 10;
	return false;
}