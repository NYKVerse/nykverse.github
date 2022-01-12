var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;

  const RainObj = function() { // begin rainObj function
	// begin this. declarations
	this.total = [];
	this.maxRain = 65;
	this.bounceTotal = 0;
	this.puddles = [];

	// for each rain particle
	this.x;
	this.y;
	this.dy;
	this.length = 10;
	this.friction = 0.2;

	const getRandomNum = (min, max) => { // start function getRandomNum
		return Math.random() * (max - min) + min; // returns a random number within the argued range
	} // end function getRandomNum

	this.init = () => { // start this. function init
		if (this.total.length < this.maxRain) { // begin if statement; checks if the array length is less than the max amount
			// creates another particle
			this.x = getRandomNum(0, canvas.width);
			this.y = 0;
			this.dy = 1;
			this.total.push({ // pushes to array
				x: this.x,
				y: this.y,
				dy: this.dy,
				length: this.length,
				bounce: this.bounceTotal
			}); // end of traits being pushed
		} // end of if statement
	} // end of this.init function

	this.update = () => { // begin this.update function
		for (i = 0; i < this.total.length; i++) { // begin for loop; iterates through every object in the array
			if (this.total[i].bounce > 2) { // if the rain has bounced 3 times
				this.puddles.push({ // pushes the x and y of that object to a new array called puddles
					x: this.total[i].x,
					y: this.total[i].y
				}); // end of array push
				this.total.splice(i, 1); // splices (removes) the original from the original rain array
			} else { // runs if the rain has not bounced yet
				if (this.total[i].y + this.total[i].length >= canvas.height * getRandomNum(11/12, 13/12)) { // start of if statement; checks if the rain has fallen to a specific spot
					this.total[i].dy = -this.total[i].dy * this.friction; // the rain bounces up by reversing its velocity upwards and slowing it down with a friction constant
					this.total[i].bounce++; // iterates the bounce variable
				} else { // runs if the rain has not reached its full bounce height
					this.total[i].dy += 0.981; // rain accelerates at an acceleration 10 times smaller than real gravity
				} // end of if statement
				this.total[i].y += this.total[i].dy; // increases the y value by the acceleration
			} // end of else statement
		} // end of for loop
	} // end of this.update function

	this.draw = () => { // start this.draw function
		for (i = 0; i < this.total.length; i++) { // start for loop; draws rain particles
			// the context canvas paths for each rain particle
			ctx.strokeStyle = '#79C4F2';
			ctx.beginPath();
			ctx.moveTo(this.total[i].x, this.total[i].y);
			ctx.lineWidth = 1;
			ctx.lineCap = "round";
			ctx.lineTo(this.total[i].x, this.total[i].y + this.total[i].length);
			ctx.closePath();
			ctx.stroke(); // finally paints it
		} // end of for loop
		for (i = 0; i < this.puddles.length; i++) { // start for loop; draws puddles
			ctx.fillStyle = '#79C4F2';
			ctx.fillRect(this.puddles[i].x, this.puddles[i].y, 1, 1);
		} // end of for loop
	} // end of this.draw function
} // end of rainObj object function
}