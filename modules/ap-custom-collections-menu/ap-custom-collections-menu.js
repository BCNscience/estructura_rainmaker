app.register("ap-custom-collections-menu", function () {


    var translation = {
        "ENTER_PRESENTATION_NAME": "Please enter a name for your presentation",
        "PRESENTATION_NAME": "Presentation name",
        "NAME_ALREADY_EXISTS": "Another presentation exists with the same name, please choose a new one",
        "$PRESENTATION_NAME$_WILL_BE_REMOVED": "'$PRESENTATION_NAME$' will be erased",
        "OK": "OK",
        "CANCEL": "Cancel",
        "YES": "Yes",
        "NO": "No",
        "PRESENTATION_IS_EMPTY": "This presentation is empty."
    };

    var self;
    return {
        publish: {},
        events: {
            "tap .newPresentation": "createNewPresentation",
            "tap .trash": "deletePresentation",
            "tap .rename": "renamePresentation",
            "tap .presentation": "openPresentation",
            "tap .edit": "editPresentation",
            "tap .favorite": "favorisePresentation"
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {

            self = this;

            app.$.customCollectionsMenu = this;

            app.$.on('open:ap-custom-collections-menu', function(){

                this.show();

            }.bind(this));

            app.$.on('close:ap-custom-collections-menu', function(){
                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function(){
                this.hide();
            }.bind(this));



            self.appriseDefaults = {
                textOk: translation["OK"],
                textCancel: translation["CANCEL"],
                textYes: translation["YES"],
                textNo: translation["NO"]
            };

            $(".presentationsContainer").sortable({
                items: ".row:not(.newPresentationButtonContainer)",
                scroll: true,
                update: function (event, ui) {
                    self.updateCustomPresentationOrder();
                }
            });


            $.each(app.$.customCollectionsStorage.getAll(), function (index, presentationObject) {
                self._addPresentationToView(presentationObject.name, presentationObject, /* animated: */false);
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
        },

        show: function () {
            app.lock();
            this.goTo('visible');
        },

        _addPresentationToView: function (presentationName, presentationObject, animated) {
            var self = this;
            var $row = $(".row.template").clone();


            $row.removeClass("template");
            $row.data("presentationName", presentationName);
            $row.find(".presentation .name").text(presentationName);
            if (presentationObject.isFavorite)
                $row.find(".favorite").addClass('selected');
            $row.insertBefore(self.$(".newPresentationButtonContainer"));


        },
        updateCustomPresentationOrder: function () {
            var self = this;

            var rowsArray = [];

            $('.presentationsContainer').children('.row').each(function () {
                var presentationName = $(this).data("presentationName");

                if (presentationName != undefined) {

                    if (app.$.customCollectionsStorage.getFavorites().length < 3) {
                        var isFavorite = $(this).find('.favorite').hasClass('selected');

                        var collection = app.$.customCollectionsStorage.get(presentationName);

                        collection.isFavorite = isFavorite;

                        app.$.customCollectionsStorage.add(presentationName, collection);
                    }

                    rowsArray.push(presentationName);
                }


            });

            if (rowsArray.length > 1)
                app.$.customCollectionsStorage.updateOrder(rowsArray);

            app.$.trigger("update:favorites");

        },

        createNewPresentation: function(){
            function askName(defaultName) {
                var optn = $.extend({}, self.appriseDefaults, {input: defaultName});
                apprise(translation["ENTER_PRESENTATION_NAME"], optn, function (newName) {
                    if (newName === false || newName === "") {
                        return; //user canceled
                    } else if (app.$.customCollectionsStorage.get(newName) != undefined) {
                        apprise(translation["NAME_ALREADY_EXISTS"], self.appriseDefaults, function () {
                            askName(newName); //ask again
                        });
                    } else {
                        var collectionId = "custom-collection-" + Math.floor((Math.random() * 10000) +1);

                        var presentationObject = {
                            id: collectionId,
                            name: newName,
                            type: "collection",
                            slideshows: [{
                                "id": "home_slideshow",
                                "name": "Home",
                                "type": "slideshow",
                                "content": ["home_slide"]
                            }, {
                                "id": "summary_slideshow",
                                "name": "Summary",
                                "type": "slideshow",
                                "content": ["summary_slide"]
                            }],
                            slides: ["home_slide", "summary_slide"],
                            presentation: [
                                ["home_slide"],
                                ["summary_slide"]
                            ],
                            isCustomPresentation: true,
                            isFavorite: false
                        };
                        app.$.customCollectionsStorage.add(newName, presentationObject);
                        self._addPresentationToView(newName, presentationObject, true);
                    }
                });
            }

            var standardName = translation["PRESENTATION_NAME"];
            askName(standardName);
        },

        deletePresentation: function(event){

            var $row = $(event.target).parent();
            var presentationName = $row.data("presentationName");
            var confirmationTitle = translation["$PRESENTATION_NAME$_WILL_BE_REMOVED"].replace("$PRESENTATION_NAME$", presentationName);
            var optn = $.extend({}, self.appriseDefaults, {confirm: true});
            apprise(confirmationTitle, optn, function (answer) {
                if (answer) {
                    app.$.customCollectionsStorage.delete(presentationName);
                    $row.animate({height: 0}, function () {
                        $(this).remove();

                    });
                }
            });

            app.$.trigger("update:favorites");
        },

        renamePresentation: function(event){
            var $row = $(event.target).parent();

            function askName(defaultName) {
                var optn = $.extend({}, self.appriseDefaults, {input: defaultName});
                apprise(translation["ENTER_PRESENTATION_NAME"], optn, function (newName) {
                    if (newName === false || newName == oldName || newName === "") {
                        return; //user canceled
                    } else if (app.$.customCollectionsStorage.get(newName) != undefined) {
                        apprise(translation["NAME_ALREADY_EXISTS"], self.appriseDefaults, function () {
                            askName(newName); //ask again
                        });
                    } else {
                        app.$.customCollectionsStorage.rename(oldName, newName);
                        $row.data("presentationName", newName);
                        var $name = $row.find(".name");
                        $name.css({opacity: 0});
                        setTimeout(function () {
                            $name.text(newName);
                            $name.css({opacity: 1});
                        }, 500);
                    }
                });
            }

            var oldName = $row.data("presentationName");
            askName(oldName);
        },

        openPresentation: function(event){

            var presentationName = $(event.target).parent().parent().data("presentationName");

            if(presentationName == undefined)
                presentationName = $(event.target).parent().data("presentationName");


            var collection = app.$.customCollectionsStorage.get(presentationName);

            //app.menu.linksConfig[homeSlideName] = {title: "<div class='homeIcon' />", classname: "home"}


            if (collection.slideshows.length > 0) {
                var slideshowIdArray = [];
                $.each(collection.slideshows, function (i, slideshow) {
                    slideshowIdArray.push(slideshow.id);
                    var slidesArrary = [];
                    $.each(slideshow.content, function (i, slide) {
                        slidesArrary.push(slide);
                    });

                    var temp = {
                        id: slideshow.id,
                        name: slideshow.name,
                        content: slidesArrary,
                        type: "slideshow"
                    };

                    if(!app.model.hasStructure(slideshow.id))
                        app.model.addStructure(slideshow.id, temp);

                });

                var storyboardData = {
                    id: collection.id,
                    name: collection.name,
                    content: slideshowIdArray
                };

                if(!app.model.hasStoryboard(collection.id))
                    app.model.addStoryboard(collection.id, storyboardData);

                app.slideshow.init(collection.id);
                app.slideshow.load(collection.id);
                app.$.toolbar.hide();

            } else {
                apprise(translation["PRESENTATION_IS_EMPTY"], self.appriseDefaults);
            }
        },

        editPresentation: function(event) {
            // load custom collections editor into own container
            /*
            new CustomCollections({
                $container: self.$container,
                presentationName: $(this).parent().data("presentationName")
            });
            */
            self.hide();
            var trigger = "open:ap-custom-collections";
            var presentationName = $(event.target).parent().data("presentationName");

            app.$.trigger(trigger, {presentationName: presentationName});


        },

        favorisePresentation:function(event) {
            // set favorite
            var $this = $(event.target);

            var presentationName = $this.parent().data("presentationName");
            var collection = app.$.customCollectionsStorage.get(presentationName);

            if (app.$.customCollectionsStorage.getFavorites().length < 3 || collection.isFavorite) {
                $this.toggleClass("selected");

                collection.isFavorite = !collection.isFavorite;

                app.$.customCollectionsStorage.add(presentationName, collection);
            }
            else {
                var $popup = $('#maxFavoritesPopUp');

                $popup.fadeIn();

                $popup.delay(1600).fadeOut();
            }

            app.$.trigger("update:favorites");
        }


    }

});