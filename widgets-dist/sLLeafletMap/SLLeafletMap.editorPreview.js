'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

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

var css_248z = ".leaflet-container {\n    font-family: inherit !important;\n    font-size: inherit !important;\n}\n\n.leaflet-marker-icon {\n    background: none !important;\n    border: 0 !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNMTGVhZmxldE1hcC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSwrQkFBK0I7SUFDL0IsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLG9CQUFvQjtBQUN4QiIsImZpbGUiOiJTTExlYWZsZXRNYXAuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxlYWZsZXQtY29udGFpbmVyIHtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG4ubGVhZmxldC1tYXJrZXItaWNvbiB7XG4gICAgYmFja2dyb3VuZDogbm9uZSAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogMCAhaW1wb3J0YW50O1xufVxuIl19 */";
var stylesheet=".leaflet-container {\n    font-family: inherit !important;\n    font-size: inherit !important;\n}\n\n.leaflet-marker-icon {\n    background: none !important;\n    border: 0 !important;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNMTGVhZmxldE1hcC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSwrQkFBK0I7SUFDL0IsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksMkJBQTJCO0lBQzNCLG9CQUFvQjtBQUN4QiIsImZpbGUiOiJTTExlYWZsZXRNYXAuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxlYWZsZXQtY29udGFpbmVyIHtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdCAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdCAhaW1wb3J0YW50O1xufVxuXG4ubGVhZmxldC1tYXJrZXItaWNvbiB7XG4gICAgYmFja2dyb3VuZDogbm9uZSAhaW1wb3J0YW50O1xuICAgIGJvcmRlcjogMCAhaW1wb3J0YW50O1xufVxuIl19 */";
styleInject(css_248z);

var SLLeafletMap = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': css_248z,
	stylesheet: stylesheet
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(SLLeafletMap);

function preview() {
    return react.createElement("div", null);
}
function getPreviewCss() {
    return require$$0;
}

exports.getPreviewCss = getPreviewCss;
exports.preview = preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xMZWFmbGV0TWFwLmVkaXRvclByZXZpZXcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1pbmplY3QvZGlzdC9zdHlsZS1pbmplY3QuZXMuanMiLCIuLi8uLi8uLi9zcmMvU0xMZWFmbGV0TWFwLmVkaXRvclByZXZpZXcudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpZXcoKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPGRpdiAvPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpZXdDc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVxdWlyZShcIi4vdWkvU0xMZWFmbGV0TWFwLmNzc1wiKTtcbn1cbiJdLCJuYW1lcyI6WyJzdHlsZUluamVjdCIsImNzcyIsInJlZiIsImluc2VydEF0IiwiZG9jdW1lbnQiLCJoZWFkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwic3R5bGVTaGVldCIsImNzc1RleHQiLCJjcmVhdGVUZXh0Tm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFNBQVNBLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCQyxHQUExQixFQUErQjtBQUM3QixNQUFLQSxHQUFHLEtBQUssS0FBSyxDQUFsQixFQUFzQkEsR0FBRyxHQUFHLEVBQU47QUFDdEIsTUFBSUMsUUFBUSxHQUFHRCxHQUFHLENBQUNDLFFBQW5COztBQUVBLE1BQUksQ0FBQ0YsR0FBRCxJQUFRLE9BQU9HLFFBQVAsS0FBb0IsV0FBaEMsRUFBNkM7QUFBRTtBQUFTOztBQUV4RCxNQUFJQyxJQUFJLEdBQUdELFFBQVEsQ0FBQ0MsSUFBVCxJQUFpQkQsUUFBUSxDQUFDRSxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUE1QjtBQUNBLE1BQUlDLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxhQUFULENBQXVCLE9BQXZCLENBQVo7QUFDQUQsRUFBQUEsS0FBSyxDQUFDRSxJQUFOLEdBQWEsVUFBYjs7QUFFQSxNQUFJTixRQUFRLEtBQUssS0FBakIsRUFBd0I7QUFDdEIsUUFBSUUsSUFBSSxDQUFDSyxVQUFULEVBQXFCO0FBQ25CTCxNQUFBQSxJQUFJLENBQUNNLFlBQUwsQ0FBa0JKLEtBQWxCLEVBQXlCRixJQUFJLENBQUNLLFVBQTlCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xMLE1BQUFBLElBQUksQ0FBQ08sV0FBTCxDQUFpQkwsS0FBakI7QUFDRDtBQUNGLEdBTkQsTUFNTztBQUNMRixJQUFBQSxJQUFJLENBQUNPLFdBQUwsQ0FBaUJMLEtBQWpCO0FBQ0Q7O0FBRUQsTUFBSUEsS0FBSyxDQUFDTSxVQUFWLEVBQXNCO0FBQ3BCTixJQUFBQSxLQUFLLENBQUNNLFVBQU4sQ0FBaUJDLE9BQWpCLEdBQTJCYixHQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMTSxJQUFBQSxLQUFLLENBQUNLLFdBQU4sQ0FBa0JSLFFBQVEsQ0FBQ1csY0FBVCxDQUF3QmQsR0FBeEIsQ0FBbEI7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7OztTQ3ZCZSxPQUFPO0lBQ25CLE9BQU9PLGdDQUFPLENBQUM7QUFDbkIsQ0FBQztTQUVlLGFBQWE7SUFDekIsT0FBTyxVQUFnQyxDQUFDO0FBQzVDOzs7OzsifQ==
