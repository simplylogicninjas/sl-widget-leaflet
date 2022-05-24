'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*\nPlace your custom CSS here\n*/\n.widget-hello-world {\n\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNMTGVhZmxldEdlb0pTT04uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBQ0Q7O0FBRUEiLCJmaWxlIjoiU0xMZWFmbGV0R2VvSlNPTi5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuUGxhY2UgeW91ciBjdXN0b20gQ1NTIGhlcmVcbiovXG4ud2lkZ2V0LWhlbGxvLXdvcmxkIHtcblxufVxuIl19 */";
var stylesheet="/*\nPlace your custom CSS here\n*/\n.widget-hello-world {\n\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNMTGVhZmxldEdlb0pTT04uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztDQUVDO0FBQ0Q7O0FBRUEiLCJmaWxlIjoiU0xMZWFmbGV0R2VvSlNPTi5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuUGxhY2UgeW91ciBjdXN0b20gQ1NTIGhlcmVcbiovXG4ud2lkZ2V0LWhlbGxvLXdvcmxkIHtcblxufVxuIl19 */";
styleInject(css_248z);

var SLLeafletGeoJSON = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': css_248z,
	stylesheet: stylesheet
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(SLLeafletGeoJSON);

function preview() {
    return React.createElement(React__default["default"].Fragment, null);
}
function getPreviewCss() {
    return require$$0;
}

exports.getPreviewCss = getPreviewCss;
exports.preview = preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xMZWFmbGV0R2VvSlNPTi5lZGl0b3JQcmV2aWV3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiLi4vLi4vLi4vc3JjL1NMTGVhZmxldEdlb0pTT04uZWRpdG9yUHJldmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc3R5bGVJbmplY3QoY3NzLCByZWYpIHtcbiAgaWYgKCByZWYgPT09IHZvaWQgMCApIHJlZiA9IHt9O1xuICB2YXIgaW5zZXJ0QXQgPSByZWYuaW5zZXJ0QXQ7XG5cbiAgaWYgKCFjc3MgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cblxuICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGluc2VydEF0ID09PSAndG9wJykge1xuICAgIGlmIChoZWFkLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHlsZUluamVjdDtcbiIsImltcG9ydCBSZWFjdCwgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpZXcoKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPFJlYWN0LkZyYWdtZW50IC8+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldmlld0NzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiByZXF1aXJlKFwiLi91aS9TTExlYWZsZXRHZW9KU09OLmNzc1wiKTtcbn1cbiJdLCJuYW1lcyI6WyJzdHlsZUluamVjdCIsImNzcyIsInJlZiIsImluc2VydEF0IiwiZG9jdW1lbnQiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjcmVhdGVUZXh0Tm9kZSIsIlJlYWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCQyxHQUExQixFQUErQjtBQUM3QixNQUFLQSxHQUFHLEtBQUssS0FBSyxDQUFsQixFQUFzQkEsR0FBRyxHQUFHLEVBQU47QUFDdEIsTUFBSUMsUUFBUSxHQUFHRCxHQUFHLENBQUNDLFFBQW5COztBQUVBLE1BQUksQ0FBQ0YsR0FBRCxJQUFRLE9BQU9HLFFBQVAsS0FBb0IsV0FBaEMsRUFBNkM7QUFBRTtBQUFTOztBQUV4RCxNQUFJQyxJQUFJLEdBQUdELFFBQVEsQ0FBQ0MsSUFBVCxJQUFpQkQsUUFBUSxDQUFDRSxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUE1QjtBQUNBLE1BQUlDLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxhQUFULENBQXVCLE9BQXZCLENBQVo7QUFDQUQsRUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsVUFBYjs7QUFFQSxNQUFJTixRQUFRLEtBQUssS0FBakIsRUFBd0I7QUFDdEIsUUFBSUUsSUFBSSxDQUFDSyxVQUFULEVBQXFCO0FBQ25CTCxNQUFBQSxJQUFJLENBQUNNLFlBQUwsQ0FBa0JKLEtBQWxCLEVBQXlCRixJQUFJLENBQUNLLFVBQTlCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xMLE1BQUFBLElBQUksQ0FBQ08sV0FBTCxDQUFpQkwsS0FBakI7QUFDRDtBQUNGLEdBTkQsTUFNTztBQUNMRixJQUFBQSxJQUFJLENBQUNPLFdBQUwsQ0FBaUJMLEtBQWpCO0FBQ0Q7O0FBRUQsTUFBSUEsS0FBSyxDQUFDTSxVQUFWLEVBQXNCO0FBQ3BCTixJQUFBQSxLQUFLLENBQUNNLFVBQU4sQ0FBaUJDLE9BQWpCLEdBQTJCYixHQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMTSxJQUFBQSxLQUFLLENBQUNLLFdBQU4sQ0FBa0JSLFFBQVEsQ0FBQ1csY0FBVCxDQUF3QmQsR0FBeEIsQ0FBbEI7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7OztTQ3ZCZSxPQUFPO0lBQ25CLE9BQU9PLG9CQUFDUSx5QkFBSyxDQUFDLFFBQVEsT0FBRyxDQUFDO0FBQzlCLENBQUM7U0FFZSxhQUFhO0lBQ3pCLE9BQU8sVUFBb0MsQ0FBQztBQUNoRDs7Ozs7In0=
