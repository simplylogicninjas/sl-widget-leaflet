'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function getProperties(_values, defaultProperties) {
  // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.

  /* Example
  if (values.myProperty === "custom") {
      delete defaultProperties.properties.myOtherProperty;
  }
  */
  var properties = defaultProperties.map(function (property) {
    var _a;

    if (_values.positionMode !== "manual") {
      if (property.caption === "Position") {
        property.propertyGroups = (_a = property.propertyGroups) === null || _a === void 0 ? void 0 : _a.filter(function (it) {
          return it.caption !== "Manual position";
        });
      }

      return property;
    }

    return property;
  });
  return properties;
}

function check(_values) {
  var errors = []; // Add errors to the above array to throw errors in Studio and Studio Pro.

  /* Example
  if (values.myProperty !== "custom") {
      errors.push({
          property: `myProperty`,
          message: `The value of 'myProperty' is different of 'custom'.`,
          url: "https://github.com/myrepo/mywidget"
      });
  }
  */

  return errors;
}

exports.check = check;
exports.getProperties = getProperties;
