module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    tusk_coffee: {
      vendor: {
        options: {
          wrap: null
        , runtime: false
        }
      , files: {
          'public/vendor-javascripts/vendor.js': [
            'vendor/javascripts/common.js'
          , 'vendor/javascripts/react.js'
          , 'vendor/javascripts/jquery.js'
          , 'vendor/javascripts/bootstrap.js'
          , 'vendor/javascripts/bootstrap-editable.js'
          ]
        }
      }
    }

  , babel: {
      options: {
        sourceMap: false
      }
    , main: {
        files: [{
          expand: true
        , cwd: 'app/'
        , src: ['**/*.js']
        , dest: 'public/raw-javascripts/'
        , ext: '.js'
        }]
      }
    }

  , commonjs: {
      modules: {
        cwd: 'public/raw-javascripts/'
      , src: ['**/*.js']
      , dest: 'public/built-javascripts/'
      }
    }

  , clean: {
      build: [
        'public'
      ]
    , raw: [
        'public/raw-javascripts'
      , 'public/built-javascripts'
      , 'public/vendor-javascripts'
      , 'public/raw-stylesheets'
      , 'public/built-stylesheets'
      ]
    }

  , copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/assets/', src: ['**'], dest: 'public'}
        ]
      }
    }

  , watch: {
      options: {
        nospawn: true
      }
    , livereload: {
        files: [
          'app/**/*.html'
        , 'app/templates/**/*.html'
        , 'app/**/*.js'
        , 'app/**/*.less'
        ]
      , tasks: ['build']
      }
    }

  , html2js: {
      options: {
        base: 'app'
      }
    , main: {
        src: ['app/templates/**/*.html']
      , dest: 'public/built-javascripts/templates.tmp.js'
      }
    }

  , less: {
      dist: {
        options: {
          paths: ['stylesheets']
        }
      , files: {
          'public/raw-stylesheets/app.css': ['app/stylesheets/base.less']
        }
      }
    , minify: {
        options: {
          cleancss: true
        , report: 'min'
        }
      , files: {
          'public/raw-stylesheets/app.min.css': 'public/raw-stylesheets/app.css'
        }
      }
    }

  , cssmin: {
      combine: {
        files: {
          'public/raw-stylesheets/vendor.css': ['vendor/stylesheets/*.css']
        }
      }
    , minify: {
        files: {
          'public/built-stylesheets/vendor.css': ['public/raw-stylesheets/vendor.css']
        }
      }
    }

  , concat: {
      app: {
        src: 'public/built-javascripts/**/*.js'
      , dest: 'public/built-javascripts/app.js'
      }
    , javascripts: {
        src: [
          'public/vendor-javascripts/vendor.js'
        , 'public/built-javascripts/app.js'
        //, 'public/javascripts/templates.js'
        ]
      , dest: 'public/javascripts/index.js'
      }
    , stylesheets: {
        src: [
          'public/raw-stylesheets/vendor.css'
        , 'public/raw-stylesheets/app.min.css'
        ]
      , dest: 'public/stylesheets/index.min.css'
      }
    }

  , uglify: {
      main: {
        files: {
          'public/javascripts/index.js': ['public/javascripts/index.js']
        }
      }
    }
  });

  grunt.registerTask('live', ['build', 'watch']);
  grunt.registerTask('deploy', ['build', 'uglify']);
  grunt.registerTask('build', [
    'clean:build'
  //, 'html2js'
  , 'babel'
  , 'tusk_coffee'
  , 'commonjs'
  , 'less:dist'
  , 'less:minify'
  , 'cssmin:combine'
  , 'copy:main'
  , 'concat:app'
  , 'concat:javascripts'
  , 'concat:stylesheets'
  , 'cssmin:minify'
  , 'clean:raw'
  ]);
};
