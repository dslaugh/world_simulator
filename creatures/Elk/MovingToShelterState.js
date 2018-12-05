const ElkState = require('./ElkState');

class MovingToShelterState extends ElkState {
	constructor(target) {
		super(target);
		this.name = 'moving-to-shelter';
	}

	execute(data) {
		const creature = data.creature.object;
		const creaturePoint = data.creature.point;
		if (creature.health < this.hungryLevel) {
			return this.target.changeState(this.target.states.movingToFood, data);
		}

		if (this.isInShelter(creaturePoint)) {
			if (creature.age > 50) {
				return this.target.changeState(this.target.states.rutting, data);
			}
			return this.target.changeState(this.target.states.millingAround, data);
		}
		return this.act(data);
	}

	act(data) {
		const emptySpaceDirs = this.searchSurroundings(data.surroundings, 'empty');
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		const passableDirs = emptySpaceDirs.concat(grassDirs);

		let northEastDirs = [];
		if (passableDirs.length > 0) {
			northEastDirs = passableDirs.filter(dir => ['e', 'ne', 'n'].includes(dir));
		}

		if (northEastDirs.length > 0) {
			const randomDir = this.randomDirection(northEastDirs);
			const movePoint = this.directions[randomDir];
			return { type: 'move', point: movePoint };
		}

		return { type: 'wait' };
	}
}

module.exports = MovingToShelterState;
