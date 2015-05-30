module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        // make node configuration available for use
        pkg: grunt.file.readJSON('package.json'),

        // configure uglify
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'popMessenger.min.js': ['popMessenger.js']
                }
            }
        },

        // configure JSHint
        jshint: {
            app: ['popMessenger.js']
        }

    });

    // load pluginsng
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // default
    grunt.registerTask('default', ['jshint', 'uglify']);
    grunt.registerTask('minify', ['uglify']);
};