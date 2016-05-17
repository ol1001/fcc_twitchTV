$(document).ready(function () {

    var listItem = $("li.navItem"),
        firstListItem = $("li.navItem:first"),
        selectedItem = firstListItem.attr("id");

    const HIDDEN_TAB_CLASS = "hiddenTab";
    const ACTIVE_TAB_CLASS = "activeTab";

    listItem.on("click mouseover mouseout", function (event) {
        var currentEventType = event.type;

        if (currentEventType == "mouseover") {
            mouseoverHandler($(this).attr("id"));
        } else if (currentEventType == "mouseout") {
            mouseoutHandler($(this).attr("id"));
        } else if (currentEventType == "click") {
            mouseclickHandler($(this).attr("id"));
        }
    });

    function mouseoverHandler(targetItem) {
        if (targetItem != selectedItem) {
            $("li#" + selectedItem).removeClass(ACTIVE_TAB_CLASS).addClass(HIDDEN_TAB_CLASS);
            $("li#" + targetItem).removeClass(HIDDEN_TAB_CLASS).addClass(ACTIVE_TAB_CLASS);
        }
    }

    function mouseoutHandler(targetItem) {
        if (targetItem != selectedItem) {
            $("li#" + targetItem).removeClass(ACTIVE_TAB_CLASS).addClass(HIDDEN_TAB_CLASS);
            $("li#" + selectedItem).removeClass(HIDDEN_TAB_CLASS).addClass(ACTIVE_TAB_CLASS);
        }
    }

    function mouseclickHandler(targetItem) {
        selectedItem = targetItem;
        if (selectedItem == "online") {
            $("li.onlineStreamers").show();
            $("li.offlineStreamers").hide();
        } else if (selectedItem == "offline") {
            $("li.offlineStreamers").show();
            $("li.onlineStreamers").hide();
        } else if (selectedItem == "all") {
            $("li.offlineStreamers").show();
            $("li.onlineStreamers").show();
        }
    }

    var allPromises = [],
        streamersNamesArray = ["OgamingSC2", "freecodecamp", "brunofin", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"];


    streamersNamesArray.forEach(function (streamName) {
        allPromises.push(
            new Promise(
                function (resolve) {
                    $.getJSON('https://api.twitch.tv/kraken/streams/' + streamName + '?callback=?',
                        function (stream) {
                            if (stream.error) {
                                resolve({
                                    "status": "Never existed or closed",
                                    "name": streamName,
                                    "logo": null,
                                    "link": "#"
                                });
                            } else {
                                if (stream.stream == null) {
                                    $.getJSON(stream._links.channel + '?callback=?', function (channel) {
                                        resolve({
                                            "status": "Offline",
                                            "name": channel.display_name,
                                            "logo": channel.logo,
                                            "link": channel.url
                                        })
                                    });
                                } else {
                                    resolve({
                                        "status": stream.stream.channel.status,
                                        "name": stream.stream.channel.display_name,
                                        "logo": stream.stream.channel.logo,
                                        "link": stream.stream.channel.url
                                    })
                                }
                            }
                        }
                    );
                }));
    });

    Promise.all(allPromises).then(function (values) {
            replaceLogoIfNull(values);
            createSectionContent(values);
        }
    );

    function createSectionContent(streamersInfoArray) {

        var streamList = $('<ul class="streamers"/>').appendTo($("section#content"));

        if (!streamersInfoArray) return;

        $.each(streamersInfoArray, function (i, stream) {
            if (stream.status != "Offline" && stream.status != "Never existed or closed") {
                streamList
                    .append("<li class='onlineStreamers'><img class='streamLogo' src='" + stream.logo + "' alt='?' /><a href='" + stream.link + "'>" + stream.name + "<span class='streamStatus'>: current status - </span><strong>" + stream.status + "</strong></a></li>");
            } else {
                streamList
                    .append("<li class='offlineStreamers'><img class='streamLogo' src='" + stream.logo + "' alt='?' /><a href='" + stream.link + "'>" + stream.name + "<span class='streamStatus'>: current status - </span><strong>" + stream.status + "</strong></a></li>");
            }
        });

    }

});

function replaceLogoIfNull(jsonArrayOfStreams) {
    jsonArrayOfStreams.forEach(function (stream) {
        if (stream.logo == null) stream.logo = "img/logo_null.jpg";
    });
}



























