'use strict';

var nconf = require('nconf');
var json5 = require('json5');
var _ = require('lodash');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var StandardError = require('standard-error');


var rootPath = path.normalize(__dirname + '/..');


var computedConfig = {
	root: rootPath,
	modelsDir: rootPath + '/app/models'
};

nconf.argv()
	.env(['PORT', 'NODE_ENV', 'FORCE_DB_SYNC', 'forceSequelizeSync'])// Load select environment variables
	.defaults({
		store: {
			NODE_ENV: 'development'
		}
	});
var envConfigPath = rootPath + '/config/env/' + nconf.get('NODE_ENV') + '.json5';
try {
	if (!fs.statSync(envConfigPath).isFile()) {
		throw new Error();
	}
}
catch (err) {
	throw new StandardError('Environment specific config file not found! Throwing up! (NODE_ENV='
		+ nconf.get('NODE_ENV') + ')');
}
nconf.file(nconf.get('NODE_ENV'), {file: envConfigPath, type: 'file', format: json5})
	.file('shared', {file: rootPath + '/config/env/all.json5', type: 'file', format: json5})
	.add('base-defaults', {
		type: 'literal', store: {
			PORT: 5555
		}
	})
	.overrides({store: computedConfig});

module.exports = nconf.get();


module.exports.getGlobbedFiles = function (globPatterns, removeRoot) { // TODO remove
	var _this = this;

	var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

	var output = [];

	if (_.isArray(globPatterns)) {
		globPatterns.forEach(function (globPattern) {
			output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
		});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			output.push(globPatterns);
		} else {
			var files = glob(globPatterns, {sync: true});

			if (removeRoot) {
				files = files.map(function (file) {
					return file.replace(removeRoot, '');
				});
			}

			output = _.union(output, files);
		}
	}

	return output;
};
