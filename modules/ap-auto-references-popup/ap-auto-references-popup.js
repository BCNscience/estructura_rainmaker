app.register("ap-auto-references-popup", function () {

    return {
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {
            app.listenTo(app.slide, 'slide:enter', this.autoReferencePopupHandler.bind(this));
        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        autoReferencePopupHandler: function (data) {
            var $slide = $("#" + data.id);

            $slide.find("[data-reference-id]")
                .off('tap.auto-references-popup')
                .on('tap.auto-references-popup', function () {

                    // Collect unique reference ids:
                    var referenceIds = {};
                    $slide.find("[data-reference-id]").each(function () {

                        var referenceId = $(this).attr("data-reference-id");

                        if (referenceId.indexOf('-') > -1) {
                            var range = referenceId.split('-');
                            var from = parseInt(range[0]);
                            var to = parseInt(range[1]);

                            for(var i = from; i <= to; i++){
                                referenceIds[i] = true;
                            }
                        }
                        else
                        {
                            var ids = referenceId.split(',');


                            $.each(ids, function (index, value) {
                                referenceIds[value] = true;
                            });
                        }
                    });
                    referenceIds = Object.keys(referenceIds);

                    // Find media resources associated with the collected reference ids:
                    var references = {};
                    $.each(window.mediaRepository.metadata(), function (file, meta) {
                        if (referenceIds.indexOf("" + meta.referenceId) > -1) {
                            references[file] = meta;
                        }
                    });

                    // Render all references into a list:
                    var $list = $("<ul class='references'/>");
                    $list.append($.map(references, function (meta, file) {
                        return window.mediaRepository.render(file, meta);
                    }));

                    // Put list in popup:
                    var $popup = $('<div class="auto-references-popup" />')
                        .append('<div class="x">⊗</div>')
                        .append('<h1>References</h1>')
                        .append($list);

                    // Put popup in overlay:
                    $('<div class="auto-references-popup-overlay" />')
                        .append($popup)
                        .on("swipedown swipeup swiperight swipeleft", function (e) {
                            e.stopPropagation();
                        })
                        .on("tap", function (event) {
                            if ($(event.target).is(":not(.auto-references-popup, .auto-references-popup *) .x")) $(this).remove();
                        }).appendTo("#presentation");
                });
        }
    }

});