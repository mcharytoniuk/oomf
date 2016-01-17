/**
 * Copyright (c) 2016-present, mcharytoniuk
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint func-names: 0 */
/* global afterEach: false, describe: false, it: false */

const assert = require('assert');
const dircompare = require('dir-compare');
const oomf = require('../index');
const path = require('path');
const Promise = require('bluebird');
const temp = require('temp').track();

describe('oomf', function () {
  afterEach(done => temp.cleanup(done));

  [
    'no_sections',
    'one_section',
    'several_sections',
  ].forEach(function (testName) {
    it('splits files: ' + testName, function () {
      const oomfile = path.resolve(__dirname, 'oomfiles', testName, testName + '.oomf');
      const oomfileExpectedOutputDirname = path.resolve(path.dirname(oomfile), 'expected_output');

      return Promise.all([
        oomf.read(oomfile),
        Promise.fromCallback(cb => temp.mkdir('oomfiles', cb)),
      ]).spread((fileStream, tmpdir) => oomf.write(oomfile, fileStream, tmpdir)).then(output => {
        assert.ok(dircompare.compareSync(output, oomfileExpectedOutputDirname).same);
      });
    });
  });
});
