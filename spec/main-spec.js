'use strict';

const L = require('../src/index');
const process = require('process');

describe('The main method', function() {
  it('executes a testcase', function(done) {
    let side_effect = false;

    const testcase = L.create()
      .testcase(L.of()
        .chain(() => { side_effect = true; }));

    testcase.main().then(() => {
      expect(side_effect).toBe(true);
      done();
    });
  });

  it('sets the exit code', function(done) {
    const testcase = L.create()
      .before(() => { throw new Error('expected error'); })
      .testcase(L.of());

    testcase.main().catch(() => {
      expect(process.exitCode).toBe(1);
      process.exitCode = undefined;
      done();
    });
  });
});
