var firebaseConfig = {
    apiKey: "AIzaSyABK6WPCJa-wyUhZjDUU8Jq_HkElmZRtec",
    authDomain: "test-form-fd191.firebaseapp.com",
    projectId: "test-form-fd191",
    storageBucket: "test-form-fd191.appspot.com",
    messagingSenderId: "544635651667",
    appId: "1:544635651667:web:9f6fd865247404d495a8a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//refrence centactInfo collections
let contactInfo = firebase.database().ref("infos")

// listen for a submit
document.querySelector('.contact-form').addEventListener("submit", submitForm);

function submitForm(e) {
	// body...
	e.preventDefault();
	//get input
	let name = document.querySelector(".name").value;
	let email = document.querySelector(".email").value;
	let message = document.querySelector(".message").value;

	saveContactInfo(name, email, message);

	document.querySelector(".contact-form").reset();

	sendEmail(name, email, message);
}

//save info to firebase
function saveContactInfo(name, email, message) {
	let newContactInfo = contactInfo.push();

	newContactInfo.set({
		name: name,
		email: email,
		message: message,
	});
	retrieveInfos();
}

// retrieve infos
function retrieveInfos(){
	let ref = firebase.database().ref("infos");
	ref.on("value", gotData);
}


function gotData(data) {
	let info = data.val();
	let keys = Object.keys(info);

	for (let i = 0; i < keys.length; i++) {
		let infoData = keys[i];
		let name = info[infoData].name;
		let email = info[infoData].email;
		let message = info[infoData].message;

		let infoResults = document.querySelector(".infoResults");

		infoResults.innerHTML += `<div>
		<p><strong>Name: <strong>${name} <br/>
		<a><strong>Email: <strong>${email} </a><br/>
		<a><strong>Message: <strong>${message} <a/>
		</P>
		</div>`;
	}
}

retrieveInfos();

// send email info //

function sendEmail(name, email, message) {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "chhariavikram1@gmail.com",
		password: "qdpcevzbosdwgipd",
		To: 'chhariavikram1@gmail.com',
		From: 'chhariavikram1@gmail.com',
		subject: `${name} sent you a message`,
		Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
	}).then((message) => alert("mail sent successfully"))
}