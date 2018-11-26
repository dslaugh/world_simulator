class ElementRegistry {
	constructor() {
		this.registry = [];
		this.elements = [];
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
			this.elements.push(newElement.create());
			return true;
		} else {
			return false;
		}
	}

	elementFromCharacter(character) {
		const element = this.registry.find((reg) => {
			return reg.character === character;
		});

		if (element.create) {
			return element.create();
		}
		return element;
	}

	createByCharacter(character) {
		const element = this.registry.find(e => e.character === character);
		if (element && element.create) {
			return element.create();
		}
		throw Error(`Character: ${character} does not exist in the registry`);
	}
}

module.exports = ElementRegistry;
