'use strict';

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const finalTimes = nodecg.Replicant('finalTimes', {defaultValue: {}, persistent: false});
	const timer = nodecg.Replicant('timer', 'nodecg-speedcontrol');

	router.get('/endRun', (req, res) => {
		finalTimes.value[req.query.runner] = {"igt": req.query.time, "rta": timer.value.time};
		res.send('');
	});

	router.get('/startTimer', (req, res) => {
		if (req.query.key == nodecg.bundleConfig.key) {
			nodecg.sendMessageToBundle('timerReset', 'nodecg-speedcontrol', false);
			nodecg.sendMessageToBundle('timerStart', 'nodecg-speedcontrol');
			res.send('Timer started');
		}
		else {
			res.send('Invalid key');
		}
	});

	router.get('/finalTimes', (req, res) => {
		res.json(finalTimes.value);
	});

	nodecg.mount('/nodecg-mafiamarathon', router);
};
