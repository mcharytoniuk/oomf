/**
 * Copyright (c) 2016-present, mcharytoniuk
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const read = require('./read');
const write = require('./write');

function oomf(oomfile) {
  return read(oomfile).then(function (fileStream) {
    return write(oomfile, fileStream);
  });
}

oomf.read = read;
oomf.write = write;

module.exports = oomf;
