app.register("ag-video", function() {

    // This module makes videos stateful so that they'll work remotely
    // ... and fix some layering issues that default controls cause
    // Usage: <div src="assets/myvideo.mp4" data-module="ag-video">

    var self = null;
    return {
        publish: {
            src: "",
            poster: "",
            type: "video/mp4",
            monitor: false
        },
        events: {
            "playing video": function() {this.goTo('play')},
            "pause video": function() {this.goTo('pause')},
            "tap .ag-video-play-toggle": 'toggleVideo',
            "tap .ag-upper-click-layer": 'toggleVideo',
            "tap .ag-video-fullscreen-button": 'toggleFullscreen',
            "swipeleft .ag-video-controls": 'noSwipe',
            "swiperight .ag-video-controls": 'noSwipe',
            "swipeleft": 'checkIfSwipe',
            "swiperight": 'checkIfSwipe',
            "swipeup": 'checkIfSwipe',
            "swipedown": 'checkIfSwipe',
            "onDrop .ag-video-seek-ele": 'handleDrop'
        },
        states: [
            {
                id: 'play',
                onEnter: function() {
                    this.videoEle.play();
                }
            },
            {
                id: 'pause',
                onEnter: function() {
                    this.videoEle.pause();
                    if (this.props.monitor) {
                        ag.submit.data({
                            category: "Video viewed",
                            label: this.props.src,
                            value: this.formatTime(this.currentPlayTime),
                            valueType: "time",
                            path: app.getPath(),
                            unique: true
                        });
                    }
                }
            }
        ],
        onRender: function(el) {
            self = this;
            this.currentPlayTime = 0;
            this.videoEle = this.el.querySelector('.ag-video-element');
            this.progressBar = this.el.querySelector('.ag-video-progress-bar');
            this.currentTimeText = this.el.querySelector('.ag-video-current-time');
            this.endTimeText = this.el.querySelector('.ag-video-total-time');
            this.videoContainer = this.el.querySelector('.ag-video-container');
            this.seekEle = this.el.querySelector('.ag-video-seek-ele');
            this.progressBarContainer = this.el.querySelector('.ag-video-progress-container');

            // this.videoEle.addEventListener('error', this.fallBackSrc.bind(this));
            this.videoEle.src = this.props.src;
            this.videoEle.poster = this.props.poster;
            this.videoEle.type = this.props.type;

            // Make sure play and pause is passed on if handled with default controls
            this.videoEle.addEventListener('playing', function() {
                if (self.stateIsnt('play')) self.goTo('play');
            });
            this.videoEle.addEventListener('pause', function() {
                if (self.stateIsnt('pause')) self.goTo('pause');
            });

            // Wait for for everything to finish loading
            setTimeout(function(){
                self.seekHandle = new Draggy(self.seekEle, {
                  restrictY: true, limitsX: [0, self.progressBarContainer.offsetWidth], onChange: self.moveSeekHandle
                });
            },100);
        },
        // If can't load src as specified, then try to load from "slides/[parentId]/[src specified]"
        // This is to make it work if lazyloaded
        // TODO: use slides path in config
        fallBackSrc: function(event) {
            var el = event.target;
            // el.removeEventListener('error', this.fallBackSrc.bind(this));
            el.src = "slides/" + this.parentId + "/" + this.props.src;
        },
        onEnter: function(el) {
            this.videoEle.addEventListener('timeupdate', this.setTime);
            document.addEventListener('webkitfullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('mozfullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('fullscreenchange', this.addFullscreenClass, false);
            document.addEventListener('MSFullscreenChange', this.addFullscreenClass, false);
            window.addEventListener('resize', this.updateSeekHandle, false);
        },
        onExit: function(el) {
            this.videoEle.removeEventListener('timeupdate', this.setTime);
            document.removeEventListener('webkitfullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('mozfullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('fullscreenchange', this.addFullscreenClass, false);
            document.removeEventListener('MSFullscreenChange', this.addFullscreenClass, false);
            window.removeEventListener('resize', this.updateSeekHandle, false);
            if (this.stateIs('play')) this.goTo('pause');
        },
        onRemove: function() {
            this._removeElement();
        },
        noSwipe: function(e){
            e.stopPropagation();
        },
        checkIfSwipe: function(e){
            // prevent swiping in fullscreen mode
            if(self.el.classList.contains('ag-video-fullscreen'))
                self.noSwipe(e);
        },
        toggleVideo: function(e){
            if(this.stateIs('play'))
                this.goTo('pause');
            else
                this.goTo('play');
        },
        setTime: function(e) {
            self.currentPlayTime = self.videoEle.currentTime;
            self.updateProgress();
        },
        updateProgress: function(time) {
            this.currentPlayTime = time || this.currentPlayTime;
            var seekHandlePos = 0;
            var value = 0;
            
            if (this.currentPlayTime > 0) {
                value = Math.floor((100 / this.videoEle.duration) * this.currentPlayTime);
            }

            var videoCurrentTime = this.formatTime(this.currentPlayTime);
            var videoEndTime = this.formatTime(this.videoEle.duration);

            this.currentTimeText.innerHTML = videoCurrentTime;
            this.endTimeText.innerHTML = videoEndTime; 

            this.progressBar.style.width = value + "%";

            seekHandlePos = value * 0.01 * this.progressBarContainer.offsetWidth;
            this.seekHandle.moveTo(seekHandlePos);
        },
        formatTime: function(seconds) {
            var s = Math.floor(seconds % 60),
                m = Math.floor(seconds / 60 % 60),
                h = Math.floor(seconds / 3600);

            if (h > 0) {
                h = ((h < 10) ? "0" + h : h) + ":";
            }
            else {
                h = "00:";
            }

            if (m > 0) {
                m = ((m < 10) ? "0" + m : m) + ":";
            }
            else {
                m = "00:";
            }

            // Check if leading zero is need for seconds
            s = (s < 10) ? "0" + s : s;

            return h + m + s;
        },
        toggleFullscreen: function(e){
            var fullscreenEle = document.fullscreenElement || document.msFullscreenElement || 
                                document.mozFullScreenElement || document.webkitCurrentFullScreenElement;

            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if(userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i )){
                if (this.videoEle.webkitEnterFullscreen){
                    this.videoEle.webkitEnterFullscreen();
                }
            }
            else{
                if (this.videoContainer.requestFullscreen) {
                    if(fullscreenEle)
                        document.exitFullscreen();
                    else
                        this.videoContainer.requestFullscreen();
                } 
                else if (this.videoContainer.msRequestFullscreen) {
                    if(fullscreenEle)
                        document.msExitFullscreen();
                    else
                        this.videoContainer.msRequestFullscreen();
                } 
                else if (this.videoContainer.mozRequestFullScreen) {
                    if(fullscreenEle)
                        document.mozCancelFullScreen();
                    else
                        this.videoContainer.mozRequestFullScreen();
                } 
                else if (this.videoContainer.webkitRequestFullscreen) {
                    if(fullscreenEle)
                        document.webkitCancelFullScreen();
                    else
                        this.videoContainer.webkitRequestFullscreen();
                }
            }
        },
        addFullscreenClass: function(){
            var fullscreenEle = document.fullscreenElement || document.msFullscreenElement || 
                                document.mozFullScreenElement || document.webkitCurrentFullScreenElement;

            if (fullscreenEle) {
                self.el.classList.add('ag-video-fullscreen');
            }
            else{
                self.el.classList.remove('ag-video-fullscreen');
            }
        },
        updateSeekHandle: function(){
            // draggy - changes limits and position on window resize
            self.seekHandle.config.limitsX[1] = self.progressBarContainer.offsetWidth;
            var seekHandlePos = self.videoEle.currentTime / self.videoEle.duration * self.progressBarContainer.offsetWidth;
            self.seekHandle.moveTo(seekHandlePos);
        },
        moveSeekHandle: function(x, y){
            // updates progressbar
            var currentPos = x / self.progressBarContainer.offsetWidth;
            self.updateProgress(self.videoEle.duration * currentPos);
        },
        handleDrop: function(e) {
            // moves handle
            var pos = e.target.position;
            var currentPos = pos[0] / self.progressBarContainer.offsetWidth;
            self.videoEle.currentTime = self.videoEle.duration * currentPos;
        }
    }

});