"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.check=function(o){return[]},exports.getProperties=function(o,t){return t.map((function(t){var r;return"manual"!==o.positionMode?("Position"===t.caption&&(t.propertyGroups=null===(r=t.propertyGroups)||void 0===r?void 0:r.filter((function(o){return"Manual position"!==o.caption}))),t):t}))};
