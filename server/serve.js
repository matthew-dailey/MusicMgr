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

/**
 * Validates a document for creating an event
 * @param doc Schemas.Event object
 * @throw Meteor.Error on invalid input or failed insert to Mongo
 */
var validatedCreateEvent = function(doc) {
    check(doc, Schemas.Events);

    // now really insert it
    Events.insert(doc, function(error, result) {
        if (error) {
            console.log("Error during validated insert.");
            console.log(error);
            throw new Meteor.Error(500, "Problem inserting to MongoDB.");
        }
    });
};

// set up methods exposed to client
Meteor.methods({
    createEvent: function(name) {
        validatedCreateEvent({name: name});
    },
    createEventAutoForm: function(doc) {
        validatedCreateEvent(doc);
    }
});
