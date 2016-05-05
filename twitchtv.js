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

