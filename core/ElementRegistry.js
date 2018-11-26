class ElementRegistry {
	constructor() {
		this.registry = [];
	}


	registerElement(newElement) {
		if (!newElement.character) {
			throw Error('Element Registration Failed! Element must have a type property');
		}
		const alreadyRegistered = this.registry.some((element) => {
			return element.character === newElement.character;
		});

		if (!alreadyRegistered) {
			this.registry.push(newElement);
			return true;
		} else {
			return false;
		}
	}

	createByCharacter(character) {
		const element = this.registry.find(e => e.character === character);
		const brain = {};
		if (element) {
			if (element.brain) {
				brain.ai = new element.brain();
			}

			return Object.assign({}, element, brain);
		}
		throw Error(`Character: ${character} does not exist in the registry`);
	}
}

module.exports = ElementRegistry;
