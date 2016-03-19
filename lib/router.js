Router.configure({
    layoutTemplate: 'mainlayout',
});
Router.route('/', {
    name: 'listlastpost',
    waitOn: function() {
        var num = Number(Session.get("page")) - 1;
        var skipNum = num * 20; 
        return [Meteor.subscribe("getlastpostinstagram",skipNum)];
    }
});