// don't declare Events here; this sources model.js which already declared it
//Events = new Meteor.Collection("events");

Meteor.startup(function() {
    // add test data if none exists
    var cursor = Events.find();
    if (cursor.count() === 0) {
        console.log("No events found; adding dummy events.");
        Events.insert({name: "Cool Event"});
        Events.insert({name: "UnCool Event"});
    }
});

Meteor.publish("events", function() {
    // pull back all events; later filter by user
    return Events.find({});
});
