/**
 * Implements the Collections Overview.
 * ------------------------------------
 * This module Presents an overview of the default collections set in presentation.json and allows loading slides by tapping on their thumbnails.
 *
 * @class Overview
 * @extends Module
 * @constructor
 * @param {object} options Valid properties are:
 *     - $container: jQuery DOM object inside which to load the module
 *     - slideTapAction: one of the following strings representing what to do when a thumbnail receives the tap event
 *         - "goto" => goto slide on tap
 *         - "noop" => do nothing
 *         - "showPreview" => (NOT IMPLEMENTED) shows a bigger thumbnail of the slide
 *     - disableScrollOnSlideDrag: {boolean}
 */

app.register("ap-overview", function () {
    var self;
    var eventNamespace = ".overview";
    var $collectionsList;
    var $collectionOverview;
    var $collectionContainer;
    var _mouseDownEvent;
    var _mouseUpEvent;

    return {
        slideTapAction: ["goto", "noop", "showPreview"][0],
        disableScrollOnSlideDrag: false,
        publish: {
            iscustomoverview: false,
            highlightCurrentSlide: true
        },
        events: {
            "tap .overview .collectionName": "collectionsListHandler",
            "tap .overview .o_slide": "slideHandler"        },
        states: [
            {
                id: "visible"
            },
            {
                id: "customOverview"
            }
        ],
        onRender: function (el) {



            self = this;

            app.$.overview = this;

            this.normalizeCollections();

            if (this.props.iscustomoverview){
                this.goTo("customOverview");
            }

            _mouseDownEvent = touchy.events.start + eventNamespace;

            _mouseUpEvent = touchy.events.end + eventNamespace;

            $collectionsList = $(el).find(".collectionsList"); // available collections container
            $collectionOverview = $(el).find(".collectionOverview"); // selected collection overview container
            $collectionContainer = $collectionOverview.find(".o_collection"); // actual collection thumbnail
            var $overview = $(el).find('#overview');

            $collectionsList.empty();

            app.$.on('open:ap-overview', function () {
                if(this.stateIsnt("visible"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-overview', function () {

                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            app.$.on('insert:ap-overview', function () {
                this.goTo("custom-overview");
                this.updateOverview();
            }.bind(this));

        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {
        },

        hide: function () {
            app.unlock();
            this.reset();
        },

        show: function () {
            this.goTo('visible');
            app.lock();
            self.slideTapAction = "goto";
            app.$.customCollections.hide();
            this.updateOverview();
        },

        showCustomOverview: function () {
            this.goTo('customOverview');
            self.slideTapAction = "noop";
            self.disableScrollOnSlideDrag = true;
            this.updateOverview();
        },

        unload: function () {
            $collectionsList.empty();
        },

        updateOverview: function () {

            var $body = $("body");

            $collectionsList = $(".overview .collectionsList"); // available collections container


            $collectionContainer = $collectionOverview.find(".o_collection"); // actual collection thumbnail
            var $overview = $('.overview');

            $collectionsList.empty();

            var storyboards = app.model.get().storyboards;


            //traverse app.json and get the collections list (ignoring custom collections)
            $.each(storyboards, function (index, collection) {

                if(collection.type !== "collection") return;

                if (collection.id.indexOf('custom') == -1 ) {
                    var $collectionName = $("<div class='collectionName' />");
                    $.extend({id: collection.id}, collection);
                    $collectionName.data("collection", collection);
                    $collectionName.attr("data-collectionId", collection.id);
                    $collectionName.text(collection.name);
                    $collectionsList.append($collectionName);
                }
            });

            // get custom collections
            $.each(app.$.customCollectionsStorage.getAll(), function (name, content) {
                if (content.slideshows.length != 0) {
                    var $collectionName = $("<div class='collectionName' />");
                    $collectionName.data("collection", content);
                    $collectionName.attr("data-collectionId", content.id);
                    $collectionName.text(content.name);
                    $collectionsList.append($collectionName);
                }
            });


            /* very strange fix, which currently works */
            var $currentCollection = $collectionsList.find("[data-collectionid='" + app.getPath().split("/")[0] + "']");
            var tempEvent = {
                target: $currentCollection
            };
            self.collectionsListHandler(tempEvent);


            if (this.props.iscustomoverview) {

                $collectionOverview = $(".custom-collections .overview .collectionOverview"); // selected collection overview container
            }
            else {

                $collectionOverview = $(".overview .collectionOverview"); // selected collection overview container
            }


            if(self.scroll) self.scroll.destroy();

            self.scroll = new IScroll( $(".overview .collectionOverview").get(0), {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });

            if(self.scrollCustom) self.scrollCustom.destroy();
            self.scrollCustom = new IScroll( $(".custom-collections .overview .collectionOverview").get(0), {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });


            if (self.disableScrollOnSlideDrag) {
                $collectionContainer.on(_mouseDownEvent, ".o_slide", function () {
                    self.scrollCustom.disable();
                    $("body").one(_mouseUpEvent, function () {
                        self.scrollCustom.enable();
                    });
                });
            }


        },

        normalizeCollections: function() {

            var allCollections = app.model.get().storyboards;

            $.each(allCollections, function(i, collection){

                    if(!collection.id && !collection.type){
                        var newContent = [];
                        $.each(collection.content, function(index, content){
                            var slideShowName;
                            switch (index) {
                                case 0:
                                    slideShowName = "Home";
                                    break;
                                case content.length - 1:
                                    slideShowName = "Summary";
                                    break;
                                default:
                                    slideShowName = "Chapter " + index
                            }

                            var slideShowId;
                            if(typeof content === 'string'){
                                slideShowId = content + "-chapter-" + Math.floor((Math.random() * 10000) + 1);

                            }else
                            {
                                slideShowId = slideShowName + "-" + Math.floor((Math.random() * 10000) + 1);

                            }

                            var temp = {
                                "id": slideShowId,
                                "name": slideShowName,
                                "type": "slideshow",
                                "content": content
                            };
                            app.model.addStructure(slideShowId, temp);
                            newContent.push(slideShowId);
                        });

                        app.model.deleteStoryboard(i);
                        var collectionId =  collection.name + "_" + Math.floor((Math.random() * 10000) + 1);
                        var collectionObj = {
                            "id": collectionId,
                            "name": collection.name,
                            "linear": false,
                            "type": "collection",
                            "content": newContent
                        };
                        app.model.addStoryboard(collectionId,collectionObj);
                    }
                }
            );

        },

        collectionsListHandler: function (event) {

            $collectionsList.find(".selected").removeClass('selected');
            $(event.target).addClass('selected');
            // load the selected collection

            var collection = $(event.target).data("collection");
            var collectionId = $(event.target).attr("data-collectionId");



            $collectionContainer
                .empty()
                .attr("data-id", collectionId)
                .data('contentGroups', app.model.getStoryboard(collectionId).contentGroups);
            // TODO add Class and Data
            if (collection.isCustomPresentation) {
                collection.contentGroups = app.model.getStoryboard(collectionId).contentGroups;
                $.each(collection.slideshows, function (index, slideshow) {
                    var $slideshow = $("<div class='o_slideshow' />")
                        .appendTo($collectionContainer)
                        .attr("data-id", slideshow.id)
                        .append("<div class='o_slideshowName'>" + slideshow.name + "</div>");
                    $.each(slideshow.content, function (index, slideId) {
                        var $slide = $("<div class='o_slide' />")
                            .appendTo($slideshow)
                            .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                            .attr("data-id", slideId);
                        if (collection.contentGroups) {
                            $.each(collection.contentGroups, function (i, group) {
                                if (~group.slides.indexOf(slideId)) {
                                    $slide.data('contentGroup', group);
                                    $slide.addClass('grouped');
                                    if (group.orientation == 'horizontal') {
                                        $slide.parents('.o_slideshow').addClass('grouped');
                                    }
                                }
                            });
                        }
                        $slide.text(app.model.get().slides[slideId].name);
                    });
                });


                if (collection.slideshows.length > 0 && app.model.hasStoryboard(collection.id) == false) {
                    var slideshowIdArray = [];
                    $.each(collection.slideshows, function (i, slideshow) {
                        slideshowIdArray.push(slideshow.id);
                        var slidesArrary = [];
                        $.each(slideshow.content, function (i, slide) {
                            slidesArrary.push(slide);
                        });

                        app.model.addStructure(slideshow.id, slideshow);
                    });

                    var collectionObj = {
                        "content": slideshowIdArray,
                        "name": collection.name,
                        "linear": false,
                        "id": collection.id,
                        "type": "collection"
                    };

                    app.model.addStoryboard(collection.id, collectionObj);

                }


            }
            else {

                collection = app.model.getStoryboard(collectionId);

                $.each(collection.content, function (index, slideshowId) {

                    var slideshow = app.model.getStructure(slideshowId);
                    slideshow = $.extend({id: slideshowId}, slideshow);
                    var $slideshow = $("<div class='o_slideshow' />")
                        .appendTo($collectionContainer)
                        .attr("data-id", slideshow.id)
                        .append("<div class='o_slideshowName'>" + slideshow.name + "</div>");



                    if (typeof slideshow.content === 'string'){
                        var slideId = slideshow.content;
                        var $slide = $("<div class='o_slide' />")
                            .appendTo($slideshow)
                            .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                            .attr("data-id", slideId);
                        if (collection.contentGroups) {
                            $.each(collection.contentGroups, function (i, group) {
                                if (~group.slides.indexOf(slideId)) {
                                    $slide.data('contentGroup', group);
                                    $slide.addClass('grouped');
                                    if (group.orientation == 'horizontal') {
                                        $slide.parents('.o_slideshow').addClass('grouped')
                                    }
                                }

                            });
                        }
                        $slide.text(app.model.get().slides[slideId].name);
                    }else
                    {
                        $.each(slideshow.content, function (index, slideId) {
                            var $slide = $("<div class='o_slide' />")
                                .appendTo($slideshow)
                                .css({"background-image": "url(slides/" + slideId + "/" + slideId + " .png)"})
                                .attr("data-id", slideId);
                            if (collection.contentGroups) {
                                $.each(collection.contentGroups, function (i, group) {
                                    if (~group.slides.indexOf(slideId)) {
                                        $slide.data('contentGroup', group);
                                        $slide.addClass('grouped');
                                        if (group.orientation == 'horizontal') {
                                            $slide.parents('.o_slideshow').addClass('grouped')
                                        }
                                    }

                                });
                            }

                            $slide.text(app.model.get().slides[slideId].name);
                        });
                    }



                });
            }

            var slideThumbSelector = "";
            $.each(app.getPath().substr().split("/"), function (i, id) {
                slideThumbSelector += "[data-id='" + id + "'] ";
            });
            $collectionOverview.find(".highlighted").removeClass('highlighted');
            $collectionOverview.find(slideThumbSelector).addClass('highlighted');


        },

        slideHandler: function (event) {
            if (self.slideTapAction === "goto") {
                var slideId = $(event.target).attr("data-id");
                var slideshowId = $(event.target).parent().attr("data-id");
                var collectionId = $(event.target).parent().parent().attr("data-id");

                var path = collectionId + "/" + slideshowId + "/" + slideId;

                app.goTo(path);
                app.$.menu.updateCurrent();
                app.$.toolbar.hide();

            } else if (self.slideTapAction === "noop") {
                //do nothing
            }

        }
    }

});