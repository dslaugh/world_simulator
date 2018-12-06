const Directions = require('../core/Directions');

class CreatureState {
	constructor(target) {
		this.target = target;
		this.directions = Directions;
		this.directionList = Object.keys(this.directions);
		this.name = 'CreatureState';
	}

	searchSurroundings(surroundings, type) {
		if (typeof type === 'string') {
			type = [type];
		}
		const dirs = Object.keys(surroundings);
		const found = dirs.reduce((prev, curr) => {
			if (type.includes(surroundings[curr].type)) {
				prev.push(curr);
			}
			return prev;
		}, []);

		return found;
	}

	randomDirection(dirs) {
		if (dirs.length <= 0) {
			return;
		}
		const rand = Math.floor(Math.random() * dirs.length);
		return dirs[rand];
	}

	getRand(num=10) {
		return Math.floor(Math.random() * num);
	}

	isInShelter(point) {
		return point.x > this.inShelterX && point.y < this.inShelterY;
	}

	isInFoodArea(point) {
		return point.x < this.inFoodAreaX || point.y > this.inFoodAreaY;
	}

	execute() {
		console.log('You must implement this in the child');
	}
}

module.exports = CreatureState;
