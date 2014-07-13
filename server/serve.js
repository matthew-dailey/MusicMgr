// don't declare Events here; this sources model.js which already declared it
//Events = new Meteor.Collection("events");
Meteor.publish("events", function() {
    // pull back all events; later filter by user
    return Events.find({});
});
