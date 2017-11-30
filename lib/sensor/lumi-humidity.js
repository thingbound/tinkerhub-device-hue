'use strict';

const HueSensor = require('.');
const { RelativeHumidity } = require('appliances/sensor');

module.exports = class extends HueSensor.with(RelativeHumidity) {
	setExternalState(state) {
		super.setExternalState(state);

		this.updateRelativeHumidity(state.humidity / 100);
	}
};