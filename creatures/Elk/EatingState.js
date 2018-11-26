const ElkState = require('./ElkState');

class EatingState extends ElkState {
	constructor(target) {
		super(target);
		this.name = 'eating';
	}

	execute(data) {
		const creature = data.creature.object;
		if (creature.health > this.notHungryLevel) {
			return this.target.changeState(this.target.states.movingToShelter, data);
		}

		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		if (grassDirs.length > 0) {
			return this.act(grassDirs);
		}

		return this.target.changeState(this.target.states.movingToFood, data);
	}

	act(grassDirs) {
		const randomDir = this.randomDirection(grassDirs);
		const grassPoint = this.directions[randomDir];
		return { type: 'eat', point: grassPoint };
	}
}

module.exports = EatingState;
