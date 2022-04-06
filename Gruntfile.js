module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	var sass = require('node-sass');
	
	grunt.initConfig({
		pkg     : grunt.file.readJSON('package.json'),
		// Using node-sass and grunt-sass
		// Requires defining the implementation of sass used
		// https://github.com/sass/node-sass
		sass    : {
			nested     : {
				options : {
					implementation : sass,
					sourceMap      : false,
					outputStyle    : 'nested',
				},
				files   : [
					{
						expand : true,
						cwd    : 'scss/',
						src    : [
							'*.scss',
							'!_*.scss',
						],
						dest   : 'css/',
						ext    : '.css',
					},
				],
			},
			compressed : {
				options : {
					implementation : sass,
					sourceMap      : false,
					outputStyle    : 'compressed',
				},
				files   : [
					{
						expand : true,
						cwd    : 'scss/',
						src    : [
							'*.scss',
							'!_*.scss',
						],
						dest   : 'css/',
						ext    : '.css',
					},
				],
			},
		},
		postcss : {
			options : {
				map        : true,
				processors : [
					require('autoprefixer'),
				],
			},
			dist    : {
				src : [
					'css/*.css',
				],
			},
		},
		
	});
	
	grunt.loadNpmTasks('grunt-postcss');
	
	grunt.registerTask('build-sass', ['sass:nested', 'postcss']);
	grunt.registerTask('default',    ['sass:compressed', 'postcss']);
	
};