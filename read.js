/**
 * Copyright (c) 2016-present, mcharytoniuk
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const readline = require('readline');

function read(oomfile) {
  return new Promise(function (resolve) {
    resolve(readline.createInterface({
      input: fs.createReadStream(oomfile),
    }));
  });
}

module.exports = read;
