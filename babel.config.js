module.exports = {
	presets: [
		'@babel/preset-react',
		{
			runtime: 'automatic',
			importSource: 'myReact.createElement',
		},
	],
}