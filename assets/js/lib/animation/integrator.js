"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Integrator = (function () {
  function Integrator() {
    _classCallCheck(this, Integrator);
  }

  _createClass(Integrator, [{
    key: "integrateState",
    value: function integrateState(state, dt) {
      var a, b, c, d, dvdt, dxdt;
      a = this._evaluateState(state);
      b = this._evaluateStateWithDerivative(state, dt * 0.5, a);
      c = this._evaluateStateWithDerivative(state, dt * 0.5, b);
      d = this._evaluateStateWithDerivative(state, dt, c);
      dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx);
      dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);
      state.x = state.x + dxdt * dt;
      state.v = state.v + dvdt * dt;
      return state;
    }
  }, {
    key: "_evaluateState",
    value: function _evaluateState(initialState) {
      var output;
      output = {};
      output.dx = initialState.v;
      output.dv = this._accelerationForState(initialState);
      return output;
    }
  }, {
    key: "_evaluateStateWithDerivative",
    value: function _evaluateStateWithDerivative(initialState, dt, derivative) {
      var output, state;
      state = {};
      state.x = initialState.x + derivative.dx * dt;
      state.v = initialState.v + derivative.dv * dt;
      output = {};
      output.dx = state.v;
      output.dv = this._accelerationForState(state);
      return output;
    }
  }]);

  return Integrator;
})();

exports["default"] = Integrator;
;
module.exports = exports["default"];