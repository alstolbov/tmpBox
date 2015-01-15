
var L = {

	_isActiveBox: function() {
		var _this = this;
		var activeBox = undefined;
		for(var i = 0; i < GS.Boxes.length; i++) {
			var currBox = GS.Boxes[i];
			if( currBox.x < _this.trace.start.x && _this.trace.start.x < (currBox.x + currBox.w) ) {
				if( currBox.y < _this.trace.start.y && _this.trace.start.y < (currBox.y + currBox.h) ) {
					activeBox = i;
				}
			}
		}

		return activeBox;
	},

	_getMoveVector: function() {
		var diffX = this.trace.end.x - this.trace.start.x;
		var diffY = this.trace.end.y - this.trace.start.y;
		if(Math.abs(diffX) > Math.abs(diffY)) {
			if(diffX > 0) {
				return 'move right';
			} else {
				return 'move left';
			}
		} else {
			if(diffY > 0) {
				return 'move down';
			} else {
				return 'move up';
			}
		}
	},

	_createObject: function(objCode) {
		var _this = this;
		var obj = false;
		switch(objCode) {
			case 1:
				obj = Crafty.e('Place');
				break;
			case 2:
				obj = Crafty.e('Box');
				obj.attr({z:1});
				GS.needFinished++;
				GS.Boxes.push(obj);
				break;
			case 4:
				obj = Crafty.e('Wall');
				break;
		}

		return obj;
	},

	_createScene: function() {
		var _this = this;
		Crafty.scene(GS.levelName, function() {
			_this._sceneChangerOn();
			GS.finishSets = 0;
			GS.needFinished = 0;
			GS.Boxes = [];
			for(var i = 0; i < Levels[GS.levelID].map.length; i++) {
				var currRow = Levels[GS.levelID].map[i];
				for(var u = 0; u < currRow.length; u++) {
					var objCode = currRow[u];
					if(objCode) {
						var obj = _this._createObject(currRow[u]);
						if(obj) {
							obj.attr({
								x: u*Settings.Width, 
								y: i*Settings.Heigth + 2*Settings.Heigth
							});
						}
					}
				}
			}
			var GameField = Crafty.e('GameField').attr({z:2});
			_this._createInterface();
		});
	},

	_createInterface: function() {
		// var InfoField = Crafty.e('levelInfoField');
		this.ScoreField = Crafty.e('levelScoresField');
		this.playerLifesComp = Crafty.e('PlayerLife');
		// Crafty.e('RegameBtn');
		Crafty.e('MenuBtn');
	},

	_sceneChangerOn: function(next) {
		console.log('!');
		var _this = this;
		this.sceneChanger = Crafty.e('SceneChanger');
		setTimeout(function(){
			_this.sceneChanger.destroy();
		},600);
	},

	menuLevel: function(){
		Crafty.scene('MainMenuScene');
	},

	newLevel: function(levelID) {
		if(levelID !== undefined) {
			if(Levels[levelID] !== undefined) {
				//if(levelID) this._sceneChangerOn();
				GS.levelID = levelID;
				GS.levelName = Levels[levelID].levelName;
				GS.displayName = Levels[levelID].levelDisplayName;
				this._createScene();
				Crafty.scene(GS.levelName);
			} else {
				console.log('Пройден последний уровень!');
			}
		}
	},

	rebuildLevel: function() {
		Crafty.scene(GS.levelName);

	},

	nextLevel: function() {
		this.newLevel(GS.levelID + 1);
	},

	upScores: function() {
		GS.totalScore += Settings.upScore;
		this.ScoreField.setScore();
	},

	breakHeart: function() {
		GS.totalScore -= Settings.downScore;
		this.ScoreField.setScore();
		GS.playerLifes--;
		this.playerLifesComp.setWidth();
	},

	setTrace: function(trace) {
		this.trace = trace;
		var activeBox = this._isActiveBox();
		if (activeBox !== undefined) {
			var moveVector = this._getMoveVector();
			GS.Boxes[activeBox].setStatusToMove(moveVector);
		}
	},

	updateFinishSets: function() {
		var _this = this;
		GS.finishSets++;
		if(GS.finishSets == GS.needFinished) {
			console.log('Победа!');
			setTimeout(function() {
				_this.nextLevel();
			}, 200);
		}
	},
}
