// model.js defines anything in the data, namely the Meteor.Collections
// that will be used by both client and server

Events = new Meteor.Collection("events");

// use collection2 schema on Events.  Make Schemas global-scope
Schemas = {};

// a PlaylistItem has a song title and song artist
Schemas.PlaylistItem = new SimpleSchema({
    title: {
        type: String,
        label: "Song Title",
    },
    artist: {
        type: String,
        label: "Song Artist",
    }
});

// a Playlist has an array of PlaylistItems
Schemas.Playlist = new SimpleSchema({
    songs: {
        type: [Schemas.PlaylistItem],
        minCount: 0,
        label: "Song"
    }
});

// define schema with simple checking on name
Schemas.Events = new SimpleSchema({
    name: {
        type: String,
        label: "Event Name",
        max: 200
    },
    playlist: {
        type: Schemas.Playlist,
        label: "Playlist"
    }
});

// add the schema to the collection
Events.attachSchema(Schemas.Events);
