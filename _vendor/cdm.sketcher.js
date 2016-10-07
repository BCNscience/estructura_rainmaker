var Trig = {
    distanceBetween2Points: function ( p1, p2 ) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2 ) + Math.pow( p2.y - p1.y, 2 ) );
    },
    
    angleBetween2Points: function ( point1, point2 ) {
        var dx = point2.x - point1.x;
        var dy = point2.y - point1.y;   
        return Math.atan2( dx, dy );
    }
}

function Sketcher (canvasElement, brushImage) {
    var self = this;
    self.brush = brushImage;
    self.touchSupported = ("ontouchstart" in window);
    self.canvas = canvasElement;
    self.context = self.canvas.get(0).getContext('2d');
    self.lastMousePoint = {
        x : 0,
        y : 0
    };
    self.angle_old = 0;

    if (self.touchSupported) {
        self.mouseDownEvent = 'touchstart';
        self.mouseMoveEvent = 'touchmove';
        self.mouseUpEvent = 'touchend';
    } else {
        self.mouseDownEvent = 'mousedown';
        self.mouseMoveEvent = 'mousemove';
        self.mouseUpEvent = 'mouseup';
    }

    self.canvas.on(self.mouseDownEvent, self.onCanvasMouseDown());
}

Sketcher.prototype.onCanvasMouseDown = function () {
    var self = this;
    return function (event) {
        self.mouseMoveHandler = self.onCanvasMouseMove();
        self.mouseUpHandler = self.onCanvasMouseUp();

        self.canvas.on(self.mouseMoveEvent, self.mouseMoveHandler);
        self.canvas.on(self.mouseUpEvent, self.mouseUpHandler);

        self.updateMousePosition(event);
        self.updateCanvas(event);
    };
};

Sketcher.prototype.onCanvasMouseMove = function () {
    var self = this;
    return function (event) {
        self.updateCanvas(event);
        if (this.touchSupported) {
            event.originalEvent.targetTouches[0].preventDefault();
            event.originalEvent.targetTouches[0].stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
        return false;
    };
};

Sketcher.prototype.onCanvasMouseUp = function () {
    var self = this;
    return function (event) {
        self.canvas.off(self.mouseMoveEvent, self.mouseMoveHandler);
        self.canvas.off(self.mouseUpEvent, self.mouseUpHandler);
        self.mouseMoveHandler = null;
        self.mouseUpHandler = null;
    }
};

Sketcher.prototype.updateMousePosition = function (event) {
    var target;
    if (this.touchSupported) {
        target = event.originalEvent.targetTouches[0];
    } else {
        target = event;
    }
    var offset = this.canvas.offset();
    this.lastMousePoint.x = target.pageX - offset.left;
    this.lastMousePoint.y = target.pageY - offset.top;
};

Sketcher.prototype.updateCanvas = function (event) {
    //now with David's angle smoothness!!!
    var halfBrushW = this.brush.width / 2;
    var halfBrushH = this.brush.height / 2;

    var start = {
        x : this.lastMousePoint.x,
        y : this.lastMousePoint.y
    };

    this.updateMousePosition(event);

    var end = {
        x : this.lastMousePoint.x,
        y : this.lastMousePoint.y
    };

    var distance = parseInt(Trig.distanceBetween2Points(start, end));
    var angle = Trig.angleBetween2Points(start, end);
    var x=start.x, y=start.y;
    if (this.angle_old==0)
        this.angle_old=angle;
    var angle_diff=angle-this.angle_old;
    if (angle_diff>Math.PI)
        angle_diff-=2*Math.PI;
    if (angle_diff<-Math.PI)
        angle_diff+=2*Math.PI;

    for (var z = 0; (z <= distance || z == 0); z++) {
        if (distance>0){
            this.angle_old+=(angle_diff)/distance;
            x += (Math.sin(this.angle_old) ) ;
            y += (Math.cos(this.angle_old) ) ;
        }
        //console.log( x, y, angle, z );
        this.context.drawImage(this.brush, x-halfBrushW, y-halfBrushH);
    }
    this.lastMousePoint.x = x;
    this.lastMousePoint.y = y;
    this.angle_old=angle;
};

Sketcher.prototype.clear = function () {
    var c = this.canvas[0];
    this.context.clearRect(0, 0, c.width, c.height);
};
