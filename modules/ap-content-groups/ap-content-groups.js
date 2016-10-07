app.register("ap-content-groups", function () {
    var self;
    return {
        definition: null,
        json: {},
        publish: {},
        events: {},
        states: [],
        onRender: function (el) {

            self = this;
            app.$.contentGroups = this;


            $.get('contentGroups.json').done(function (groupDefinition) {
                if (typeof groupDefinition === 'string') {
                    groupDefinition = JSON.parse(groupDefinition);
                }

                self.json = groupDefinition;

            });


            this.validateContentgroups();


        },
        onRemove: function (el) {

        },
        onEnter: function (el) {

        },
        onExit: function (el) {

        },

        collectionContainsSlides: function (collection, groupDefinition) {
            // test if the collection needs validation
            // (by checking if the collection has any slide from the contentGroup)

            // get all slides which are used in this collection
            var collectionClone = $.extend(true, {}, collection);

            var slidesUsed;

            if (collection.content) {

                if (collectionClone.content.length > 0) {
                    $.each(collectionClone.content, function (i, slideshowName) {
                        collectionClone.content[i] = app.model.getStructure(slideshowName).content;
                    });

                    slidesUsed = collectionClone.content.reduce(function (a, b) {
                        return a.concat(b)
                    });
                }

            } else {
                slidesUsed = collectionClone.slides;
            }

            // check if the collection contains any slide from this contentGroup
            var collectionContainsSlide = false;


            if (slidesUsed) {
                $.each(groupDefinition.slides, function (i, slide) {
                    if (~slidesUsed.indexOf(slide)) {
                        collectionContainsSlide = true;
                    }
                });

            }
            return collectionContainsSlide
        },


        validateContentgroups: function () {
            // validate groups

            //var customCollections = app.$.customCollectionsStorage.getAll();
            //$.extend(true, app.model.get().storyboards, customCollections);

            $.get('contentGroups.json').done(function (groupDefinition) {
                if (typeof groupDefinition === 'string') {
                    groupDefinition = JSON.parse(groupDefinition);
                }
                for (var property in groupDefinition) {
                    if (groupDefinition.hasOwnProperty(property)) {
                        var groupName = property;
                        var definition = groupDefinition[property];
                        if (definition.orientation === "horizontal") {
                            $.each(app.model.get().storyboards, function (i, collection) {
                                if (collection.type === "collection") {

                                    var collectionContainsSlide = self.collectionContainsSlides(collection, definition);
                                    // if it contains a slide, validate if its been used correctly

                                    if (collectionContainsSlide) {
                                        var firstSlides = [];
                                        if (collection.content) {
                                            // normal Collections
                                            $.each(collection.content, function (i, slideshow) {
                                                if (definition.slides.indexOf(app.model.getStructure(slideshow).content[0]) > -1) {
                                                    if (app.model.getStructure(slideshow).content.length === 1) {
                                                        // okay
                                                    } else {
                                                        console.warn('horizontal contentGroups may not have more than one vertical slides @%s', slideshow)
                                                    }
                                                }
                                                if(typeof app.model.getStructure(slideshow).content === 'string')
                                                    firstSlides.push(app.model.getStructure(slideshow).content);
                                                else
                                                    firstSlides.push(app.model.getStructure(slideshow).content[0]);
                                            });
                                            if (~firstSlides.join(':').indexOf(definition.slides.join(':'))) {

                                                console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                                // write the matching contentgroups to the structures for use in the custom-collections


                                                var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                                if(storyboard){
                                                    if (!storyboard.contentGroups) {
                                                        storyboard.contentGroups = {};

                                                    }
                                                    storyboard.contentGroups[groupName] = definition;
                                                }

                                            } else {
                                                console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                                console.warn('the group definition will be ignored!');
                                                delete groupDefinition[groupName];
                                            }
                                        } else {
                                            // custom Collections
                                            $.each(collection.slideshows, function (i, slideshow) {
                                                // if the slideshow contains a slide from the group definition
                                                if (definition.slides.indexOf(slideshow.content[0]) > -1) {
                                                    // and is only 1 slide long vertically
                                                    if (slideshow.content.length === 1) {
                                                        // okay
                                                    } else {
                                                        console.warn('horizontal contentGroups may not have more than one vertical slides @%s', slideshow)
                                                    }
                                                }
                                                if(typeof app.model.getStructure(slideshow).content === 'string')
                                                    firstSlides.push(app.model.getStructure(slideshow).content);
                                                else
                                                    firstSlides.push(app.model.getStructure(slideshow).content[0]);
                                            });

                                            if (~firstSlides.join(':').indexOf(definition.slides.join(':'))) {
                                                console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                                // write the matching contentgroups to the structures for use in the custom-collections
                                                var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                                if(storyboard){
                                                    if (!storyboard.contentGroups) {
                                                        storyboard.contentGroups = {};

                                                    }
                                                    storyboard.contentGroups[groupName] = definition;
                                                }
                                            } else {
                                                console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                                console.warn('the group definition will be ignored!');
                                                delete groupDefinition[groupName];
                                            }
                                        }
                                    }
                                }
                            });
                        } else if (definition.orientation === "vertical") {
                            $.each(app.model.get().storyboards, function (i, collection) {

                                if (collection.type === "collection") {
                                    var collectionContainsSlide = self.collectionContainsSlides(collection, definition);
                                    if (collectionContainsSlide) {
                                        var allSlides = [];
                                        if (collection.content) {
                                            $.each(collection.content, function (i, slideshow) {
                                                var slideshowSlides = app.model.getStructure(slideshow).content;
                                                allSlides.push(slideshowSlides);
                                            });

                                        } else {
                                            // custom Collection
                                            $.each(collection.slideshows, function (i, slideshow) {
                                                allSlides.push(slideshow.content);
                                            });
                                        }
                                        if (~allSlides.join(':').indexOf(definition.slides.join(','))) {
                                            console.log('contentGroup %s valid for presentation %s', groupName, collection.id);
                                            // write the matching contentgroups to the structures for use in the custom-collections
                                            var storyboard = app.model.hasStoryboard(collection.id) ? app.model.getStoryboard(collection.id) : app.model.getStoryboard(collection.name);

                                            if(storyboard){
                                                if (!storyboard.contentGroups) {
                                                    storyboard.contentGroups = {};

                                                }
                                                storyboard.contentGroups[groupName] = definition;
                                            }
                                        } else {
                                            console.warn('contentGroup %s is invalid for presentation %s', groupName, collection.id);
                                            console.warn('the group definition will be ignored!');
                                            delete groupDefinition[groupName];
                                        }
                                    }
                                }

                            });
                        } else {
                            console.log("unknown ContentGroup definition type");
                        }
                    }
                }

                self.definition = groupDefinition;
            });
        }
    }

});