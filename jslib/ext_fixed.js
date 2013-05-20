Ext.apply(Ext.Array, {
  toKeyValueMap: function(array, getKey, getValue, scope){
    var map = {},
      i = array.length;
    if (!getValue){
      if (!getKey) {
        while (i--) {
          map[array[i]] = array[i];
        }
      } else if (typeof getKey == 'string') {
        while (i--) {
          map[array[i][getKey]] = array[i];
        }
      } else {
        while (i--) {
          map[getKey.call(scope, array[i])] = array[i];
        }
      }
    }else if (typeof getValue == 'string'){
      if (!getKey) {
        while (i--) {
          map[array[i]] = array[i][getValue];
        }
      } else if (typeof getKey == 'string') {
        while (i--) {
          map[array[i][getKey]] = array[i][getValue];
        }
      } else {
        while (i--) {
          map[getKey.call(scope, array[i])] = array[i][getValue];
        }
      }
    }else{
      if (!getKey) {
        while (i--) {
          map[array[i]] = getValue.call(scope, array[i]);
        }
      } else if (typeof getKey == 'string') {
        while (i--) {
          map[array[i][getKey]] = getValue.call(scope, array[i]);
        }
      } else {
        while (i--) {
          map[getKey.call(scope, array[i])] = getValue.call(scope, array[i]);
        }
      }
    }

    return map;
  }
});