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
const fs = require('fs');
const oomf = require('../index');
const path = require('path');
const Promise = require('bluebird');
const temp = require('temp').track();

describe('oomf', function () {
  afterEach(done => temp.cleanup(done));

  it('generates no files if necessary', function () {
    const oomfile = path.resolve(__dirname, 'oomfiles', 'no_sections', 'no_sections.oomf');

    return Promise.fromCallback(cb => temp.mkdir('oomfiles', cb))
      .then(output => oomf(oomfile, output))
      .then(output => Promise.fromCallback(cb => fs.readdir(output, cb)))
      .then(outputFiles => assert.strictEqual(outputFiles.length, 0));
  });

  [
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
