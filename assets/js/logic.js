//To check the connection if it's working properly
console.log("It's working");

/* <tr>
<th scope="row">1</th>
<td>Mark</td>
<td>Otto</td>
<td>@mdo</td>
</tr> */


var config = {
    apiKey: "AIzaSyDvR4vck3FN5TQr3Fh9WTrnbRf5dWhyXRY",
    authDomain: "train-time998.firebaseapp.com",
    databaseURL: "https://train-time998.firebaseio.com",
    projectId: "train-time998",
    storageBucket: "train-time998.appspot.com",
    messagingSenderId: "1082090644627",
    appId: "1:1082090644627:web:e4fc10de66a7e8bb"
};
firebase.initializeApp(config);
var database = firebase.database();

var currentTime = moment();
console.log(moment(currentTime).format("hh:mm"));

var trainName = "";
var destinationName = "";
var firstTrainTime = 0;
var frequencyNumber = 0;
var tableBodyDiv = $(".table-section-body");


$("#submit-time").on("click", function (event) {
    event.preventDefault();
    // Get the input values
    var trainName = $("#train-name").val().trim();
    var destinationName = $("#destination-name").val().trim();
    var firstTrainTime = $("#appt").val().trim();
    var frequencyNumber = parseInt($("#frequency-time").val().trim());

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrainTime);
    console.log(frequencyNumber);
    database.ref().push({
        trainName: trainName,
        destinationName: destinationName,
        firstTrainTime: firstTrainTime,
        frequencyNumber: frequencyNumber
    });
    $("#train-name").val("");
    $("#destination-name").val("");
    $("#appt").val("");
    $("#frequency-time").val("");



});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    var frequency = childSnapshot.val().frequencyNumber;
    var time = childSnapshot.val().firstTrainTime.split(":");
    var momentTime = moment().hours(time[0]).minutes(time[1]);

    var firstTrainTimeCalc = moment(childSnapshot.val().firstTrainTime);

    var differenceInMinutes = momentTime.diff(moment(), "minutes");
    var remainder = differenceInMinutes % frequency;
    var minutesUntil = (parseInt(frequency) - Math.abs(parseInt(remainder)));
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().firstTrainTime);
    console.log("Minutes " + minutesUntil);
    var nextTrain = moment().add(minutesUntil,"m").format("hh:mm A")

    tableBodyDiv.append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destinationName + "</td><td>" +
        childSnapshot.val().frequencyNumber + "</td><td>" + nextTrain + "</td><td>" + minutesUntil + "</td></tr>");






    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
