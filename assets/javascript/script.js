// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5Pafc8-L4gdD1szzB0340Yv35UjZrldc",
    authDomain: "trainschedule-37c26.firebaseapp.com",
    databaseURL: "https://trainschedule-37c26.firebaseio.com",
    projectId: "trainschedule-37c26",
    storageBucket: "",
    messagingSenderId: "1015952239766"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#addTrain").on("click", function(event) {
  event.preventDefault();


  // Grabs user input
  var nameTrain = $("#nameTrain-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainStart = moment($("#firstTrainTime-input").val().trim(), ["h:mm a"]).format("HHmm");
  var mFrequency = $("#mFrequency-input").val().trim();



    // First Time (pushed back 1 year to make sure it comes before current time)
    


  console.log(nameTrain);
  console.log(destination);
  
  console.log(mFrequency)

    var trainSchedule =  {
    trainName: nameTrain,
    destination: destination,
    startTime: trainStart,
    frequency: mFrequency,
    //minAway: tMinutesTillTrain
  };

 database.ref().push(trainSchedule);

  $("#nameTrain-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#mFrequency-input").val("");

});

   database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  var Name = childSnapshot.val().trainName;
  var Dest = childSnapshot.val().destination;
  var sTime = childSnapshot.val().startTime;
  var miFrequency = childSnapshot.val().frequency;

   	var firstTimeConverted = moment(sTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % miFrequency;
    console.log("Time Remainder is: " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = miFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

console.log(childSnapshot.val());

  // Store everything into a variable.

  

  // Employee Info
  console.log(Name);
  console.log(Dest);
  console.log(sTime);
  console.log(miFrequency);
  console.log(nextTrain)
 

$("#trainTable").append("<tr><td>" + Name + "</td><td>" + Dest + "</td><td>" +
  miFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");

  });

