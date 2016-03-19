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
        var url2 = "https://www.instagram.com/safir/";
        var url3 = "https://www.instagram.com/google/";
        var url4 = "https://www.instagram.com/facebook/";
        var url5 = "https://www.instagram.com/pink/";
        // console.log(" url "+url2+);
        Meteor.call("getlastpost", url,url2,url3,url4,url5, function(error, data) {
            if (error) {
                console.log("Erro function :"+error);

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
