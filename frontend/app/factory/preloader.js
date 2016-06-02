angular
    .module('piluchoApp')
    .factory(
            "preloader",
            function() {
                var ImagePreloader = new (function () {
                    var queue = [];

                    function complete() {
                        if (typeof(this.callback) == 'function')
                            this.callback();

                        var i = getImageInQueue(this);

                        if (!isNaN(i))
                            queue.splice(i, 1);
                    }

                    function getImageInQueue(img) {
                        for (var i = 0; i < queue.length; i++)
                            if (queue[i] == img)
                                return i;

                        return null;
                    }

                    function load(img) {
                        if (typeof(img) != 'object' && typeof(img) != 'string')
                            return false;

                        var nImg = new Image();

                        if (typeof(img) == 'object') {
                            if (img.length || typeof(img.src) != 'string' || img.src == '')
                                return false;

                            if (typeof(img.complete) == 'function')
                                nImg.callback = img.complete;

                            img = img.src;
                        }

                        nImg.onabort = nImg.onerror = nImg.onload = complete;
                        nImg.src = img;
                        queue.push(nImg);

                        return null;
                    }

                    function setProgress() {
                        this.loaded++;

                        if (this.loaded == this.queue.length && typeof(this.complete) == 'function')
                            this.complete();
                    }

                    function loadSet(imgs, complete) {
                        if (typeof(imgs) != 'object' || !imgs.length)
                            return;

                        var nSet = {};

                        if (typeof(complete) == 'function')
                            nSet.complete = complete;

                        nSet.progress = setProgress;
                        nSet.loaded = 0;
                        nSet.queue = [];

                        for (var i = 0; i < imgs.length; i++) {
                            if (typeof(imgs[i]) == 'string') {
                                nSet.queue.push(imgs[i]);
                                load({
                                    src: imgs[i], complete: function () {
                                        nSet.progress();
                                    }
                                });
                            }
                        }
                    }

                    this.load = load;
                    this.loadSet = loadSet;
                })();
                // Return the factory instance.
                return( ImagePreloader );
            }
        );