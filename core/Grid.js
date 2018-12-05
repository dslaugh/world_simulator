const Point = require('./Point');
const Elements = require('./ElementRegistry');

class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = [];
	}

	initializeCellAt(point, cellValue) {
		const idx = this.pointIndex(point);
		this.cells[idx] = cellValue;
	}

	currentValueAt(point) {
		const idx = this.pointIndex(point);
		return this.cells[idx].currentValue;
	}

	previousValueAt(point) {
		const idx = this.pointIndex(point);
		return this.cells[idx].previousValue;
	}

	valueAt(point) {
		const idx = this.pointIndex(point);
		return this.cells[idx];
	}

	setCurrentValueAt(point, value) {
		const idx = this.pointIndex(point);
		this.cells[idx].currentValue = value;
	}

	setPreviousValueAt(point, value) {
		const idx = this.pointIndex(point);
		this.cells[idx].previousValue = value;
	}

	 setValueAt(point, value) {
		const idx = this.pointIndex(point);
		this.cells[idx].currentValue = value;
	}

	isInside(point) {
		return point.x >= 0 && point.y >= 0 && point.x < this.width && point.y < this.height;
	}

	moveValue(fromPoint, toPoint, replaceWith) {
		const fromPointCurrentValue = this.currentValueAt(fromPoint);
		if (replaceWith) {
			this.setPreviousValueAt(toPoint, replaceWith);
		} else {
			this.setPreviousValueAt(toPoint, this.currentValueAt(toPoint));
		}
		this.setCurrentValueAt(toPoint, this.currentValueAt(fromPoint));
		this.setCurrentValueAt(fromPoint, this.previousValueAt(fromPoint));
		this.setPreviousValueAt(fromPoint, fromPointCurrentValue);
	}

	each(actionFn) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const point = new Point(x, y);
				actionFn(point, this.currentValueAt(point), this.valueAt(point));
			}
		}
	}

	pointIndex(point) {
		return (point.y * this.width) + point.x;
	}

	getByType(type) {
		const found = [];
		this.each((point, value) => {
			if (value && (value.type === type)) {
				found.push({ object: value, point });
			}
		});
		return found;
	}

	getByCharacter(character) {
		const found = [];
		this.each((point, value) => {
			if (value && value.character === character) {
				found.push({ object: value, point });
			}
		});
		return found;
	}

	getCells() {
		return this.cells;
	}
}

module.exports = Grid;
