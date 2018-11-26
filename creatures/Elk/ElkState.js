const CreatureState = require('../CreatureState');

class ElkState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'ElkState';
		this.hungryLevel = 70;
		this.notHungryLevel = 100;
		this.reproductionCooldownLevel = 30;
		this.inShelterX = 35;
		this.inShelterY = 5;
		this.inFoodAreaX = 25;
		this.inFoodAreaY = 10;
	}
}

module.exports = ElkState;
