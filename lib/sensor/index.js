'use strict';

const { Appliance, Nameable } = require('appliances');

module.exports = Appliance.type(Parent => class Sensor extends Parent.with(Nameable) {
	static get type() {
		return 'hue:sensor';
	}

	constructor(bridge, def) {
		super();

		this.id = def.id;

		this.bridge = bridge;

		this._def = def;

		this.metadata.name = def.name;

		setImmediate(() => this.setExternalState(def.state));
	}

	setExternalState(state) {
	}

	changeName(name) {
		return this.bridge._sendApiRequest({
			method: 'PUT',
			url: 'sensors/' + this._def.internalId,
			data: { name: name }
		}).then(() => this.metadata.name = name);
	}
});