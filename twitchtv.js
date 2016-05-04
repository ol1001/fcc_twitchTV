$(document).ready(function () {

    $("li.navItem").mouseenter(
        function () {
            var currentListItem = $(this)[0];
            console.log(currentListItem.find("a"));
            //    currentLink = currentListItem.children("a");
            //currentLink.innerHTML = "ok";
            //console.log(currentLink);

        }
    );

});

