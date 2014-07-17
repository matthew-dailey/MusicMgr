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

// remove an event by document, but really needs an ID
var validatedRemoveEvent = function(doc) {
    check(doc, Schemas.Events);

    // pick out only the part we need for uniqueness
    var keyedDoc = _.pick(doc, 'name');
    // TODO: pick out ID and use that to delete
    Events.remove(keyedDoc, function(error, result) {
        if (error) {
            console.log("Error during validated remove.");
            console.log(error);
            throw new Meteor.Error(500, "Problem removing from MongoDB.");
        }
    });
};

// set up methods exposed to client
Meteor.methods({
    createEvent: function(name) {
        validatedCreateEvent({name: name});
    },
    createEventAutoForm: validatedCreateEvent
    //removeMethod: validatedRemoveEvent
});
