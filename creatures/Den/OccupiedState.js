const CreatureState = require('../CreatureState');

class OccupiedState extends CreatureState {
	constructor(target) {
		super(target);
		this.occupiedCount = 0;
		this.name = 'occupied';
	}

	execute(data) {
		this.occupiedCount += 1;

		if (this.occupiedCount >= 10) {
			this.occupiedCount = 0;
			return this.target.changeState(this.target.states.beingVacated, data);
		}

		return this.act(data);
	}

	act(data) {
		return { type: 'wait' };
	}
}

module.exports = OccupiedState;
