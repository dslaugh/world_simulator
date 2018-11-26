const GameBoard = require('../core/World');

class ElkWorld extends GameBoard {
	processCreature(creature) {
		const surroundings = this.listSurroundings(creature.point);
		const action = creature.object.act({ surroundings, creature });

		if (action && action.type) {
			switch (action.type) {
				case 'move':
					const toPoint = creature.point.add(action.point);
					if (this.grid.isInside(toPoint)) {
						this.grid.moveValue(creature.point, toPoint);
					}
					break;
				case 'die':
					this.grid.setValueAt(creature.point, this.elements.createByCharacter(' '));
					break;
				case 'eat':
					const foodPoint = creature.point.add(action.point);
					const food = this.grid.valueAt(foodPoint);
					creature.object.health += food.energy;
					this.grid.moveValue(creature.point, foodPoint);
					break;
				case 'grow':
					creature.object.energy += action.units;
					break;
				case 'reproduce':
					const newPoint = creature.point.add(action.point);
					this.grid.setValueAt(newPoint, this.elements.createByCharacter(action.character));
					break;
				default:
					break;
			}
		}
	}

	step() {
		const actingCreatures = this.listActingCreatures();
		const grass = this.getByType('grass');
		if (grass.length < 3) {
			const emptySpaces = this.getByType('empty');
			const randSpace = this.getRandomFromArray(emptySpaces);
			this.grid.setValueAt(randSpace.point, this.elements.createByCharacter('.'));

		}
		actingCreatures.forEach(this.processCreature.bind(this));
		return this.onStep();
	}
}

module.exports = ElkWorld;
