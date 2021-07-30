'use strict';

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const finalTimes = nodecg.Replicant('finalTimes', {defaultValue: {}, persistent: false});

	router.get('/endRun', (req, res) => {
		finalTimes.value[req.query.runner] = req.query.time;
		nodecg.log.info(finalTimes.value);
		res.send('');
	});

	nodecg.mount('/nodecg-mafiamarathon', router);
};
