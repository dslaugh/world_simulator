const Creature = require('../Creature');
const MovingToFoodState = require('./MovingToFoodState');
const MovingToShelterState = require('./MovingToShelterState');
const EatingState = require('./EatingState');
const MillingAroundState = require('./MilllingAroundState');
const RuttingState = require('./RuttingState');
const SearchingState = require('./SearchingState');

class Elk extends Creature {
	constructor() {
		super();

		this.states = {
			movingToFood: new MovingToFoodState(this),
			movingToShelter: new MovingToShelterState(this),
			eating: new EatingState(this),
			millingAround: new MillingAroundState(this),
			rutting: new RuttingState(this),
			searching: new SearchingState(this),
		};

		this.state = this.states.millingAround;
	}

	act(data) {
		const creature = data.creature.object;
		creature.health -= 1;
		creature.age += 1;
		creature.reproductionCooldown += 1;

		if (creature.health <= 0 || creature.age > 500) {
			return { type: 'die' };
		}

		return this.state.execute(data);
	}
}

module.exports = Elk;
