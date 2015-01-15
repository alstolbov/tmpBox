Crafty.c('RegameBtn', {
	init: function() {
		var width = 70;
		this.requires('2D, Canvas, Color, Text, Mouse')
			.attr({
				x: Settings.CanvasW - width - 60,
				y: 10,
				w: width,
				h: 30,
				z: 2
			})
			.textFont({ size: '14px', weight: 'bold' })
			.text('Заново')
			.color('green');

		this.bind('MouseOver', function() {
			this.color('red');
		});

		this.bind('MouseOut', function() {
			this.color('green');
		});

		this.bind('Click', function() {
			L.rebuildLevel();
		});
	}
});
Crafty.c('MenuBtn', {
	init: function() {
		var width = 70;
		this.requires('2D, Canvas, Color, Text, Mouse')
			.attr({
				x: Settings.CanvasW - width,
				y: 10,
				w: width,
				h: 30,
				z: 2
			})
			.textFont({ size: '14px', weight: 'bold' })
			.text('Меню')
			.color('green');

		this.bind('MouseOver', function() {
			this.color('red');
		});

		this.bind('MouseOut', function() {
			this.color('green');
		});

		this.bind('Click', function() {
			L.menuLevel();
		});
	}
});
/*
Crafty.c('levelInfoField', {
	init: function() {
		this.requires('2D, Canvas, Text')
			.attr({ x: 0, y: 0 })
			.textFont({ size: '14px', weight: 'bold' })
			.text(GS.levelName + ': ' + GS.displayName);
	}
});
*/
Crafty.c('levelScoresField', {
	init: function() {
		this.requires('2D, Canvas, Text')
			.attr({ x: 5, y: 5 })
			.text('Score: ' + GS.totalScore);
	},

	setScore: function() {
		this.text('Score: ' + GS.totalScore);
	}
});
Crafty.c('PlayerLife', {
	init: function() {
		this.requires('2D, Canvas, Image')
			.attr({
				x: 3,
				y: 15,
				w: 20*GS.playerLifes,
				h:20
			})
			.image("images/heart.png", "repeat");
	},

	setWidth: function() {
		this.attr({w:20*GS.playerLifes});
	}
});

Crafty.c('SceneChanger',{
	init: function(){
		this.requires('2D, Canvas, Image')
			.attr({
				x: 0,
				y: 0,
				w: Settings.CanvasW,
				h: Settings.CanvasH,
				z: 5
			})
			.image("images/bg-paper.png", "repeat");

		this.alpha = 0.3;
	}
});
