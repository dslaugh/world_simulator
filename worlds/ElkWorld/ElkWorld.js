const World = require('../../core/World');

class ElkWorld extends World {
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
					this.grid.setCurrentValueAt(creature.point, this.elements.createByCharacter(' '));
					this.grid.setPreviousValueAt(creature.point, this.elements.createByCharacter(' '));
					break;
				case 'eat':
					const foodPoint = creature.point.add(action.point);
					const food = this.grid.currentValueAt(foodPoint);
					creature.object.health += food.energy;
					this.grid.moveValue(creature.point, foodPoint, this.elements.createByCharacter(' '));
					break;
				case 'grow':
					creature.object.energy += action.units;
					break;
				case 'reproduce':
					const newPoint = creature.point.add(action.point);
					this.grid.setCurrentValueAt(newPoint, this.elements.createByCharacter(action.character));
					this.grid.setPreviousValueAt(newPoint, this.elements.createByCharacter(' '));
					break;
				case 'hide':
					const previousValue = this.grid.previousValueAt(creature.point);
					const currentValue = this.grid.currentValueAt(creature.point);
					const hidingPoint = creature.point.add(action.point);
					const hidingPointValue = this.grid.currentValueAt(hidingPoint);
					hidingPointValue.ai.isOccupied = true;
					this.grid.setCurrentValueAt(creature.point, previousValue);
					this.grid.setPreviousValueAt(hidingPoint, currentValue); // This is to simulate hiding...
					break;
				case 'vacate':
					const occupant = this.grid.previousValueAt(creature.point);
					const vacatingPoint = creature.point.add(action.point);
					const vacatingCurrentValue = this.grid.currentValueAt(vacatingPoint);
					const hidingSpot = this.grid.currentValueAt(creature.point);
					hidingSpot.ai.isOccupied = false;
					this.grid.setPreviousValueAt(creature.point, this.elements.createByCharacter(' '));
					this.grid.setPreviousValueAt(vacatingPoint, vacatingCurrentValue);
					this.grid.setCurrentValueAt(vacatingPoint, occupant);
					break;
				default:
					break;
			}
		}
	}

	toString() {
		const result = [];
		const lineLength = this.gridWidth - 1;

		this.grid.each((point, pointValue, cellValue) => {
			let character = pointValue.character;
			let classes = 'point';
			if (pointValue.ai) {
				classes += ` ${pointValue.ai.state.name}`;
			}
			if (pointValue.iconClass) {
				classes += ` ${pointValue.iconClass}`;
				character = '';
			}

			const markup = `<div class="${classes}">${character}</div>`;
			result.push(markup);
			if (point.x === lineLength) {
				result.push('<br />');
			}
		});

		return result.join('');
	}

	step() {
		const actingCreatures = this.listActingCreatures();

		// To make sure there's always going to be grass
		const grass = this.grid.getByType('grass');
		if (grass.length < 1) {
			const emptySpaces = this.grid.getByType('empty');
			const randSpace = this.getRandomFromArray(emptySpaces);
			this.grid.setCurrentValueAt(randSpace.point, this.elements.createByCharacter('.'));

		}

		actingCreatures.forEach(this.processCreature.bind(this));
		return this.onStep();
	}
}

module.exports = ElkWorld;
