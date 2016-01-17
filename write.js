/**
 * Copyright (c) 2016-present, mcharytoniuk
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REGEXP_OUTPUT_FILE_LINE = /^\-\-\s(.*?)$/;

function write(oomfile, readLineInterface, outputDirectoryOverride) {
  let writeStream;
  const outputDirectory = outputDirectoryOverride ? outputDirectoryOverride : path.dirname(oomfile);

  return new Promise(function (resolve, reject) {
    readLineInterface.on('line', function (line) {
      const matched = line.match(REGEXP_OUTPUT_FILE_LINE);

      if (matched) {
        if (writeStream) {
          writeStream.end();
        }
        writeStream = fs.createWriteStream(path.resolve(outputDirectory, matched[1]));
      } else {
        writeStream.write(line + '\n');
      }
    });

    readLineInterface.on('close', function () {
      resolve(outputDirectory);
    });
    readLineInterface.on('error', reject);
  });
}

module.exports = write;
