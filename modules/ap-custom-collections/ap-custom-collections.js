app.register("ap-custom-collections", function () {


    var self;
    var eventNamespace = ".custom-collections";
    var _mouseMoveEvent;
    var _mouseUpEvent;
    var _mouseDownEvent;


    return {
        presentationName: null,
        dragData: null,
        publish: {},
        events: {
            "touchstart .o_slide": "startDragEventHandler",
            "MSPointerDown .o_slide": "startDragEventHandler",
            "tap .collectionName": function (event) {
                self.markAlreadyUsedSlides();
            }
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {

            self = this;
            self.dragData = null;
            app.$.customCollections = this;

            app.$.on('open:ap-custom-collections', function (data) {
                this.show();

                this.load(data.presentationName);
            }.bind(this));

            app.$.on('close:ap-custom-collections', function () {
                this.hide();
                this.unload();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            /*
             app.$.on("toolbar:load-module", function(moduleToLoad){
             console.log(moduleToLoad.id);

             if(self.props.dataModule != moduleToLoad.id && this.stateIsnt("hide"))
             {
             console.log("unload" + moduleToLoad.id);

             }

             }.bind(this));
             */

            var $editZone = $(".editZone");

            $(".cancel").on("tap", function () {
                // user canceled, so go back to the custom collection menu without saving
                self.unload();
                self.hide();
                app.$.overview.hide();
                app.$.customCollectionsMenu.show();

            });
            $(".save").on("tap", function () {

                // save and then go back to the custom collection menu
                var presentation = $.map($editZone.find(".o_slideshow"), function (slideshow) {
                    return [$.map($(slideshow).find(".o_slide"), function (slide) {
                        return $(slide).attr("data-id");
                    })];
                });


                var slides = [];
                var contentArray = [];
                $.each(presentation, function (index, slideshows) {
                    $.each(slideshows, function (index, id) {
                        slides.push(id);

                    })
                });

                var slideshowArray = [];

                var slideshowIdArray = [];
                $.each(presentation, function (i, slideshow) {

                    var slideshowId = "custom-slideshow-" + Math.floor((Math.random() * 10000) + 1);
                    var slideShowName;
                    switch (i) {
                        case 0:
                            slideShowName = "Home";
                            break;
                        case presentation.length - 1:
                            slideShowName = "Summary";
                            break;
                        default:
                            slideShowName = "Chapter " + i
                    }


                    slideshowIdArray.push(slideshowId);

                    var slideshowObj = {id: slideshowId, name: slideShowName, type: "slideshow", content: slideshow};
                    slideshowArray.push(slideshowObj);

                    app.model.addStructure(slideshowId, slideshowObj);

                });


                //var homeSlideName = slideshowArray[0].id;

                var collectionId;
                if (!app.model.hasStoryboard(self.presentationName))
                    collectionId = "custom-collection-" + Math.floor((Math.random() * 10000) + 1);
                else
                    collectionId = app.model.getStoryboard(self.presentationName).id;


                var customCollection = {
                    id: collectionId,
                    name: self.presentationName,
                    type: "collection",
                    slideshows: slideshowArray,
                    slides: slides,
                    presentation: presentation,
                    isCustomPresentation: true
                };


                app.model.addStoryboard(self.presentationName, {
                    id: collectionId,
                    name: self.presentationName,
                    content: slideshowIdArray,
                    type: "collection"
                });


                app.$.customCollectionsStorage.add(self.presentationName, customCollection);
                app.$.contentGroups.validateContentgroups();

                self.unload();
                self.hide();
                app.$.overview.hide();
                app.$.customCollectionsMenu.show();

                //app.json.storyboard.push(collectionId);
                //window.app.menu.attachTo = app.json.storyboard;

            });


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
            this.unload();


        },

        show: function () {
            app.lock();
            this.goTo('visible');
        },

        load: function (presentationName) {
            self.presentationName = presentationName;

            _mouseMoveEvent = touchy.events.move + eventNamespace;
            _mouseUpEvent = touchy.events.end + eventNamespace;
            _mouseDownEvent = touchy.events.start + eventNamespace;


            var $document = $(document);
            var slideHTML = "<div class='o_slide'>"; // thumbnail template
            var slideshowHTML = "<div class='o_slideshow'>"; // slideshow template
            var collectionHTML = "<div class='o_collection'>"; // collection template


            $(".presentationName").text(presentationName);

            var $editZone = $(".editZone");
            var storage = app.$.customCollectionsStorage.get(presentationName);
            var $overview = $(".overview");


            // add home and summary slides to the new presentation

            if (storage.presentation.length === 0) {
                storage.slideshows = [{
                    "id": "home_slideshow",
                    "name": "Home",
                    "type": "slideshow",
                    "content": ["home_slide"]
                }, {
                    "id": "summary_slideshow",
                    "name": "Summary",
                    "type": "slideshow",
                    "content": ["summary_slide"]
                }];
                storage.slides = ["home_slide", "summary_slide"];
                storage.presentation = [
                    ["home_slide"],
                    ["summary_slide"]
                ];
            }


            // create the initial DOM representation from stored presentation
            var $o_collection = $(collectionHTML).append($.map(storage.presentation, function (slideshow) {
                var $slideshow = $(slideshowHTML);
                $slideshow.append($.map(slideshow, function (slideId) {

                    var $slide = $(slideHTML).attr("data-id", slideId).text(app.model.get().slides[slideId].name);
                    $slide.css({"background-image": "url(slides/" + slideId + "/" + slideId + ".png)"});


                    $.each(app.$.contentGroups.json, function (groupName, group) {
                        if (group.slides.indexOf(slideId) < 0) {
                            return
                        }
                        $slide.data('contentGroup', group);
                        $slide.addClass('grouped');
                        if (group.orientation === 'horizontal') {
                            $slideshow.addClass('grouped');
                        }
                    });

                    return $slide;
                }));
                return $slideshow;
            }));

            $editZone.append($o_collection);

            self._setupPlaceholders();
            self.markAlreadyUsedSlides();

            var slideWidth = 136;
            var slideHeight = 102;

            app.$.overview.showCustomOverview();


            self.markAlreadyUsedSlides();

            // each time a new collection is selected on the overview, new slide thumbnails are created
            // so we have to re-mark the slides which are already present in the edit zone


            self.scroll = new IScroll($editZone[0], {
                scrollbars: true,
                mouseWheel: true,
                scrollX: true,
                directionLockThreshold: Number.MAX_VALUE
            });


            /*
             Stores information about the dragged slide while it is being dragged.
             At runtime it looks like this:
             {
             startPos: {
             x: number,
             y: number
             },
             $clone: (jQ object) draggable slide clone,
             $original: (jQ object) original slide,
             currentTarget: DOM element
             */


            $document.on(_mouseMoveEvent, function (event) {
                if (event.target.classList.contains('alreadyUsed')) {
                    // slide comes from the overview and is already present in the edit zone
                    // so we forbid it by returning now
                    return;
                }
                if (self.dragData == null || self.dragData == undefined) return; // if drag data is undefined, the user is not dragging anything

                var touch, target;

                self.dragData.didDrag = true;

                if (touchy.isTouch) {
                    touch = event.originalEvent.targetTouches[0];
                    target = document.elementFromPoint(touch.pageX, touch.pageY);
                } else {
                    touch = event;
                    target = event.target;
                }
                /* Drag Move*/
                self.dragData.$clone.css("transform",
                    "translate3d(" +
                    (touch.pageX - self.dragData.startPos.x) + "px," +
                    (touch.pageY - self.dragData.startPos.y) + "px," +
                    "0" +
                    ")"
                );


                self.dragData.$clone.css("z-index", "9999");
                /* Drag over */

                var newTarget = null;
                var contentGroup = self.dragData.$original.data('contentGroup');
                if (target && target.classList.contains("o_slide")) {

                    // if dragging over a slide, decide which placeholder (over, under, left, right) to mark
                    // based on over which quartile the finger (mouse) is
                    var $underlyingSlide = $(target);
                    var overSlidePos = $underlyingSlide.offset();
                    var x = (overSlidePos.left + slideWidth / 2) - touch.pageX;
                    var y = (overSlidePos.top + slideHeight / 2) - touch.pageY;
                    var angle = Math.atan2(y, -x);
                    var PI = Math.PI;
                    var $underlyingSlideshow = $underlyingSlide.parent();
                    if (angle > -PI / 4 && angle < PI / 4) { // right
                        newTarget = $underlyingSlideshow.next(".placeholder")[0];
                    } else if (angle > PI / 4 && angle < PI * 3 / 4) { // over
                        newTarget = $underlyingSlide.prev(".placeholder")[0];
                    } else if (angle > PI * 3 / 4 || angle < -PI * 3 / 4) { // left
                        newTarget = $underlyingSlideshow.prev(".placeholder")[0];
                    } else if (angle > -PI * 3 / 4 && angle < -PI / 4) { // under
                        newTarget = $underlyingSlide.next(".placeholder")[0];
                    }
                    if (!(contentGroup && contentGroup.orientation == 'horizontal' && $(target).parent('.o_collection').length > 0)) {
                        newTarget = null;
                    } else {
                        $editZone.addClass("highlighted");
                    }


                } else if (target && target.classList.contains('placeholder')) {
                    newTarget = target;
                    if (contentGroup && contentGroup.orientation == 'horizontal' && !($(target).parent('.o_collection').length > 0)) {
                        newTarget = null
                    }
                }
                if (self.dragData.currentTarget !== newTarget) {
                    if (self.dragData.currentTarget) self.dragData.currentTarget.classList.remove("target");
                    self.dragData.currentTarget = null;
                    if (newTarget) {
                        self.dragData.currentTarget = newTarget;
                        self.dragData.currentTarget.classList.add("target");
                    }
                }
            });

            $document.on(_mouseUpEvent, function (event) {

                /* Drop */
                if (self.dragData == null || self.dragData == undefined) return;	// if drag data is undefined, the user is not dragging anything
                self.dragData.$original.removeClass("source");

                if (self.dragData.currentTarget) {
                    /* Drop Insert */
                    var $newSlide = self.dragData.$original.clone(true).off().removeClass("highlighted");

                    $(self.dragData.currentTarget).replaceWith($newSlide);

                    var contentGroup = $newSlide.data('contentGroup');
                    if (contentGroup) {
                        $newSlide.addClass('grouped');
                        if (contentGroup && contentGroup.orientation == 'vertical' && !$newSlide.parent().is(".o_slideshow")) {
                            $newSlide.wrapAll(slideshowHTML);
                        }
                    }

                    if ($newSlide.parent().is(".o_slideshow")) {
                        $newSlide.css({
                            height: 0
                        });
                        $newSlide
                            .animate({
                                height: slideHeight
                            }, 500, "easeOutBounce", function () {
                                self.scroll.refresh();
                            });
                    } else {
                        $newSlide.wrap(slideshowHTML);
                        var $slideshow = $newSlide.parent();
                        $slideshow.css({
                            width: 0
                        });
                        $slideshow
                            .animate({
                                width: slideWidth
                            }, 500, "easeOutBounce", function () {
                                self.scroll.refresh();
                            });
                    }
                    if (contentGroup && contentGroup.orientation === 'horizontal') {
                        $newSlide.parents('.o_slideshow').addClass('grouped');
                    }
                }
                self.dragData.$clone.remove();

                var comesFromCustomPresentation = $editZone.find(self.dragData.$original).length > 0;
                if (comesFromCustomPresentation && self.dragData.didDrag) {
                    /* Delete original */
                    var originalIsAlone = (self.dragData.$original.siblings(".o_slide").length === 0);

                    if (originalIsAlone) {
                        var $slideshow = self.dragData.$original.parent();
                        var placeholder = $slideshow.prev(".placeholder");
                        placeholder.css("transition", "none");
                        $slideshow.add(placeholder)
                            .animate({
                                width: 0
                            }, 500, "easeOutBounce", function () {
                                $(this).remove();
                                self._setupPlaceholders();
                                self.markAlreadyUsedSlides();
                                self.scroll.refresh();
                            });
                    } else {
                        var placeholder = self.dragData.$original.next(".placeholder");
                        placeholder.css("transition", "none");
                        self.dragData.$original.add(placeholder)
                            .animate({
                                height: 0
                            }, 500, "easeOutBounce", function () {
                                $(this).remove();
                                self._setupPlaceholders();
                                self.markAlreadyUsedSlides();
                                self.scroll.refresh();
                            });
                    }
                }
                self._setupPlaceholders();
                self.dragData = undefined;
                self.markAlreadyUsedSlides();
                self.scroll.enable();
            });

        },

        unload: function () {
            $(".editZone").empty();
            app.$.overview.unload();
            self.dragData = null;
            $(document).off(_mouseUpEvent);
            $(document).off(_mouseMoveEvent);
        },

        _setupPlaceholders: function () {
            var placeholderHTML = "<div class='placeholder'>"; // placeholder template, slides can be dragged into placeholders
            var $editZone = $(".editZone");
            $editZone.find(".o_slide:first-child," +
            ".o_slide+.o_slide, .o_slideshow+.o_slideshow")
                .not('.o_slideshow:first-child .o_slide:first-child, ' +
                '.o_slideshow:last-child .o_slide:first-child, ' +
                '.o_slide.grouped+.o_slide.grouped, .o_slideshow.grouped + .o_slideshow.grouped')
                .before(placeholderHTML);
            $editZone.find(".o_slide:last-child")
                .not('.o_slideshow:first-child .o_slide, .o_slideshow:last-child .o_slide, .o_slideshow.grouped .o_slide')
                .after(placeholderHTML);
            $editZone.find(".o_collection:empty").append(placeholderHTML);
            $editZone.find(".placeholder+.placeholder").prev().remove();
            $editZone.find(".o_slideshow > .placeholder:only-child, .o_slideshow:empty").remove();
            $editZone.find(".placeholder+.placeholder").prev().remove(); // must be repeated!

            // show the first vertical placeholder fully so that you see immediately where you need to drop the first slide(s)
            if ($editZone.find('.o_slideshow + .placeholder + .o_slideshow').length == 1) {
                $editZone.find('.o_slideshow + .placeholder + .o_slideshow').prev().addClass('expanded');
            } else {
                $editZone.find('.o_slideshow + .placeholder + .o_slideshow').prev().removeClass('expanded');
            }
        },

        markAlreadyUsedSlides: function () {
            var scope = "#" + self.id;
            var $editZone = $(".editZone");
            var $overview = $(scope + " .custom-collections .overview .collectionOverview");
            $overview.find(".alreadyUsed").removeClass("alreadyUsed");
            $editZone.find(".o_slide").each(function () {

                $overview.find("[data-id='" + $(this).attr("data-id") + "']").addClass('alreadyUsed');
            });
        },

        startDragEventHandler: function (event) {
            /* Drag Start */
            if (event.target.classList.contains('alreadyUsed')) {
                // slide comes from the overview and is already present in the edit zone
                // so we forbid it by returning now
                return;
            }

            var touch = (touchy.isTouch) ? event.targetTouches[0] : event;

            self.scroll.disable();

            var $originalSlide = $(event.target);
            var $clone = $originalSlide.clone().removeClass("highlighted");

            var contentGroups = $originalSlide.parents('.o_collection').data('contentGroups');
            var originalSlideOffsetCompensation = {
                x: 0,
                y: 0
            };

            if (contentGroups) {
                var originalSlideId = $originalSlide.data('id');
                var scope = "#" + self.id;
                $.each(contentGroups, function (groupName, group) {

                    if (group.slides.indexOf(originalSlideId) < 0) {
                        return
                    }
                    if (group.orientation === 'vertical') {
                        originalSlideOffsetCompensation = {
                            x: 0,
                            y: (group.slides.indexOf(originalSlideId) * $originalSlide.height()) * -1
                        }
                    } else {
                        originalSlideOffsetCompensation = {
                            x: (group.slides.indexOf(originalSlideId) * $originalSlide.width()) * -1,
                            y: 0
                        }
                    }


                    var selector = '';

                    $.each(group.slides, function (i, slide) {
                        if (i != 0) {
                            selector += ','
                        }
                        selector += scope + ' .o_slide[data-id="' + slide + '"]'
                    });

                    $originalSlide = $(selector);
                    $clone = $originalSlide.clone(true).off();
                });

            } else if (contentGroup = $originalSlide.data('contentGroup')) {

                var selector = '';
                $.each(contentGroup.slides, function (i, slide) {
                    if (i != 0) {
                        selector += ','
                    }
                    selector += '.editZone .o_slide[data-id="' + slide + '"]'
                });
                if (contentGroup.orientation === 'vertical') {
                    originalSlideOffsetCompensation = {
                        x: 0,
                        y: (contentGroup.slides.indexOf($originalSlide.data('id')) * $originalSlide.height()) * -1
                    }
                } else {
                    originalSlideOffsetCompensation = {
                        x: (contentGroup.slides.indexOf($originalSlide.data('id')) * $originalSlide.width()) * -1,
                        y: 0
                    }
                }
                $originalSlide = $(selector);
                $clone = $originalSlide.clone(true).off();
            }

            self.dragData = {
                startPos: {
                    x: touch.pageX + originalSlideOffsetCompensation.x,
                    y: touch.pageY + originalSlideOffsetCompensation.y
                },
                $clone: $clone,
                $original: $originalSlide,
                currentTarget: null,
                didDrag: false
            };
            self.dragData.$original.addClass("source");
            var offset = self.dragData.$original.offset();
            self.dragData.$clone
                .css({
                    left: offset.left,
                    top: offset.top
                });

            // the clone must be inserted at the end of the body, so that it can "float" over everything else
            // without having to use z-indexes and overflow visibility
            $("body").append(self.dragData.$clone);

            event.preventDefault(); // prevent text selection on desktop
        }

    }

});