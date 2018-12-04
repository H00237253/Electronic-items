const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

const mongoServerURL = "mongodb://localhost:27017";

//Task 3 - Question 1
app.get('/devops', (request, response, next) => {
	mongoClient.connect(mongoServerURL, (err, db) => {
		if (err)
			console.log("Cannot connect to Mongo: " + err.message);

		
		const eventsdb = db.db("eventsdb");

		eventsdb.collection("events").find({category:"Devops"}).toArray((err, devopsArray) => {
			if (err)
				console.log(err.message);

			response.send(JSON.stringify(devopsArray));
		});

		db.close();
	});

});

//Task 3 - Question 2
app.get('/:organizer', (request, response, next) => {
	mongoClient.connect(mongoServerURL, (err, db) => {
		if (err)
			console.log("Cannot connect to Mongo: " + err.message);

		
		const eventsdb = db.db("eventsdb");
		
		let organizerValue = request.params.organizer;
		
		if (organizerValue == "oracle")
			organizerValue = "Oracle";
		else if (organizerValue == "mozilla")
			organizerValue = "Mozilla";
		else if (organizerValue == "docker")
			organizerValue = "Docker";
		else if (organizerValue == "sparkfun")
			organizerValue = "SparkFun";
		console.log(organizerValue);
		
		//build the query filter
		let query = {organizer:organizerValue};

		
		eventsdb.collection("events").find(query).toArray((err, eventsArray) => {
			if (err)
				console.log(err.message);

			response.send(JSON.stringify(eventsArray));
		});

		//close the connection to the db
		db.close();
	});
});

const port = 7878;
app.listen(port, ()=> {
	console.log("server listening on " + port);
});