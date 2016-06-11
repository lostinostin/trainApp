var trainDB = new Firebase('https://trainschedu.firebaseio.com/');
var trainName ="";

var initialTrain = "";

var destination ="";

var frequency = 0;

var nextArrival = 0;

var minutesAway = 0;

var now = moment();

var endOfDay = moment("23:59.59", "HH:mm.ss");
var trainStop = initialTrain + frequency; 
var minuteIndex;
var remainingMinutes;

var numberOfTrainStops;

var hasArrived;

var arrivalTimes = [];

function addArrivalTimes() {
	minuteIndex = (moment(initialTrain, "HH")*60) + (moment(initialTrain, "mm"));
	remainingMinutes = 1440 - minuteIndex;
	numberOfTrainStops = remainingMinutes/frequency;

	do {
		trainStop += frequency;
		numberOfTrainStops--;
	} while (numberOfTrainStops > 0);
}

function update() {
	for (var i=0; i < arrivalTimes.length; i++) {
		if (now === arrivalTimes[i]) {
			hasArrived = arrivalTimes[i];
		}
	}
}

// var nextArrival = hasArrived + frequency

/*$(document).on('click', '#remove', function() {
	var key = $(this).data('key');
	var id = new Firebase('https://glowing-fire-4612.firebaseio.com/' + key);
	id.remove();
	$('#' + key).remove();
})*/

$('#submit').on('click',function(){
	trainName = $('#trainNameInput').val().trim();
	console.log(trainName);
	initialTrain = $('#firstTrainInput').val().trim();
	console.log(initialTrain);
	destination = $('#destinationInput').val().trim();
	console.log(destination);
	frequency = $('#frequencyInput').val().trim();
	console.log(frequency);
	
	 update();
	 addArrivalTimes();
	console.log(nextArrival);
	console.log(minutesAway);
	console.log(now);
	console.log(endOfDay);
	console.log(trainStop);
	console.log(minuteIndex);
	console.log(remainingMinutes);
	console.log(numberOfTrainStops);
	console.log(hasArrived);
	console.log(arrivalTimes);

	trainDB.push({
		trainName : trainName,
		firstTrainInput : initialTrain,
		frequency : frequency,
		destinationInput : destination,
		nextArrival: nextArrival,
		minutesAway: minutesAway
	})

	$('#trainNameInput').val('');
	$('#firstTrainInput').val('');
	$('#destinationInput').val('');
	$('#frequencyInput').val('');

	return false;
});

/**/

trainDB.on("child_added", function(snapshot){
	console.log(snapshot.key());
	$('#newRow').append("<tr id='" + snapshot.key() + "'><td>" + snapshot.val().trainName +"</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + ' minutes' + "</td><td>" + snapshot.val().minutesAway + "<td><button class='btn btn-warning' id='edit' data-key='" + snapshot.key() + "'>Edit</button></td><td><button class='btn btn-danger' id='remove' data-key='" + snapshot.key() + "'>X</button></td></tr>" )
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code)
});