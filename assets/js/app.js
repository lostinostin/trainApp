
$(document).ready(function() {

	var trainDB = new Firebase('https://trainschedu.firebaseio.com/');
	var trainName ="";
	var initialTrain = "";
	var destination = "";
	var frequency = 0;
	var nextArrival = 0;
	var minutesAway = 0;
	var now = moment().format("HH:mm:ss");
	var firstTimeConverted = '';
	var diffTime = '';

	$('#currentTime').fitText(1.5);

	function update() {
  		$('#currentTime').html(moment().format('HH:mm:ss'));
	}

	setInterval(update, 1000);

	$(document).on('click', '#remove', function() {
		var key = $(this).data('key');
		var id = new Firebase('https://trainschedu.firebaseio.com/' + key);
		id.remove();
		$('#' + key).remove();
	})

	if ((moment("05:15", "HH:mm").subtract(1, "years")) > moment()) {

		$('#submit').on('click',function(){
			trainName = $('#trainNameInput').val().trim();
			console.log(trainName);
			initialTrain = $('#firstTrainInput').val().trim();
			console.log(initialTrain);
			destination = $('#destinationInput').val().trim();
			console.log(destination);
			frequency = $('#frequencyInput').val().trim();
			console.log(frequency);
			firstTimeConverted = moment(initialTrain, "HH:mm").subtract(1, "years");
			console.log(firstTimeConverted);
			diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			console.log(diffTime);
			timeRemaining = diffTime % frequency;
			console.log(timeRemaining);
		    remainingMinutes = frequency - timeRemaining;
		    nextArrival = moment().add(remainingMinutes, "minutes");
		    nextArrivalFormatted = moment(nextArrival).format("HH:mm");
		    
		    trainDB.push({
				trainName : trainName,
				firstTrainInput : initialTrain,
				frequency : frequency,
				destinationInput : destination,
				nextArrival: nextArrivalFormatted,
				minutesAway: remainingMinutes
			})

			$('#trainNameInput').val('');
			$('#firstTrainInput').val('');
			$('#destinationInput').val('');
			$('#frequencyInput').val('');

			return false;
		});
		  
	  trainDB.on("child_added", function(snapshot){
			console.log(snapshot.key());
			$('#newRow').append("<tr id='" + snapshot.key() + "'><td>" 
				+ snapshot.val().trainName + "</td><td>" 
				+ snapshot.val().destinationInput + "</td><td>" 
				+ snapshot.val().frequency + "</td><td>" 
				+ snapshot.val().nextArrival + "</td><td>" 
				+ snapshot.val().minutesAway + "<td><button class='btn btn-danger' id='remove' data-key='" + snapshot.key() + "'>X</button></td></tr>" )
		}, function(errorObject){
			console.log("Errors handled: " + errorObject.code)
		});
	} else {
		alert("The train is not currently running");
		window.location.replace("http://www.capmetro.org/rail-stations/");

	}
});

