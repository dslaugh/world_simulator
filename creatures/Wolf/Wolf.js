const Creature = require('../Creature');
const HuntingState = require('./HuntingState');
const EatingState = require('./EatingState');
const ReproducingState = require('./ReproducingState');
const ReturningToDenState = require('./ReturningToDenState');
const InDenState = require('./InDenState');

class Wolf extends Creature {
	constructor() {
		super();

		this.states = {
			hunting: new HuntingState(this),
			eating: new EatingState(this),
			reproducing: new ReproducingState(this),
			returningToDen: new ReturningToDenState(this),
			inDen: new InDenState(this),
		};
		this.state = this.states.hunting;

		this.den = { x: 1, y: 22 };
		this.isHungry = true;
		this.isInDen = false;
	}

	act(data) {
		const creature = data.creature.object;
		creature.age += 1;
		return this.state.execute(data);
	}
}

module.exports = Wolf;
