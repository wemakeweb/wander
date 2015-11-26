'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _intergrator = require('./intergrator');

var _intergrator2 = _interopRequireDefault(_intergrator);

var Spring = (function () {
  function Spring() {
    _classCallCheck(this, Spring);

    this.finished = this.finished.bind(this);
  }

  _createClass(Spring, [{
    key: 'setup',
    value: function setup(options) {
      this.options = Object.assign(options, {
        tension: 500,
        friction: 10,
        velocity: 0,
        tolerance: 1 / 10000,
        time: null
      });

      this._time = 0;
      this._value = 0;
      this._velocity = this.options.velocity;
      this._stopSpring = false;
      return this._integrator = new _intergrator2['default']((function (_this) {
        return function (state) {
          return -_this.options.tension * state.x - _this.options.friction * state.v;
        };
      })(this));
    }
  }, {
    key: 'next',
    value: function next(delta) {
      var finalVelocity, net1DVelocity, netFloat, netValueIsLow, netVelocityIsLow, stateAfter, stateBefore;
      if (this.finished()) {
        return 1;
      }
      this._time += delta;
      stateBefore = {};
      stateAfter = {};
      stateBefore.x = this._value - 1;
      stateBefore.v = this._velocity;
      stateAfter = this._integrator.integrateState(stateBefore, delta);
      this._value = 1 + stateAfter.x;
      finalVelocity = stateAfter.v;
      netFloat = stateAfter.x;
      net1DVelocity = stateAfter.v;
      netValueIsLow = Math.abs(netFloat) < this.options.tolerance;
      netVelocityIsLow = Math.abs(net1DVelocity) < this.options.tolerance;
      this._stopSpring = netValueIsLow && netVelocityIsLow;
      this._velocity = finalVelocity;
      return this._value;
    }
  }, {
    key: 'finished',
    value: function finished() {
      return this._stopSpring;
    }
  }]);

  return Spring;
})();

exports['default'] = Spring;
module.exports = exports['default'];