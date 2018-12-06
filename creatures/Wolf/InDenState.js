const CreatureState = require('../CreatureState');

class InDenState extends CreatureState {
	constructor(target) {
		super(target);
		this.name = 'in-den';
	}

	execute(data) {
		if (this.target.isInDen) {
			this.target.isInDen = false;
			this.target.isHungry = true;
			return this.target.changeState(this.target.states.hunting, data);
		}

		const denDir = this.searchSurroundings(data.surroundings, 'den');
		if (!denDir) {
			return this.target.changeState(this.target.states.returningToDen);
		}

		data.denDir = denDir;
		return this.act(data);
	}

	act(data) {
		this.target.isInDen = true;
		return { type: 'hide', point: this.directions[data.denDir] };
	}
}

module.exports = InDenState;
