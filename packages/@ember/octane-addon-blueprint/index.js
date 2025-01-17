'use strict';

const stringUtil = require('ember-cli-string-utils');
const getURLFor = require('ember-source-channel-url');
const getRepoVersion = require('octane-blueprint-utils').getRepoVersion;

module.exports = {
  description: 'Generates an Ember Octane addon.',
  name: '@ember/octane-addon-blueprint',

  filesToRemove: [],

  locals(options) {
    return Promise.all([
      getRepoVersion('ember-cli', 'ember-cli'),
      getRepoVersion('ember-cli', 'ember-cli-htmlbars', 'colocation'),
      getURLFor('canary')
    ]).then(([emberCLI, emberCLIHTMLBars, emberURL]) => {
      let entity = { name: 'dummy' };
      let rawName = entity.name;
      let name = stringUtil.dasherize(rawName);
      let namespace = stringUtil.classify(rawName);

      let addonEntity = options.entity;
      let addonRawName = addonEntity.name;
      let addonName = stringUtil.dasherize(addonRawName);
      let addonNamespace = stringUtil.classify(addonRawName);

      return {
        name,
        modulePrefix: name,
        namespace,
        addonName,
        addonNamespace,
        emberCanaryVersion: emberURL,
        emberCLI,
        emberCLIHTMLBars,
        year: new Date().getFullYear(),
        yarn: options.yarn,
        welcome: options.welcome,
        blueprint: 'addon',
      };
    });

  },

  mapFile() {
    let result = this._super.mapFile.apply(this, arguments);
    if (result === 'npmignore') {
      return '.npmignore';
    }
    return result;
  },

};
