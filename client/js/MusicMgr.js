// subscribe to the events database
Meteor.subscribe("events");

// don't declare Events here; this sources model.js which already declared it
//Events = new Meteor.Collection("events");

Template.dashboard.user = function() {
    var user = Meteor.user();
    if (user && user.emails)
        return user.emails[0].address;
};

Template.dashboard.hasevents = function() {
    var user = Meteor.user();
    if (user && user.emails) {
        var email = user.emails[0].address;
        var userEvents = Events.find({user: email}, {sort: {name: 1}});
        return userEvents.count() > 0;
    } else {
        return false;
    }
};

Template.dashboard.events = function() {
    var user = Meteor.user();
    if (user && user.emails) {
        var email = user.emails[0].address;
        //return Events.find({user: email}, {sort: {name: 1}});
        return Events.find({});
    } else {
        return null;
    }
};
