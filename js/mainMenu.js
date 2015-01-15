var menuItems = [
	{
		name: 'Back to game',
		title: 'Продолжить',
		action: function() {
			L.newLevel(GS.levelID);
		}
	},
	{
		name: 'New game',
		title: 'Новая игра',
		action: function() {
			L.newLevel(0);
		}
	},
	{
		name: 'Go to level',
		title: 'Выбрать уровень',
		action: function() {
			L.newLevel(0);
		}
	},
	{
		name: 'About',
		title: 'О программе',
		action: function() { 
			L.newLevel(0);
		}
	}
];
/*
Crafty.sprite(24,32,"images/font-hand-24x32.png", {
	EMPTY:[0,0],
	A:[1,2],
	B:[2,2],
	C:[3,2],
	D:[4,2],
	E:[5,2],
	F:[6,2],
	G:[7,2],
	H:[8,2],
	I:[9,2],
	J:[10,2],
	K:[11,2],
	L:[12,2],
	M:[13,2],
	N:[14,2],
	O:[15,2],
	P:[0,3],
	Q:[1,3],
	R:[2,3],
	S:[3,3],
	T:[4,3],
	U:[5,3],
	V:[6,3],
	W:[7,3],
	X:[8,3],
	Y:[9,3]
});
Crafty.c('Char',{
	init: function() {
		this.requires('2D,Canvas').attr({w:24,h:32});
	}
});
	
*/


Crafty.c('menuBtn', {
	init: function() {
		this.requires('2D, Canvas, Color, Mouse')
			.attr({
				x: 0,
				w: Settings.CanvasW,
				h: 32,
				z: 2
			})
			.color('green');

		this.bind('MouseOver', function() {
			this.color('red');
		});

		this.bind('MouseOut', function() {
			this.color('green');
		});

	},
	/*
	text:function(text){
		var c;
		for(var i = 0; i<text.length;i++){
			c = Crafty.e("Char",text.charAt(i).toUpperCase());
			c.shift(i*c.w);
			this.attach(c);
		}
	},
	*/
	setClick: function(done) {
		this.bind('Click', function() {
			done();
		});
	}
});


Crafty.c('MainMenuBG', {
	init: function() {
		this.requires('2D, Canvas, Image')
			.attr({
				x: 0,
				w: Settings.CanvasW,
				h: Settings.CanvasH
			})
			.image("images/bg-paper.png", "repeat");
	}
});


Crafty.scene('MainMenuScene', function() {
	Crafty.e('MainMenuBG');
	var isNeedShow = true;
	var placement = 0;
	for (var i = 0; i < menuItems.length; i++) {
		isNeedShow = true;
		if (menuItems[i].name == 'Back to game') {
			if (GS.isFirstStart) {
				isNeedShow = false;
				GS.isFirstStart = false;
			}
		}
		if (isNeedShow) {
			placement ++;
			var item = Crafty.e('menuBtn');
			item.attr({
				y: Settings.Heigth * placement
			});
			// item.text(menuItems[i].name);
			item.setClick(menuItems[i].action);
		}
	}
    var FONT_BLUE_BUBBLE = "images/font-hand-24x32.png";
    var txt1 = "BlueBubble!";
    var ts1 = 24;
    var text1 = Crafty.e("2D, Canvas, SpriteText")
                .attr({x: 0, y: 0, w: txt1.length*ts1, h: 32})
                .registerFont("BlueBubble", ts1, FONT_BLUE_BUBBLE)
                .text(txt1);
});
