class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(point) {
		const newX = this.x + point.x;
		const newY = this.y + point.y;
		return new Point(newX, newY);
	}

	isEqualTo(point) {
		return (this.x === point.x) && (this.y === point.y);
	}
}

module.exports = Point;
