// model.js defines anything in the data, namely the Meteor.Collections
// that will be used by both client and server

Events = new Meteor.Collection("events");

// use collection2 schema on Events.  Make Schemas global-scope
Schemas = {};

// define schema with simple checking on name
Schemas.Events = new SimpleSchema({
    name: {
        type: String,
        label: "Event Name",
        max: 200
    }
});

// add the schema to the collection
Events.attachSchema(Schemas.Events);
