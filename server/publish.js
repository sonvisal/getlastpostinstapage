
Meteor.publish('getlastpostinstagram', function(skip) {
        return getlastpostinstagram.find({}, { skip: skip, limit: 20 });
});