module.exports = {
	content: ['./src/**/*.svelte'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				montserrat: "'Montserrat', sans-serif"
			},
			colors: {
				lblack: '#282E3B',
				iris: {
					100: '#F0F2FF',
					200: '#BDC2FF',
					300: '#7581FF',
					400: '#5261FF',
					500: '#424FD6',
					600: '#2E39AD',
					700: '#1C2582'
				},
				acrylic: {
					100: '#F7F7F8',
					200: '#DBDBE1',
					300: '#C1C2CD',
					400: '#A5A7B6',
					500: '#76788F',
					600: '#5E6073',
					700: '#22232A',
					800: '#0B0C0E'
				}
			}
		}
	},
	plugins: []
};
