Crafty.c('Place', {
	init: function() {

		this.status = 'empty';

		this.requires('2D, Canvas, Image, Mouse')
			.requires('spritePlace')
			.attr({
				w: Settings.Width,
				h: Settings.Heigth,
				status: 'empty'
			});
	},

	boxCollisionRules: function(box) {
		var isNeedStop = false;
		// switch (box.movement) {
		// 	case 'move right': 
		// 		if(box.x == this.x) {
		// 			isNeedStop = true;
		// 		}
		// 		break;
		// 	case 'move left':
		// 		if(box.x == this.x) {
		// 			isNeedStop = true;
		// 		}
		// 		break;
		// 	case 'move up':
		// 		if(box.y == this.y) {
		// 			isNeedStop = true;
		// 		}
		// 		break;
		// 	case 'move down':
		// 		if(box.y == this.y) {
		// 			isNeedStop = true;
		// 		}
		// 		break;
		// }

		if(box.x == this.x && box.y == this.y) {
			// box.x = this.x;
			// box.y = this.y;
			box.status = 'finished';
			box.onPlaceStanding();
			L.updateFinishSets();
			L.upScores();
		}
	}
});

Crafty.c('Wall', {
	init: function() {
		this.requires('2D, Canvas, Image')
			.requires('spriteWall')
			.attr({
				w: Settings.Width,
				h: Settings.Heigth
			});
	},

	boxCollisionRules: function(box) {
		box.status = 'stand';
		switch (box.movement) {
			case 'move right': 
				box.x = this.x - box.w;
				break;
			case 'move left':
				box.x = this.x + this.w;
				break;
			case 'move up':
				box.y = this.y + this.h;
				break;
			case 'move down':
				box.y = this.y - box.h;
				break;
		}
	}
});

Crafty.c('Box', {
	init: function() {
		var _this = this;

		this.status = 'stand';
		this.movement = false;

		this.requires('2D, Canvas, Image, Mouse, Collision')
			.requires('spriteBox')
			.attr({
				w: Settings.Width,
				h: Settings.Heigth
			});

		this.bind("EnterFrame", function() {
			if(this.status == 'move') {
				var isNeedRebuild = false;
				switch (this.movement) {
					case 'move right': 
						if((this.x + this.w) >= Settings.CanvasW) {
							isNeedRebuild = true;
						} else {
							this.x += Settings.Speed;
						}
						break;
					case 'move left':
						if(this.x <= 0) {
							isNeedRebuild = true;
						} else {
							this.x -= Settings.Speed;
						}
						break;
					case 'move up':
						if(this.y  <= 0) {
							isNeedRebuild = true;
						} else {
							this.y -= Settings.Speed;
						}
						break;
					case 'move down':
						if((this.y + this.h) >= Settings.CanvasH) {
							isNeedRebuild = true;
						} else {
							this.y += Settings.Speed;
						}
						break;
				}

				if(isNeedRebuild) {
					L.rebuildLevel();
					L.breakHeart();
				}
				
				if(this.hit('Wall')) {
					var currWall = this.hit('Wall')[0].obj;
					currWall.boxCollisionRules(this);
				}

				if(this.hit('Box')) {
					var currWall = this.hit('Box')[0].obj;
					currWall.boxCollisionRules(this);
				}

				if(this.hit('finishedBox')) {
					var currWall = this.hit('finishedBox')[0].obj;
					currWall.boxCollisionRules(this);
				}

				if(this.hit('Place')) {
					var currPlace = this.hit('Place')[0].obj;
					currPlace.boxCollisionRules(this);
				}
			}
		});
	},

	setStatusToMove: function(moveVector) {
		if(this.status !== 'finished') {
			this.status = 'move';
			this.movement = moveVector;
		}
	},

	onPlaceStanding: function() {
		this.requires('spriteFinishedBox');
	},

	boxCollisionRules: function(box) {
		box.status = 'stand';
		switch (box.movement) {
			case 'move right': 
				box.x = this.x - box.w;
				break;
			case 'move left':
				box.x = this.x + this.w;
				break;
			case 'move up':
				box.y = this.y + this.h;
				break;
			case 'move down':
				box.y = this.y - box.h;
				break;
		}
	}
});

Crafty.c('GameField', {
	init: function() {
		var _this = this;

		this.requires('2D, Canvas, Mouse')
			.attr({
				x: 0,
				y: 0,
				w: 700,
				h: 500
			});

		this.bind('MouseDown', function(e) {
			//this.status = 'move';
			var counter = 0;
			var mouseStart = {
				x: e.realX,
				y: e.realY
			};
			_this.bind('MouseMove', function(e) {
				//pass
			});

			_this.bind('MouseUp', function(e) {
				var mouseEnd = {
					x: e.realX,
					y: e.realY
				};
				// console.log(mouseStart, mouseEnd);
				_this.getTrace({
					start: mouseStart, 
					end: mouseEnd
				});
				_this.unbind('MouseMove');
				_this.unbind('MouseUp');
			});			
		});
	},

	getTrace: function(trace) {
		L.setTrace(trace);
	}
});
