'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HlsLoader = function (_Hls$DefaultConfig$lo) {
  _inherits(HlsLoader, _Hls$DefaultConfig$lo);

  function HlsLoader() {
    _classCallCheck(this, HlsLoader);

    return _possibleConstructorReturn(this, (HlsLoader.__proto__ || Object.getPrototypeOf(HlsLoader)).apply(this, arguments));
  }

  _createClass(HlsLoader, [{
    key: 'loadInternal',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var context, xhr, stats, xhrSetup;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                context = this.context;
                xhr = this.loader = new XMLHttpRequest();
                stats = this.stats;


                stats.tfirst = 0;
                stats.loaded = 0;

                xhrSetup = this.xhrSetup;
                _context.prev = 6;

                if (!xhrSetup) {
                  _context.next = 18;
                  break;
                }

                _context.prev = 8;
                _context.next = 11;
                return xhrSetup(xhr, context.url);

              case 11:
                _context.next = 18;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](8);

                // fix xhrSetup: (xhr, url) => {xhr.setRequestHeader("Content-Language", "test")}
                // not working, as xhr.setRequestHeader expects xhr.readyState === OPEN
                xhr.open('GET', context.url, true);
                _context.next = 18;
                return xhrSetup(xhr, context.url);

              case 18:
                if (!xhr.readyState) {
                  xhr.open('GET', context.url, true);
                }
                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t1 = _context['catch'](6);

                // IE11 throws an exception on xhr.open if attempting to access an HTTP resource over HTTPS
                this.callbacks.onError({ code: xhr.status, text: _context.t1.message }, context, xhr);
                return _context.abrupt('return');

              case 25:

                if (context.rangeEnd) {
                  xhr.setRequestHeader('Range', 'bytes=' + context.rangeStart + '-' + (context.rangeEnd - 1));
                }
                xhr.onreadystatechange = this.readystatechange.bind(this);
                xhr.onprogress = this.loadprogress.bind(this);
                xhr.responseType = context.responseType;

                // setup timeout before we perform request
                this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout);
                xhr.send();

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 21], [8, 13]]);
      }));

      function loadInternal() {
        return _ref.apply(this, arguments);
      }

      return loadInternal;
    }()
  }]);

  return HlsLoader;
}(Hls.DefaultConfig.loader);

exports.default = HlsLoader;