$(document).ready(function () {
 var activeTab = $(".active"),
 listItem = $("li.navItem:not(.active)");

 listItem.hover(
 function () {
 var currentText = this.id,
 currentRef = "#" + currentText + "Streams",
 currentLink = $("<a></a>").attr("href", currentRef).text(currentText);

 activeTab.css("width", "24px").find("a").hide();
 $(this).css("width", "72px").append(currentLink);

 }, function () {
 $(this).empty().css("width", "24px");
 activeTab.css("width", "72px").find("a").show();

 }
 );

 });


var allPromises = [],
    streamersNames = ["esl_sc2", "freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"];

streamersNames.forEach(function (item) {
    allPromises.push($.getJSON('https://api.twitch.tv/kraken/streams/' + item));
});

Promise.all(allPromises).then(function (values) {
    var online = [],
        offline = [];

    for (var i = 0; i < arguments.length; i++) {
        online.push(arguments[i][0].stream.channel.display_name.toLowerCase());
    }

        for (var j=0; j<streamersNames.length; j++){
            if (online.indexOf(streamersNames[j]) == -1){
                offline.push(streamersNames[j]);
            }
        }


    console.log("Online: " + online);
    console.log("Offline: " + offline);
});


































