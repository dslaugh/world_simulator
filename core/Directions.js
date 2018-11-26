const Point = require('./Point');

const eightDirections = {
	n:  new Point(0, -1),
	ne: new Point( 1, -1),
	e:  new Point( 1,  0),
	se: new Point( 1,  1),
	s:  new Point( 0,  1),
	sw: new Point(-1,  1),
	w:  new Point(-1,  0),
	nw: new Point(-1, -1),
};

const Directions = eightDirections;
module.exports = Directions;
