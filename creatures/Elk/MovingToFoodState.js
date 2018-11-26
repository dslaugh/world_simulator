const ElkState = require('./ElkState');

class MovingToFoodState extends ElkState {
	constructor(target) {
		super(target);
		this.name = 'moving-to-food';
	}

	execute(data) {
		const creature = data.creature.object;
		const creaturePoint = data.creature.point;
		const grassDirs = this.searchSurroundings(data.surroundings, 'grass');
		if (grassDirs.length > 0) {
			return this.target.changeState(this.target.states.eating, data);
		}

		if (this.isInFoodArea(creaturePoint) || creature.health < 20) {
			return this.target.changeState(this.target.states.searching, data);
		}

		return this.act(data);
	}

	act(data) {
		const emptySpaceDirs = this.searchSurroundings(data.surroundings, 'empty');
		if (emptySpaceDirs.length > 0) {
			const southWestDirs = emptySpaceDirs.filter(dir => ['w', 'sw', 's'].includes(dir));
			if (southWestDirs.length > 0) {
				const randomDir = this.randomDirection(southWestDirs);
				const movePoint = this.directions[randomDir];
				return { type: 'move', point: movePoint };
			}
		}
		return { type: 'wait' };
	}
}

module.exports = MovingToFoodState;
