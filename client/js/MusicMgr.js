// subscribe to the events database
Meteor.subscribe("events");

// don't declare Events here; this sources model.js which already declared it
//Events = new Meteor.Collection("events");

// Returns the Collection cursor for events for a user if user found.
// Null if no user/email found
var getEvents = function(user) {
    var userEvents = null;
    console.log("getEvents");
    if (user && user.emails) {
        var email = user.emails[0].address;
        //var userEvents = Events.find({user: email}, {sort: {name: 1}});
        console.log("getEvents: valid user '" + email + "'");
        userEvents = Events.find({});
        console.log("getEvents: events: '" + userEvents.fetch()[0].name + "'");
    }
    return userEvents;
}

// return current user's email
Template.dashboard.user = function() {
    var user = Meteor.user();
    if (user && user.emails)
        return user.emails[0].address;
};

// return true if the user exists and has events
Template.dashboard.hasevents = function() {
    var user = Meteor.user();
    var userEvents = getEvents(user);
    return (userEvents && userEvents.count() > 0);
};

// return a cursor over all events for this user
Template.dashboard.userevents = function() {
    var user = Meteor.user();
    return getEvents(user);
};

// return name of an event
Template.event.name = function() {
    return this.name;
};
