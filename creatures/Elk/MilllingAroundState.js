const ElkState = require('./ElkState');

class MillingAroundState extends ElkState {
	constructor(target) {
		super(target);
		this.name = 'milling-around';
	}

	execute(data) {
		const creature = data.creature.object;
		if (creature.health < this.hungryLevel) {
			return this.target.changeState(this.target.states.movingToFood, data);
		}

		return this.act(data);
	}

	act(data) {
		const randNum = this.getRand();
		if (randNum % 3 === 0) {
			const emptyDirs = this.searchSurroundings(data.surroundings, 'empty');
			const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
			const passableDirs = emptyDirs.concat(grassDirs);
			if (passableDirs.length > 0) {
				const randDir = this.randomDirection(passableDirs);
				const randPoint = this.directions[randDir];
				return { type: 'move', point: randPoint };
			}
		}
		return { type: 'wait' };
	}
}

module.exports = MillingAroundState;
