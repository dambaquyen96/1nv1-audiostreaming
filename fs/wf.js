
// var appElement = document.querySelector('[ng-app=AudioStreaming]');
// var appScope = angular.element(appElement).scope();
// var controllerScope = appScope.$$childHead;

var room = document.getElementById("room").innerHTML;
var username = document.getElementById("username").innerHTML;
var name = document.getElementById("name").innerHTML;
var address = document.getElementById("address").innerHTML;

var MyScene = cc.Scene.extend({

    _layer: null,
    _wfdata: null,
    _gxdata: null,
    _gydata: null,
    _gzdata: null,
    _axdata: null,
    _aydata: null,
    _azdata: null,
    _dirty: false,
    _dirtyAccel: false,
    _accelData: null,

    // _wfSample: 44100,
    // _wfFrame: 512,
    // _wfPeriod: 5,
    _wfHeight: 100,
    _wIdx: 1024,
    _gxHeight: 50,
    _gxdx: 500,
    _gyHeight: 50,
    _gydx: 500,
    _gzHeight: 50,
    _gzdx: 500,
    _axHeight: 50,
    _axdx: 500,
    _ayHeight: 50,
    _aydx: 500,
    _azHeight: 50,
    _azdx: 500,
    _offset: 40,
    _gxmax: 100,
    _gymax: 100,
    _gzmax: 100,
    _axmax: 5,
    _aymax: 5,
    _azmax: 5,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function ()
    {
        const winSize = cc.director.getWinSize();
        this._wfdata = new Float32Array(winSize.width);
        this._wIdx = winSize.width;

        this._gxdata = new Float32Array(winSize.width/2-2*this._offset);
        this._gxdx = winSize.width/2-2*this._offset;
        this._gydata = new Float32Array(winSize.width/2-2*this._offset);
        this._gydx = winSize.width/2-2*this._offset;
        this._gzdata = new Float32Array(winSize.width/2-2*this._offset);
        this._gzdx = winSize.width/2-2*this._offset;

        this._axdata = new Float32Array(winSize.width/2-2*this._offset);
        this._axdx = winSize.width/2-2*this._offset;
        this._aydata = new Float32Array(winSize.width/2-2*this._offset);
        this._aydx = winSize.width/2-2*this._offset;
        this._azdata = new Float32Array(winSize.width/2-2*this._offset);
        this._azdx = winSize.width/2-2*this._offset;

        this._layer = new cc.LayerColor(cc.color(0x21,0x21,0x21,0xff), winSize.width, winSize.height);
        this.addChild(this._layer, 0, 100);
    },

    onEnter: function () {
        this._super();
        // const size = cc.director.getWinSize();

        var audLine = new cc.DrawNode();
        this._layer.addChild(audLine, 10, 100);

        const winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        //drawSegment
        audLine.drawSegment(cc.p(0, 3*winSize.height/4), cc.p(winSize.width, 3*winSize.height/4), 1, cc.color(0x8b, 0xc3, 0x4a, 255));

        var GxLine = new cc.DrawNode();
        this._layer.addChild(GxLine, 100, 101);
        GxLine.drawSegment(cc.p(this._offset, 5*winSize.height/12), cc.p(winSize.width/2-this._offset, 5*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var GyLine = new cc.DrawNode();
        this._layer.addChild(GyLine, 100, 102);
        GyLine.drawSegment(cc.p(this._offset, 3*winSize.height/12), cc.p(winSize.width/2-this._offset, 3*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var GzLine = new cc.DrawNode();
        this._layer.addChild(GzLine, 100, 103);
        GzLine.drawSegment(cc.p(this._offset, 1*winSize.height/12), cc.p(winSize.width/2-this._offset, 1*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var AxLine = new cc.DrawNode();
        this._layer.addChild(AxLine, 100, 104);
        AxLine.drawSegment(cc.p(winSize.width/2+this._offset, 5*winSize.height/12), cc.p(winSize.width-this._offset, 5*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var AyLine = new cc.DrawNode();
        this._layer.addChild(AyLine, 100, 105);
        AyLine.drawSegment(cc.p(winSize.width/2+this._offset, 3*winSize.height/12), cc.p(winSize.width-this._offset, 3*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var AzLine = new cc.DrawNode();
        this._layer.addChild(AzLine, 100, 106);
        AzLine.drawSegment(cc.p(winSize.width/2+this._offset, 1*winSize.height/12), cc.p(winSize.width-this._offset, 1*winSize.height/12), 1, cc.color(0x8b, 0xc3, 0x4a, 255))

        var lbGx = cc.LabelTTF.create("Gx", "Arial", 20);
        lbGx.setPosition(cc.p(this._offset/5, 5*winSize.height/12));
        lbGx.setAnchorPoint(0,0.5);
        this._layer.addChild(lbGx, 100, 1010);

        var lbGy = cc.LabelTTF.create("Gy", "Arial", 20);
        lbGy.setPosition(cc.p(this._offset/5, 3*winSize.height/12));
        lbGy.setAnchorPoint(0,0.5);
        this._layer.addChild(lbGy, 100, 1020);

        var lbGz = cc.LabelTTF.create("Gz", "Arial", 20);
        lbGz.setPosition(cc.p(this._offset/5, 1*winSize.height/12));
        lbGz.setAnchorPoint(0,0.5);
        this._layer.addChild(lbGz, 100, 1030);

        var lbAx = cc.LabelTTF.create("Ax", "Arial", 20);
        lbAx.setPosition(cc.p(winSize.width/2+this._offset/5, 5*winSize.height/12));
        lbAx.setAnchorPoint(0,0.5);
        this._layer.addChild(lbAx, 100, 1040);

        var lbAy = cc.LabelTTF.create("Ay", "Arial", 20);
        lbAy.setPosition(cc.p(winSize.width/2+this._offset/5, 3*winSize.height/12));
        lbAy.setAnchorPoint(0,0.5);
        this._layer.addChild(lbAy, 100, 1050);

        var lbAz = cc.LabelTTF.create("Az", "Arial", 20);
        lbAz.setPosition(cc.p(winSize.width/2+this._offset/5, 1*winSize.height/12));
        lbAz.setAnchorPoint(0,0.5);
        this._layer.addChild(lbAz, 100, 1060);

        var lbInfo = cc.LabelTTF.create(name + ' [' + address + ']', "Arial", 20);
        lbInfo.setPosition(cc.p(this._offset/5, winSize.height - 20));
        lbInfo.setAnchorPoint(0,0.5);
        this._layer.addChild(lbInfo, 100, 1070);

        this.scheduleUpdate();
    },

    update: function(dt) {
        this._super();
        // if (this._wfdata) console.log(this._wfdata.length);
        // console.log(this._dirty);
        if(this._dirty)
        {
            var audLine = this._layer.getChildByTag(100);
            audLine.clear();
            var vertices = [];
            const winSize = cc.director.getWinSize();
            const centerPos = cc.p(winSize.width / 2, winSize.height*3/4);
            // for (var i = 0; i < this._wfdata.length; i++)
            vertices.push(cc.p(0, centerPos.y + this._wfdata[this._wIdx] * this._wfHeight));
            this._wIdx = wrap_inc(this._wIdx, this._wfdata.length, 1);

            for (var i=this._wIdx, index=1;
                index < this._wfdata.length;
                i=wrap_inc(i, this._wfdata.length, 1), index++)
            {
                vertices.push(cc.p(index, centerPos.y + this._wfdata[i] * this._wfHeight));
            };

            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);

            for (var i = 0; i < vertices.length - 1; i++) {
                audLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };

            // console.log('update: ' + dt);
            this._dirty = false;
        }

        if(this._dirtyAccel)
        {
            var vertices = [];
            const winSize = cc.director.getWinSize();

            var GxLine = this._layer.getChildByTag(101);
            GxLine.clear();
            const centerPosGx = cc.p(winSize.width / 4, winSize.height*5/12);
            vertices.push(cc.p(this._offset, centerPosGx.y + this._gxdata[this._gxdx] * this._gxHeight));
            this._gxdx--;
            if(this._gxdx < 1) this._gxdx = this._gxdata.length;
            // this._gxdx = wrap_inc(this._gxdx, this._gxdata.length, 0);
            for (var i=this._gxdx, index=1;
                index < this._gxdata.length;
                i=wrap_inc(i, this._gxdata.length, 1), index++)
            {
                vertices.push(cc.p(this._offset+index, centerPosGx.y + this._gxdata[i] * this._gxHeight));
            };
            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);
            for (var i = 0; i < vertices.length - 1; i++) {
                GxLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };

            var GyLine = this._layer.getChildByTag(102);
            GyLine.clear();
            vertices = [];
            const centerPosGy = cc.p(winSize.width / 4, winSize.height*3/12);
            vertices.push(cc.p(this._offset, centerPosGy.y + this._gydata[this._gydx] * this._gyHeight));
            this._gydx--;
            if(this._gydx < 1) this._gydx = this._gydata.length;
            // this._gydx = wrap_inc(this._gydx, this._gydata.length, 1);
            for (var i=this._gydx, index=1;
                index < this._gydata.length;
                i=wrap_inc(i, this._gydata.length, 1), index++)
            {
                vertices.push(cc.p(this._offset+index, centerPosGy.y + this._gydata[i] * this._gyHeight));
            };
            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);
            for (var i = 0; i < vertices.length - 1; i++) {
                GyLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };


            var GzLine = this._layer.getChildByTag(103);
            GzLine.clear();
            vertices = [];
            const centerPosGz = cc.p(winSize.width / 4, winSize.height*1/12);
            vertices.push(cc.p(this._offset, centerPosGz.y + this._gzdata[this._gzdx] * this._gzHeight));
            this._gzdx--;
            if(this._gzdx < 1) this._gzdx = this._gzdata.length;
            // this._gzdx = wrap_inc(this._gzdx, this._gzdata.length, 1);
            for (var i=this._gzdx, index=1;
                index < this._gzdata.length;
                i=wrap_inc(i, this._gzdata.length, 1), index++)
            {
                vertices.push(cc.p(this._offset+index, centerPosGz.y + this._gzdata[i] * this._gzHeight));
            };
            for (var i = 0; i < vertices.length - 1; i++) {
                GzLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };


            var AxLine = this._layer.getChildByTag(104);
            AxLine.clear();
            vertices = [];
            const centerPosAx = cc.p(winSize.width*3/4, winSize.height*5/12);
            vertices.push(cc.p(winSize.width/2+this._offset, centerPosAx.y + this._axdata[this._axdx] * this._axHeight));
            this._axdx--;
            if(this._axdx < 1) this._axdx = this._axdata.length;
            // this._axdx = wrap_inc(this._axdx, this._axdata.length, 1);
            for (var i=this._axdx, index=1;
                index < this._axdata.length;
                i=wrap_inc(i, this._axdata.length, 1), index++)
            {
                vertices.push(cc.p(winSize.width/2+this._offset+index, centerPosAx.y + this._axdata[i] * this._axHeight));
            };
            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);
            for (var i = 0; i < vertices.length - 1; i++) {
                AxLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };

            var AyLine = this._layer.getChildByTag(105);
            AyLine.clear();
            vertices = [];
            const centerPosAy = cc.p(winSize.width*3/4, winSize.height*3/12);
            vertices.push(cc.p(winSize.width/2+this._offset, centerPosAy.y + this._aydata[this._aydx] * this._ayHeight));
            this._aydx--;
            if(this._aydx < 1) this._aydx = this._aydata.length;
            // this._axdx = wrap_inc(this._axdx, this._axdata.length, 1);
            for (var i=this._aydx, index=1;
                index < this._aydata.length;
                i=wrap_inc(i, this._aydata.length, 1), index++)
            {
                vertices.push(cc.p(winSize.width/2+this._offset+index, centerPosAy.y + this._aydata[i] * this._ayHeight));
            };
            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);
            for (var i = 0; i < vertices.length - 1; i++) {
                AyLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };

            var AzLine = this._layer.getChildByTag(106);
            AzLine.clear();
            vertices = [];
            const centerPosAz = cc.p(winSize.width*3/4, winSize.height*1/12);
            vertices.push(cc.p(winSize.width/2+this._offset, centerPosAz.y + this._azdata[this._azdx] * this._azHeight));
            this._azdx--;
            if(this._azdx < 1) this._azdx = this._azdata.length;
            // this._axdx = wrap_inc(this._axdx, this._axdata.length, 1);
            for (var i=this._azdx, index=1;
                index < this._azdata.length;
                i=wrap_inc(i, this._azdata.length, 1), index++)
            {
                vertices.push(cc.p(winSize.width/2+this._offset+index, centerPosAz.y + this._azdata[i] * this._azHeight));
            };
            // console.log(`i:${i} wid:${this._wIdx} index:${index}`);
            for (var i = 0; i < vertices.length - 1; i++) {
                AzLine.drawSegment(vertices[i], vertices[i+1], 1, cc.color(0x8b, 0xc3, 0x4a, 255));
            };

            this._dirty = false;

            // this._layer.getChildByTag(101).setString("Gx: " + this._accelData[0]);
            // this._layer.getChildByTag(102).setString("Gy: " + this._accelData[1]);
            // this._layer.getChildByTag(103).setString("Gz: " + this._accelData[2]);
            // this._layer.getChildByTag(104).setString("Ax: " + this._accelData[3]);
            // this._layer.getChildByTag(105).setString("Ay: " + this._accelData[4]);
            // this._layer.getChildByTag(106).setString("Az: " + this._accelData[5]);

            // this._layer.getChildByTag(101).setString("Gx: " + cc.radiansToDegrees(this._accelData[0]));
            // this._layer.getChildByTag(102).setString("Gy: " + cc.radiansToDegrees(this._accelData[1]));
            // this._layer.getChildByTag(103).setString("Gz: " + cc.radiansToDegrees(this._accelData[2]));
            // this._layer.getChildByTag(104).setString("Ax: " + cc.radiansToDegrees(this._accelData[3]));
            // this._layer.getChildByTag(105).setString("Ay: " + cc.radiansToDegrees(this._accelData[4]));
            // this._layer.getChildByTag(106).setString("Az: " + cc.radiansToDegrees(this._accelData[5]));
            this._dirtyAccel = false;
        }

        // var rotX = this._layer.getChildByTag(101);
        // rotX.setRotation(rotX.getRotation() - 1);

        // var rotY = this._layer.getChildByTag(102);
        // rotY.setRotation(rotY.getRotation() + 1);

        // var rotZ = this._layer.getChildByTag(103);
        // rotZ.setRotation(rotZ.getRotation() + 1);
    },

    updateWf: function(val) {
        this._wfdata[this._wIdx] = val*10;
        this._wIdx = wrap_dec(this._wIdx, this._wfdata.length, 1);
        this._dirty = true;
    },

    updateAC: function(data) {
        this._accelData = data;

        this._gxdata[this._gxdx] = this.getValue(data[0], this._gxmax);
        this._gxdx = wrap_dec(this._gxdx, this._gxdata.length, 1);
        this._gxdata[this._gxdx] = this.getValue(data[0], this._gxmax);
        this._gxdx = wrap_dec(this._gxdx, this._gxdata.length, 1);
        this._gxdata[this._gxdx] = this.getValue(data[0], this._gxmax);
        this._gxdx = wrap_dec(this._gxdx, this._gxdata.length, 1);

        this._gydata[this._gydx] = this.getValue(data[1], this._gymax);
        this._gydx = wrap_dec(this._gydx, this._gydata.length, 1);
        this._gydata[this._gydx] = this.getValue(data[1], this._gymax);
        this._gydx = wrap_dec(this._gydx, this._gydata.length, 1);
        this._gydata[this._gydx] = this.getValue(data[1], this._gymax);
        this._gydx = wrap_dec(this._gydx, this._gydata.length, 1);

        this._gzdata[this._gzdx] = this.getValue(data[2], this._gzmax);
        this._gzdx = wrap_dec(this._gzdx, this._gzdata.length, 1);
        this._gzdata[this._gzdx] = this.getValue(data[2], this._gzmax);
        this._gzdx = wrap_dec(this._gzdx, this._gzdata.length, 1);
        this._gzdata[this._gzdx] = this.getValue(data[2], this._gzmax);
        this._gzdx = wrap_dec(this._gzdx, this._gzdata.length, 1);

        this._axdata[this._axdx] = this.getValue(data[3], this._axmax);
        this._axdx = wrap_dec(this._axdx, this._axdata.length, 1);
        this._axdata[this._axdx] = this.getValue(data[3], this._axmax);
        this._axdx = wrap_dec(this._axdx, this._axdata.length, 1);
        this._axdata[this._axdx] = this.getValue(data[3], this._axmax);
        this._axdx = wrap_dec(this._axdx, this._axdata.length, 1);

        this._aydata[this._aydx] = this.getValue(data[4], this._aymax);
        this._aydx = wrap_dec(this._aydx, this._aydata.length, 1);
        this._aydata[this._aydx] = this.getValue(data[4], this._aymax);
        this._aydx = wrap_dec(this._aydx, this._aydata.length, 1);
        this._aydata[this._aydx] = this.getValue(data[4], this._aymax);
        this._aydx = wrap_dec(this._aydx, this._aydata.length, 1);

        this._azdata[this._azdx] = this.getValue(data[5], this._azmax);
        this._azdx = wrap_dec(this._azdx, this._azdata.length, 1);
        this._azdata[this._azdx] = this.getValue(data[5], this._azmax);
        this._azdx = wrap_dec(this._azdx, this._azdata.length, 1);
        this._azdata[this._azdx] = this.getValue(data[5], this._azmax);
        this._azdx = wrap_dec(this._azdx, this._azdata.length, 1);
        
        this._dirtyAccel = true;
    },

    getValue: function(x, max) {
        if (x >= 0) return 1.*Math.min(x, max)/max;
        else return 1.*Math.max(x,-max)/max;
    }
});


// MyScene.prototype.updateWf = function(val) {
//     this._wfdata[this._wIdx] = val;
//     this._wIdx = wrap_dec(this._wIdx, this._wfdata.length, 1);
//     this._dirty = true;
// }

// MyScene.prototype.updateAC = function(val) {
//     this._accelData = data;
//     this._dirtyAccel = true;
// }
