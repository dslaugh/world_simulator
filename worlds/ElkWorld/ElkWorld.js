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
				default:
					break;
			}
		}
	}

	toString() {
		const result = [];
		const lineLength = this.gridWidth - 1;

		this.grid.each((point, pointValue) => {
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
