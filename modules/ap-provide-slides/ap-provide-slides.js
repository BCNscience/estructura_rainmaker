app.register("ap-provide-slides", function () {


    var self;
    return {
        addedSlides: [],
        publish: {},
        events: {
            "tap .clearButton": "clearSlides",
            "tap .sendButton": "sendMail",
            'tap .add-user-btn': "checkAddedMail",
            "tap .o_slide .removeButton": "removeSlideHandler"
        },
        states: [
            {
                id: "visible"
            }
        ],
        onRender: function (el) {
            self = this;

            app.$.provideSlides = this;

            app.$.on('open:ap-provide-slides', function () {
                if (this.stateIsnt("visible"))
                    this.show();
            }.bind(this));

            app.$.on('close:ap-provide-slides', function () {
                this.hide();
            }.bind(this));

            app.$.on('toolbar:hidden', function () {
                this.hide();
            }.bind(this));

            this.usersList = this.el.querySelector('#userList');
            this.emailField = this.el.querySelector('.email-field');
            this.messageBox = this.el.querySelector('.send-message');
            this.slideContainer = this.el.querySelector('.thumbnails');


            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true, mouseWheel: true, scrollY: true});
            self.scroll.refresh();
            this.createSlideThumbnail();

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
            this.createSlideThumbnail();
            self.scroll.refresh();


        },

        addSlide: function (slideId) {
            if (self.addedSlides.indexOf(slideId) === -1)
                self.addedSlides.push(slideId);
        },

        removeSlide: function (slideId) {
            var slideIndex = self.addedSlides.indexOf(slideId);
            self.addedSlides.splice(slideIndex, 1);
            app.$.trigger("remove:addedSlide", {id: slideId});
        },

        removeSlideHandler: function (e) {

            var slideId = e.target.dataset.slideId;
            this.removeSlide(slideId);
            this.createSlideThumbnail();

        },

        sendMail: function () {
            var users = this.usersList.querySelectorAll('input'),
                selectedUsers = this.checkSelectedContacts(users);

            if (!self.addedSlides.length) {
                self.addedSlides = ['home_slide', 'summary_slide'];
            }

            if (ag && ag.content) {
                ag.content.provide(selectedUsers, self.addedSlides);

                //this.messageBox.classList.add('show');
                // this.sendBtn.classList.add('disabled');

                var $popup = $('#content-provided');

                $popup.fadeIn();

                $popup.delay(1600).fadeOut();
            }
        },

        clearSlides: function () {
            self.addedSlides = [];
            this.createSlideThumbnail();
            app.$.trigger("clear:addedSlides");
            $('#userList').empty();
        },

        addUsers: function () {
            var self = this;
            setTimeout(function () {
                if (ag.data.call_contacts.length) {
                    ag.data.call_contacts.forEach(function (data) {
                        self.createUserListItem(data);
                    });
                }
            }, 100);
        },

        checkAddedMail: function () {
            var email = this.emailField.value;
            if (email) {
                this.createUserListItem({email: email});
                this.emailField.value = '';
            }
        },
        createUserListItem: function (data) {
            var item = document.createElement('li');
            var checkBox = document.createElement('input');
            var text = document.createElement('p');
            var name = '';
            if (data.email) {
                checkBox.setAttribute('type', 'checkbox');
                checkBox.checked = true;
                checkBox.setAttribute('value', data.id || data.email);
                if (data.firstName) {
                    name = data.firstName;
                    if (data.lastName) name += ' ' + data.lastName;
                    if (data.id) name += ' (' + data.id + ')';
                }
                else {
                    name = data.email;
                }
                text.innerHTML = name;
                item.appendChild(checkBox);
                item.appendChild(text);
                this.usersList.appendChild(item);
            }
            else {
                if (data.id) {
                    alert('User without email: ' + data.id);
                }
            }
        },

        checkSelectedContacts: function (users) {
            var selectedUsers = [];

            for (var i = 0; i < users.length; i++) {
                if (users[i].checked) {
                    selectedUsers.push(users[i].value);
                }
            }

            return selectedUsers;
        },

        createSlideThumbnail: function () {


            var $thumbnails = $('.thumbnails');
            $thumbnails.empty();

            var slideHTML = "<div class='o_slide'><div class='removeButton'></div></div>"; // thumbnail template


            $.each(self.addedSlides, function (index, slideId) {

                var slide = app.model.getSlide(slideId);
                var $slide = $(slideHTML);
                $slide.find('.removeButton').attr("data-slide-id", slideId);
                $slide.css({"background-image": "url(slides/" + slideId + "/" + slideId + ".png)"});

                var slideNameHTML = "<div class='slide-name'>" + slide.name + "</div>";

                $slide.append(slideNameHTML);

                $thumbnails.append($slide);
            });

            if (self.scroll) self.scroll.destroy();

            self.scroll = new IScroll(self.$(".scroll")[0], {scrollbars: true, mouseWheel: true, scrollY: true});
            self.scroll.refresh();


        }


    }

});