(function ($) {
	$.fn.textHeight = function () {
		// setup variables
		var c = document.createElement('canvas'),
			div = $(this)[0];

		// set canvas's size to be equal with div
		c.width = div.offsetWidth;
		c.height = div.offsetHeight;

		var ctx = c.getContext('2d');
		// get div's font from computed style and apply it to context
		ctx.font = window.getComputedStyle(div).font;
		// use color other than black because all pixels are 0 when black and transparent
		ctx.fillStyle = '#bbb';
		// draw the text near the bottom of the canvas
		ctx.fillText(div.innerText, 0, div.offsetHeight);

		// loop trough the canvas' data to find first colored pixel
		var data = ctx.getImageData(0, 0, c.width, c.height).data,
			minY = 0, len = data.length;
		for (var i = 0; i < len; i += 4) {
			// when you found it
			if (data[i] != 0) {
				// get pixel's y position
				minY = Math.floor(i / 4 / c.width);
				break;
			}
		}

		// and return the results
		return c.height - minY;​
	}
}(jQuery));
