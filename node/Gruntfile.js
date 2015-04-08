module.exports = function(grunt) {
  var path = require("path");
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'assets/js/*.js', 'assets/js/**/*.js', '!assets/bower_components/**/*.js', '!assets/js/dist/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'assets/sass/*.scss', 'assets/sass/**/*.scss'],
      tasks: ['jshint', 'webpack:site', 'compass:dev']
    },

    webpack: {
      site: {
        // webpack options

        stats: {
            // Configure the console output
            colors: false,
            modules: true,
            reasons: true
        },

        externals: {
          jquery: "jQuery"
        },

        resolve: {
          root: path.resolve(__dirname, './assets'),
        },

        entry: [
          "./assets/js/index.js"
        ],
        output: {
            path: "assets/js/dist",
            filename: "[name]-page.js",
        },



      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'assets/sass',
          cssDir: 'assets/css/dist/',
          imagesDir: 'assets/images',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css/dist/',
          imagesDir: 'assets/images'
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['jshint', 'webpack:site', 'compass:dist']);
};
