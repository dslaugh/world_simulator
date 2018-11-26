const Point = require('./Point');
const Elements = require('./ElementRegistry');

class Grid {
	constructor(width, height, elements) {
		this.width = width;
		this.height = height;
		this.elements = elements;
		this.cells = [];
	}

	valueAt(point) {
		const idx = this.pointIndex(point);
		return this.cells[idx];
	}

	 setValueAt(point, value) {
		const idx = this.pointIndex(point);
		this.cells[idx] = value;
	}

	isInside(point) {
		return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
	}

	// TODO: change the third parameter to be an element rather than creating it here.
	// This will remove the need to pass 'elements' to Grid
	moveValue(fromPoint, toPoint, replaceWithCharacter=' ') {
		this.setValueAt(toPoint, this.valueAt(fromPoint));
		this.setValueAt(fromPoint, this.elements.createByCharacter(replaceWithCharacter));
	}

	each(actionFn) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const point = new Point(x, y);
				actionFn(point, this.valueAt(point));
			}
		}
	}

	pointIndex(point) {
		return (point.y * this.width) + point.x;
	}
}

module.exports = Grid;
