/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:app', function () {
  describe('when using no features', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
        ]
      })
      .on('end', done);
    });

    it('creates files', function () {
      assert.file([ 
        'app/images',
        'app/scripts/actions',
        'app/scripts/stores',

        'app/favicon.ico',
        'app/robots.txt',
        'app/scripts/app.js',
        'app/scripts/router.jsx',
        'app/scripts/components/layout.jsx',
        'app/scripts/components/home.jsx',
        'app/styles/main.css',
        'app/index.html',

        'gulpfile.js',
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        'README.md'
      ]);
    });
  });

  describe('when using modernizr', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeModernizr'
        ]
      })
      .on('end', done);
    });

    it('inserts modernizr to html', function () {
      assert.fileContent('app/index.html', /<script src="vendor\/modernizr\/modernizr.js"><\/script>/);
    });

    it('inserts modernizr to bower', function () {
      assert.fileContent('bower.json', /"modernizr"/);
    });
  });

  describe('when using compass', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeModernizr',
          'includeSass'
        ]
      })
      .on('end', done);
    });

    it('creates sass files', function () {
      assert.file([
        'app/styles/main.scss'
      ]);
    });

    it('doesn\'t create css files', function () {
      assert.noFile([
        'app/styles/main.css'
      ]);
    });

    it('inserts compass to gulp', function () {
      assert.fileContent('gulpfile.js', /'compass'/);
    });

    it('inserts modernizr to package.json', function () {
      assert.fileContent('package.json', /"gulp-compass"/);
    });

    it('inserts modernizr to home html component', function () {
      assert.fileContent('app/scripts/components/home.jsx', /<li>Modernizr<\/li>/);
    });
  });
});