var spawntimer, movetimer;
var drop_array = new Array();

/**
 * The Drop class is a blueprint for each raindrop we generate
 * @author  John Doe
 * @version 1.0, May 2014
 */
function Drop(){
	this.x; //starts empty, will keep track of each drop's left-right position as a #
	this.y; //starts empty, will keep track of each drop's up-down position as a #
	this.item_on_page; //represents drop's physical presence on the screen
	/** 
	*	The create method creates a DIV that looks like a blue drop on the page
	*/
	this.create = function(){
		//make a div tag in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//give it a class which styles it in CSS to resemble a drop
		this.item_on_page.className = "raindrop";
		//store a random x and y position, different for each drop. I'm using screen width of 800, height of 600:
		this.x = Math.floor(Math.random()*800);
		this.y = -50; // puts each drop above the screen
		//use those x and y coordinates in the CSS to position the drop:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.body.appendChild(this.item_on_page);
	}
	/** 
	*   The destroy function does lots of cleaning up when a drop is removed from the page
	*/
	this.destroy = function(){
					var splashes = document.getElementsByClassName('splash');
		// remove all splashes from the screen
		for(var x = 0; x < splashes.length; x++) {
			document.body.removeChild(splashes[x]);
		}
		// cause a splash animation right where the drop is
		var splash = document.createElement('img');
		// we'll reference the animated gif with random query string
		// so browser thinks img is different each time and starts it
		// playing from the beginning
		splash.src = 'img/splash.gif?' + Math.random();
		// give each splash a class name so they can be removed
		splash.className = 'splash';
		splash.style.position = 'absolute';
		splash.style.left = this.x + 'px';
		splash.style.top = this.y + 'px';
		document.body.appendChild(splash);
		// get this drop out of the array, find index # of drop
		var drop_num = drop_array.indexOf(this);
		// splice(indice, remove)
		drop_array.splice(drop_num, 1);
		// remove its graphic from the screen
		document.body.removeChild(this.item_on_page);
	}
} //close the Drop class


onload=init;

function init() {
	// when the game starts, start causing a "spawn" function
	// to happen every so often.
	spawntimer = setInterval(spawn, 1000);
	movetimer = setInterval(moveAllDrops, 1000/30); 
	/**
	//make an object that's an instance of the Drop Class:
	var drop2 = new Drop();
	drop2.create();
	*/
}
/**
 * Generate a new drop object every so often...
 */
function spawn() {
	//make an object that's an instance of the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();	
	// remember the newly created drop by storing it in an array
	drop_array.push(anotherdrop);
}
/**
 * loop through all Drop objects, add to Y every so often.
 */
function moveAllDrops() {
	// for each drop in drop_array, repeat what's in curly braces.
	for(var i = 0; i < drop_array.length; i++) {
		// make a short reference to the current drop
		var current_drop = drop_array[i];
		// add to current Y property of this drop
		current_drop.y += 5;
		// apply the bigger Y as the drops top property in CSS
		current_drop.item_on_page.style.top = current_drop.y + "px";
		// if the drop hits the bottom of the stage, remove it.
		if(current_drop.y > 400) {
			 current_drop.destroy();
		}
	}
}
