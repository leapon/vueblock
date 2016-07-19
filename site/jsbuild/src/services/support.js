// shallow copy of object
export function cloneObject(item) {
    var result = {};
    for (var property in item) {
      result[property] = item[property];
    }
    return result;
}

// get items from array by checking item's given property with given value
export function getArryItemByProperty(items, property, value) {
  var resultItem = null;
  for (var i = 0; i < items.length; i++) {
    if (items[i][property] == value) {
      resultItem = items[i];
      break;
    }
  }
  return resultItem;
}

// check conditions on given value, return matched item's values
/* example conditions: [
    {
      condition: ["==", "food"],
      values: ["fruit", "vegetable"]
    },
    {
      condition: ["!=", "food"],
      values: ["supply"]
    },
    {
      condition: true,
      values: ["container"]
    }
  ]
*/
export function getConditionMatchValues(value, conditions) {
  var result = [];
  for (var i = 0; i < conditions.length; i++) {
    var [conditionOp, conditionValue] = conditions[i].condition;
    //console.log('>>> check value:' + value + ' on condition:', conditionOp, conditionValue);
    switch(conditionOp) {
    case true:
      result = result.concat(conditions[i].values);
      break;
    case '==':
      if (value && value == conditionValue) {
        result = result.concat(conditions[i].values);
      }
      break;
    case '!=':
      if (value && value != conditionValue) {
        result = result.concat(conditions[i].values);
      }
      break;
    }
  }
  console.log('>>> getConditionMatchValues result:', result);
  return result;
}

