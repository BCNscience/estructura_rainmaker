app.register("ap-auto-references", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenToOnce(app.slide, 'slide:enter', this.addAutoReferences.bind(this));
            app.listenTo(app.slideshow, 'load', this.addAutoReferences.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        addAutoReferences: function (data) {

            // Load all slide html files of the currently loaded collection
            // and gather all unique reference ids (asynchronously):

            $("article.slide").each(function() {
                var $slide = $(this);
                var referenceIds = {}; // unique reference ids
                $slide.find("[data-reference-id]").each(function () {

                    referenceIds[$(this).attr("data-reference-id")] = true;
                });
                referenceIds = Object.keys(referenceIds);

                // Find media resources associated with the collected reference ids:
                var references = {};
                $.each(window.mediaRepository.metadata(), function (file, meta) {

                    if (referenceIds.indexOf("" + meta.referenceId) > -1) {
                        references[file] = meta;
                    }
                });

                var $list = $("<ul class='references'/>");
                // Render all references into the list:
                $list.append($.map(references, function (meta, file) {
                    return window.mediaRepository.render(file, meta);
                }));
                $slide.find(".auto-side-clip").prepend($list);

            });

        }
    }

});