const CreatureState = require('../CreatureState');

class HuntingState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'hunting-wolf';
		this.movementCount = 0;
	}

	execute(data) {
		const creature = data.creature.object;
		// console.log('HuntingState', 'data.surroundings', data.surroundings);
		const elkDirs = this.searchSurroundings(data.surroundings, 'elk');

		// if (creature.health >= 300) {
		// 	return this.target.changeState(this.target.states.reproducing, data);
		// }

		if (elkDirs.length > 0) {
			return this.target.changeState(this.target.states.eating, data);
		}

		return this.act(data);
	}

	act(data) {
		this.movementCount += 1;
		const passableDirs = this.searchSurroundings(data.surroundings, ['empty', 'grass']);
		if (passableDirs.length > 0) {
			const randDir = this.randomDirection(passableDirs);
			let moveToPoint = this.directions[randDir];

			if (!this.searchDirection) {
				this.searchDirection = randDir;
			}

			if (passableDirs.includes(this.searchDirection)) {
				moveToPoint = this.directions[this.searchDirection];
			} else {
				this.searchDirection = randDir;
			}

			if (this.movementCount >= 10) {
				this.searchDirection = undefined;
				this.movementCount = 0;
			}

			return { type: 'move', point: moveToPoint };
		}

		return { type: 'wait' };
	}
}

module.exports = HuntingState;
