Meteor.methods({
    getlastpost: function(url,url2,url3,url4,url5) {
        var array=[url,url2,url3,url4,url5];
        for (var i =0;i<array.length;i++){
            request({
            url: array[i],
            header: {
                "User-Agent": "request"
            }
        }, 
        Meteor.bindEnvironment(function(error, response, data) {
            if (!error && response.statusCode == 200) {
                var debut = data.indexOf("sharedData") + 13;
                var fin = data.indexOf(";<");
                var chaine = data.substring(debut, fin);
                var jsonObj = JSON.parse(chaine);
                var i = 0;
                var arr=[];
                for (i = 0; i < 5; i++) {
                    var lien = 'https://www.instagram.com/p/' + jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].code; //jsonObj.entry_data.ProfilePage[0].user.nodes[i].link;
                    var nom = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].code; //lien.split("/")[4];
                    var curDate = Date.now();
                    var d = new Date(curDate);
                    var format = +d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                    var imageurl = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].thumbnail_src;
                    var contenttext = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].caption;
                    var nblike = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].likes.count;
                    var nbcomment = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].comments.count;

                    var timepro = jsonObj.entry_data.ProfilePage[0].user.media.nodes[i].date;
                    var currenttime = (new Date).getTime() / 1000;
                    var different = currenttime - timepro;
                    var obj = {
                        
                            textcontents: contenttext,
                            image: imageurl,
                            like: nblike,
                            comment: nbcomment
                       
                    }
                    arr.push(obj);

                    // if (different == 259200) {

                        


                    // } else {
                    //     console.log("more then 2 day");
                    // }

                }
                var compairpost = getlastpostinstagram.findOne({"textcontents":contenttext});
                if (compairpost) {
                    if (compairpost.textcontents == contenttext) {
                        if (compairpost.like == nblike) {
                            console.log("like no update");
                        } else {
                            console.log("like  update ");
                            getlastpostinstagram.update({ "textcontents": contenttext }, { $set: { like: nblike } });
                        }

                        if (compairpost.comment == nbcomment) {
                            console.log("comment no update");
                        } else {
                            console.log("comment  update ");
                            getlastpostinstagram.update({ "textcontents": contenttext }, { $set: { comment: nbcomment } });
                        }
                    } else {
                        getlastpostinstagram.insert(obj);
                    }
                }else {
                    console.log("collection empty");
                    getlastpostinstagram.insert(arr);
                }

            } else {
                console.log("can not request");
            }


        }));
        }
        
    }
});
