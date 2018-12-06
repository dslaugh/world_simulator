const CreatureState = require('../CreatureState');

class EatingState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'eating-wolf';
	}

	execute(data) {
		// console.log('EatingState', 'hungry', this.target.isHungry);
		if (!this.target.isHungry) {
			return this.target.changeState(this.target.states.returningToDen, data);
		}

		const elkDirs = this.searchSurroundings(data.surroundings, 'elk');
		if (elkDirs.length > 0) {
			return this.act(data);
		}

		return this.target.changeState(this.target.states.hunting, data);
	}

	act(data) {
		const elkDirs = this.searchSurroundings(data.surroundings, 'elk');
		if (elkDirs.length > 0) {
			const randDir = this.randomDirection(elkDirs);
			const randPoint = this.directions[randDir];
			this.target.isHungry = false;
			return { type: 'eat', point: randPoint };
		}
	}
}

module.exports = EatingState;
