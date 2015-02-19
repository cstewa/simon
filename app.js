angular.module('myApp', [])

.controller('MyCtrl1', function($timeout) {
  var self = this;

  self.turn = "";

  var available_colors = ["red", "orange", "green", "purple"];

  self.computerArray = [];

  self.userColors = [];

  var red_border = {'border-bottom':'80px solid #591202'}
  var orange_border = {'border-top':'80px solid #F2A663'};
  var purple_border = {'border-top':'80px solid #2B1A29'};
  var green_border = {'border-bottom':'80px solid #84FFBC'}

  self.redMousedown = function () {
    if (!self.turn.match(/Simon/)) {
      self.redTriangleStyle = {'border-bottom':'80px solid #F2A663'};
    }
  }
  self.orangeMousedown = function() {
    if (!self.turn.match(/Simon/)) {
      self.orangeTriangleStyle = {'border-top':'80px solid #591202'};
    }
  }

  self.purpleMousedown = function() {
    if (!self.turn.match(/Simon/)) {
      self.purpleTriangleStyle = {'border-top':'80px solid #84FFBC'};
    }
  }

 self.greenMousedown = function() {
    if (!self.turn.match(/Simon/)) {
      self.greenTriangleStyle = {'border-bottom':'80px solid #2B1A29'};
    }
  }

  var highlighted_styles = {
    red: function() {
      self.redTriangleStyle = {'border-bottom':'80px solid #F2A663'}
    },
    orange: function() {
      self.orangeTriangleStyle = {'border-top':'80px solid #591202'}
    },
    green: function() {
      self.greenTriangleStyle = {'border-bottom':'80px solid #2B1A29'}
    },
    purple: function() {
      self.purpleTriangleStyle = {'border-top':'80px solid #84FFBC'}
    }
  }

  var regain_normal_styles = function() {
    self.redTriangleStyle = red_border;
    self.orangeTriangleStyle = orange_border;
    self.purpleTriangleStyle = purple_border;
    self.greenTriangleStyle = green_border;
  }

  self.startGame = function() {
    self.gameOver = false;
    play_simons_turn();
  }

  var play_simons_turn = function() {
    self.turn = "Simon's";
    self.computerColors = [];
    choose_color();
    flash_colors();
  }

  var choose_color = function() {
    index = Math.floor(Math.random() * 4);
    color = available_colors[index];
    self.computerArray.push(color);
  }

  var compare_colors = function() {
    if (!angular.equals(self.computerArray[self.userColors.length - 1], self.userColors[self.userColors.length - 1])) {
      end_game();
    } else if (self.computerArray.length == self.userColors.length){
      $timeout(function(){self.userColors = []}, 1000)
      $timeout(play_simons_turn, 2000);
    }
  }

  var end_game = function() {
    self.turn = null;
    self.gameOver = true;
    self.computerArray = [];
    self.userColors = [];
  }

  var flash_colors = function() {
    time = 0
    angular.forEach(self.computerArray, function(color, index) {
      $timeout(function() { highlighted_styles[color].call() }, time);
      $timeout(function() {self.computerColors.push(color)}, time);
      time += 1000;
      $timeout(regain_normal_styles, time);
      time += 1000;
      $timeout(function() { if (index == self.computerArray.length - 1) {
        self.turn = "Your"
      }}, (time + 1000) )
    });
  }

  self.logUserColor = function(color) {
    if (!self.turn.match(/Simon/)) {
      self.userColors.push(color)
    }
    compare_colors();
  }
});