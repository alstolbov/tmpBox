/*
	СДЕЛАТЬ:
	- графика для игры
	- уровни 
	- новые виды блоков
		- Кнопка: открывает скрытый Place
		- Разбиваемый блок
		- Направляющие: пропускают через себя Box, изменяя его траекторию движения
		- Рычаг: переключает направление Направляющей
		- Резиновый блок
	- интерфейсы: 
		- счет и инфо об игре
		- переход на уровень выше, рестарт уровня
		- начало и конец игры
	- жизни
	- выезд за пределы экрана - снятие одной жизни
	- расчет размеров игрового поля от размера окна (responsive)
*/


var Scripts = [
	'js/settings',
	'libs/spriteText',
	'js/components',
	'js/interfaceComponents',
	'js/map',
	'js/gameStore',
	'js/logic',
	'js/mainMenu'
];

require(Scripts, function() {
	//require.ready(function() {
		Crafty.init(Settings.CanvasW,Settings.CanvasH);
		Crafty.background('url(images/bg-paper.png) repeat');

		  Crafty.sprite(Settings.Width, "images/imageMap.png", {
		      spriteBox: [0,0],
		      spriteFinishedBox: [1,0],
		      spritePlace: [0,1],
		      spriteWall: [0,2]
		  });


		GS.totalScore = 0;
		GS.playerLifes = Settings.Lifes;
		
		L.newLevel(0);

	//});
});
