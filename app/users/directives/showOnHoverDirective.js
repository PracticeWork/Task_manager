(function() {
    
    var ShowOnHoverDirective = function() {
        return {
            restirct: "EA",
            link: function(scope, element, attributes) {
                var icoSpan = element.children("span");
                element.on("mouseenter", function () {
                    icoSpan.removeClass("hidden");
                });
                element.on("mouseleave", function () {
                    icoSpan.addClass("hidden");
                });
            }
        };
    };
    
    angular.module("usersModule").directive("showOnHover", ShowOnHoverDirective);
    
}());
