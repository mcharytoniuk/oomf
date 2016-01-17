# oomf (one origin multiple files)

`oomf` splits single file into separate files.

# usage

`sample_oomfile.oomf`
```
-- foo.txt
hello
-- bar.txt
world
```

`index.js`
```JavaScript
const oomf = require('oomf');

oomf('sample_oomfile.oomf').then(function () {
  // done
  // foo.txt contains 'hello'
  // bar.txt contains 'world'
});
```

You can also specify custom output directory (by default it's the dirname of
oomfile):

```JavaScript
const oomf = require('oomf');

oomf('sample_oomfile.oomf', '/some/other/dir');
```
