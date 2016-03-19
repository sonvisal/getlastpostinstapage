Session.set('page',1);

 // Meteor.startup(function () {
 //     var url = "https://www.instagram.com/dior/";
 //     var numberlastpost=1;
 //        Meteor.call("getlastpost", url, numberlastpost, function(error, data) {
 //            if (error) {
 //                console.log(error);

 //            } else {
 //                console.log(data);
 //            };
 //        });
 //    });
Template.listlastpost.helpers({
    getlastpostinstagram: function() {
        result = getlastpostinstagram.find({});
        return result;
    }
});

Template.listlastpost.events({
    "click .getlastpost": function() {
        var url = "https://www.instagram.com/dior/";
        // var numberlastpost = $(".numberlastpost").val();
        Meteor.call("getlastpost", url, function(error, data) {
            if (error) {
                console.log(error);

            } else {
                console.log(data);
            };
        });

    },
    "click .next": function(e) {
        e.preventDefault();
        var dnext = getlastpostinstagram.find({}).count();
        if (dnext < 20) {
            $(".next").css("display", "none");
        } else {
            Session.set('page', Session.get('page') + 1);
        }
    },
    "click .prev": function(e) {
        e.preventDefault();
        var dnext = getlastpostinstagram.find({}).count();
        if (Session.get('page') == 1) {
            $(".prev").css("display", "none");
        } else {
            Session.set('page', Session.get('page') - 1);
        }
    }
});
