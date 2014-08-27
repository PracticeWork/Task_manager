(function() {
    
    var ShowOnHoverDirective = function() {
        return {
            restirct: "EA",
            link: function(scope, element, attributes) {
                var icoSpan = element.children("span");
                element.on("mouseenter", function () {
                    icoSpan.toggleClass("hidden");
                });
                element.on("mouseleave", function () {
                    icoSpan.toggleClass("hidden");
                });
            }
        };
    };
    
    angular.module("usersModule").directive("showOnHover", ShowOnHoverDirective);
    
}());
