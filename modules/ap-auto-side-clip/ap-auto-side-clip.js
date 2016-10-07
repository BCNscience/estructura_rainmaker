app.register("ap-auto-side-clip", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenTo(app.slide, 'slide:enter', this.autoSideClipHandler.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        autoSideClipHandler: function (data) {
            var $slide = $("#" + data.id);

            // search for auto-side-clip elements not already set up
            $slide.find(".auto-side-clip:not(.configured)").each(function () {

                // mark thise auto-side-clip as already set up
                var $content = $(this).addClass("configured");

                var $sideClipHandle = $("<div class='sideClipHandle'/>");

                $content.wrap("<div class='contentContainer'/>"); //fixes webkit scroll render bug
                var $contentContainer = $content.parent();

                $contentContainer.wrap("<div class='sideClipContainer'/>");
                var $sideClipContainer = $contentContainer.parent();

                $sideClipHandle.appendTo($sideClipContainer);
                var $sideClipOverlay = $("<div class='sideClipOverlay'/>");
                $sideClipOverlay.insertBefore($sideClipContainer);

                function toggleSideClip() {
                    $sideClipContainer.toggleClass("active");
                    $sideClipOverlay.toggleClass("active");
                }

                $sideClipHandle.add($sideClipOverlay).on("tap", toggleSideClip);

                $sideClipOverlay.on("swipedown swipeup swiperight swipeleft", function (e) {
                    toggleSideClip();
                    e.stopPropagation();
                });
                $sideClipContainer.on("swipedown swipeup swiperight swipeleft", function (e) {
                    e.stopPropagation();
                });
            });
        }
    }

});