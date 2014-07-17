// subscribe to the events database
Meteor.subscribe("events");

// don't declare Events here; this sources model.js which already declared it
//Events = new Meteor.Collection("events");

// Returns the Collection cursor for events for a user if user found.
// Null if no user/email found
var getEvents = function(user) {
    var userEvents = null;
    if (user && user.emails) {
        var email = user.emails[0].address;
        //var userEvents = Events.find({user: email}, {sort: {name: 1}});
        userEvents = Events.find({});
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

/**
 * Any hooks for any Autoforms are defined here
 */
AutoForm.hooks({
    // any hooks for the addEventForm
    addEventForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            // nothing special; leave as example
        },
        onError: function(operation, error, template) {
            console.log("Error in autoform");
            console.log(error);
        }
    }
});

// return name of an event
// 'this' is the Event being handled
Template.event.name = function() {
    return this.name;
};

// returns all of the playlist items for one playlist
Template.event.playlistitems = function() {
    // pull back the event with this ID, only the playlist
    var ret = Events.findOne({_id: this._id}, {fields: {playlist: 1}});

    // if a playlist exists, return the songs from it
    if (ret.playlist && ret.playlist.songs) {
        return ret.playlist.songs;
    } else {
        return new Array();
    }
};

// get artist from playlist item (see Schemas.PlaylistItem)
Template.playlistitem.artist = function() {
    return this.artist;
}
// get song title from playlist item (see Schemas.PlaylistItem)
Template.playlistitem.title = function() {
    return this.title;
}
