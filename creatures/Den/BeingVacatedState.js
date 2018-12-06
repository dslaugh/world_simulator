const CreatureState = require('../CreatureState');

class BeingVacatedState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'being-vacated';
	}

	execute(data) {
		if (!this.target.isOccupied) {
			return this.target.changeState(this.target.states.unoccupied);
		}
		return this.act(data);
	}

	act(data) {
		const passableSpaces = this.searchSurroundings(data.surroundings, ['empty', 'grass']);
		if (passableSpaces.length > 0) {
			const randDir = this.randomDirection(passableSpaces);
			return { type: 'vacate', point: this.directions[randDir] };
		}
		return { type: 'wait' };
	}
}

module.exports = BeingVacatedState;
