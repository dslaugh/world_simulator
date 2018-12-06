const CreatureState = require('../CreatureState');

class ReturningToDenState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'returning-to-den';
	}

	execute(data) {
		const surroundings = data.surroundings;
		const denDir = this.searchSurroundings(surroundings, ['den']);

		if (denDir.length > 0) {
			return this.target.changeState(this.target.states.inDen, data);
		}

		return this.act(data);
	}

	act(data) {
		const surroundings = data.surroundings;
		const passableDirs = this.searchSurroundings(surroundings, ['empty', 'grass']);

		if (passableDirs.includes('sw')) {
			return { type: 'move', point: this.directions['sw'] };
		}

		if (passableDirs.includes('s') && passableDirs.includes('w')) {
			const randSWDir = this.randomDirection(['s', 'w']);
			return { type: 'move', point: this.directions[randSWDir] };
		}

		if (passableDirs.includes('s')) {
			return { type: 'move', point: this.directions['s'] };
		}

		if (passableDirs.includes('w')) {
			return { type: 'move', point: this.directions['w'] };
		}

		if (passableDirs.includes('nw')) {
			return { type: 'move', point: this.directions['nw'] };
		}

		const randDir = this.randomDirection(passableDirs);
		if (randDir) {
			return { type: 'move', point: this.directions[randDir] };
		}

		return { type: 'wait' };
	}
}

module.exports = ReturningToDenState;
