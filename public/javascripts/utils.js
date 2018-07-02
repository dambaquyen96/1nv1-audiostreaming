
function wrap_inc(v, w, i) {
    if((v+i) >= w) return 0;
    return v+i;
}

function wrap_dec(v, w, i) {
    if((v-i) < 0) return w;
    return v-i;
}

function ring_buffer(n=4) {
    this._size = n;
    this._buffers = new Array(n);
    this._ridx = 0;
    this._widx = 0;
    this._cnt = 0;
    // this._readCount = 0;
    // this._writeCount = 0;
};

ring_buffer.prototype.read = function(buf) {

    if(!this._cnt)
    {
        // console.log('[RB-E] UNDERRUN: ' + this._ridx);
        return 1;
    }

    // for (var i = buf.length - 1; i >= 0; i--) {
    //     onass(i, this._buffers[this._ridx], buf);
    //     // buf[i] = this._buffers[this._ridx][i];
    // };

    buf = this._buffers[this._ridx];

    this._ridx++;
    this._ridx%=this._buffers.length;
    this._cnt--;
    // this._readCount++;

    return 0;
};

ring_buffer.prototype.readCB = function(callback) {

    if(!this._cnt)
    {
        // console.log('[RB-E] UNDERRUN: ' + this._ridx);
        return 1;
    }

    callback(this._buffers[this._ridx]);

    // for (var i = buf.length - 1; i >= 0; i--) {
    //     onass(i, this._buffers[this._ridx]);
    //     // buf[i] = this._buffers[this._ridx][i];
    // };

    this._ridx++;
    this._ridx%=this._buffers.length;
    this._cnt--;
    // this._readCount++;

    return 0;
};

ring_buffer.prototype.write = function(buf) {

    var lRet = 0;

    if(this._cnt == this._size)
    {
        // console.log('[RB-E] OVERRUN: r:' + this._ridx + ' w: ' + this._widx);
        // console.log('[RB-E] OVERRUN: ' + this._ridx);
        lRet = 1;
    }

    this._buffers[this._widx] = buf;

    this._widx++;
    this._widx%=this._buffers.length;
    this._cnt++;
    // this._writeCount++;

    return lRet;
};

ring_buffer.prototype.size = function() {
    return this._cnt;
}

ring_buffer.prototype.capa = function() {
    return this._size;
}
