/**
 * sets up the canvas and handles window resizing
 *
 * @class domControl
 * @static
 */
domControl = {
    init: function() {
        radio.tuneIn(window, 'resize', this._onWindowResize, this);

        this._width = config.width;
        this._height = config.height;
        this._canvas = document.getElementsByTagName('canvas')[0];
        this._context = this._canvas.getContext('2d');
        this._canvas.width = this._width;
        this._canvas.height = this._height;

        this._styleElements();

        this._IS_LANDSCAPE = this._width > this._height ? true : false;
        this._RATIO = this._IS_LANDSCAPE ? this._height / this._width : this._width / this._height;

        this._onWindowResize();
    },

    _styleElements: function() {
        this._body = document.getElementsByTagName('body')[0];
        this._body.style.backgroundColor = config.backgroundColor;
        this._body.style.margin = 0;
        this._body.style.padding = 0;

        this._canvas.style.position = 'absolute';
    },

    _onWindowResize: function() {
        var LANDSCAPE_RATIO = config.height / config.width;
        var PORTRAIT_RATIO = config.width / config.height;
        var IS_LANDSCAPE = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var winLandscapeRatio = winH / winW;
        var winPortraitRatio  = winW / winH;
        var left = 0;
        var top = 0;
        var canW;
        var canH;

        if (IS_LANDSCAPE) {
            if (LANDSCAPE_RATIO < winLandscapeRatio) {
                canW = winW;
                canH = canW * LANDSCAPE_RATIO;
                top = (winH - canH) / 2;
            } else {
                canH = winH;
                canW = winH * PORTRAIT_RATIO;
                left = (winW - canW) / 2;
            }
        } else {
            if (PORTRAIT_RATIO < winPortraitRatio) {
                canH = winH;
                canW = winH * PORTRAIT_RATIO;
                left = (winW - canW) / 2;
            } else {
                canW = winW;
                canH = canW * LANDSCAPE_RATIO;
                top = (winH - canH) / 2;
            }
        }

        this._canvas.style.width = Math.round(canW) + 'px';
        this._canvas.style.height = Math.round(canH) + 'px';
        this._canvas.style.left = left + 'px';
        this._canvas.style.top = top + 'px';

        // we use a timeout here because some mobile browsers
        // don't fire if there is not a short delay
        setTimeout(function() {
            window.scrollTo(0,1);
        }, 1);
    },

    /**
     * returns the Canvas object
     *
     * @returns {HTMLEntity} canvas
     */
    getCanvas: function() {
        return this._canvas;
    },

    /**
     * returns the 2D Context object
     *
     * @returns {object} context
     */
    getContext: function() {
        return this._context;
    }
};