const BASE_URL = ''

const players = ['bianca', 'henrique', 'grazieli', 'maria', 'pedro', 'vitor']

players.map(p => `${BASE_URL}?player=${p}`).map(p => console.log(p))
