const Creature = require('../Creature');
const OccupiedState = require('./OccupiedState');
const UnoccupiedState = require('./UnoccupiedState');
const BeingVacatedState = require('./BeingVacatedState');

class Den extends Creature {
	constructor() {
		super();
		this.states = {
			occupied: new OccupiedState(this),
			unoccupied: new UnoccupiedState(this),
			beingVacated: new BeingVacatedState(this),
		};

		this.state = this.states.unoccupied;
		this.isOccupied = false;
	}

	act(data) {
		if (this.isOccupied) {
			return this.changeState(this.states.occupied, data);
		}
		return this.state.execute(data);
	}
}

module.exports = Den;
