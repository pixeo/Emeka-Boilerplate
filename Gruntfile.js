module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/css/main.css': 'src/scss/main.scss'
				}
			}
		},

		assemble: {
			options: {
				layoutdir: 'src/layouts',
				flatten: true
			},
			pages: {
				options: {
				  partials: ['src/partials/**/*.hbs' ]
				},
				src: ['src/emails/*.hbs'],
				dest: 'dist/'
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/img/',
					src: ['**/*.jpg', '**/*.png', '**/*.gif'],
					dest: 'dist/img/'
				},{
					expand: true,
					cwd: 'src/css/',
					src: ['**/*.css'],
					dest: 'dist/css/'
				}]
			}
		},

		compress: {
			main: {
				options: {
					archive: 'dist/assets.zip'
				},
				files: [{
					expand: true,
					cwd: 'dist/',
					src: ['css/**/*', 'img/**/*'],
					dest: '/'
				}],
			}
		},

		watch: {
			sass: {
				files: ['src/scss/*'],
				tasks: ['sass']
			},

			assemble: {
				files: [
					'src/emails/*',
					'src/layouts/*',
					'src/partials/**/*.hbs'
				],
				tasks: ['assemble']
			}
		}
	});



	require('time-grunt')(grunt); //Show Grunt build times
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'}); //Load grunt tasks
	grunt.loadNpmTasks('assemble');



	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass', 'assemble', 'copy', 'compress']);

};