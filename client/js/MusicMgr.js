Events = new Meteor.Collection("events");

Template.dashboard.user = function() {
    var user = Meteor.user();
    if (user && user.emails)
        return user.emails[0].address;
};

Template.dashboard.hasevents = function() {
    var user = Meteor.user();
    if (user && user.emails) {
        var email = user.emails[0].address;
        return Events.find({user: email}, {sort: {name: 1}}).count() > 0;
    } else {
        return false;
    }
};

Template.dashboard.events = function() {
    var user = Meteor.user();
    if (user && user.emails) {
        var email = user.emails[0].address;
        return Events.find({user: email}, {sort: {name: 1}});
    } else {
        //return new Array("No events!");
        return null;
    }
};
