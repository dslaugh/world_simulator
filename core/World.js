const Grid = require('./Grid');
const Point = require('./Point');

class World {
	constructor(options) {
		this.gridWidth = options.map[0].length;
		this.gridHeight = options.map.length;
		this.elements = options.elements;
		this.grid = new Grid(this.gridWidth, this.gridHeight, this.elements);
		this.directions = options.directions;
		this.map = this.processMap(options.map);
	}

	processMap(map) {
		for (let y=0; y<this.gridHeight; y++) {
			const line = map[y];
			for(let x=0; x<line.length; x++) {
				const point = new Point(x, y);
				this.grid.setValueAt(point, this.elements.createByCharacter(line[x]));
			}
		}
	}

	toString() {
		const result = [];
		const lineLength = this.gridWidth - 1;

		this.grid.each((point, pointValue) => {
			let character = pointValue.character;
			const markup = `<div class="point">${character}</div>`;
			result.push(markup);
			if (point.x === lineLength) {
				result.push('<br />');
			}
		});

		return result.join('');
	}

	listActingCreatures() {
		const found = [];
		this.grid.each((point, value) => {
			if (value && value.act) {
				found.push({ object: value, point });
			}
		});
		return found;
	}

	listSurroundings(point) {
		const surroundings = {};
		Object.keys(this.directions).forEach((dir) => {
			const place = point.add(this.directions[dir]);
			if (this.grid.isInside(place)) {
				surroundings[dir] = this.grid.valueAt(place);
			} else {
				surroundings[dir] = this.elements.findByCharacter('#');
			}
		});
		return surroundings;
	}

	getByType(type) {
		const found = [];
		this.grid.each((point, value) => {
			if (value && (value.type === type)) {
				found.push({ object: value, point });
			}
		});
		return found;
	}

	getByCharacter(character) {
		const found = [];
		this.grid.each((point, value) => {
			if (value && value.character === character) {
				found.push({ object: value, point });
			}
		});
		return found;
	}

	processCreature() {
		console.log('You must implement the processCreature method in the child class');
	}

	getRandomFromArray(arr) {
		const randNum = Math.floor(Math.random() * arr.length);
		return arr[randNum];
	}

	step() {
		const actingCreatures = this.listActingCreatures();
		actingCreatures.forEach(this.processCreature.bind(this));
		return this.onStep();
	}

	onStep() {
		return this.toString();
	}

}

module.exports = World;
