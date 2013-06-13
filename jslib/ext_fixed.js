delete Ext.tip.Tip.prototype.minWidth;
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


Ext.apply(Ext.Object, {
  toStrutsParamString: function(obj, pref){
    var pref = pref || '';
    var strutsString = '';
    if (typeof obj == 'object'){
      if (obj.constructor == Array){
        for (var i in obj){
          if (typeof obj[i] == 'object'){
            strutsString += this.toStrutsParamString(obj[i], pref + '[' + i + ']');
          }else{
            strutsString += '&' + pref + '[' + i + ']=' + obj[i];
          }
        }
      }else if (obj.constructor == Object){
        for (var key in obj){
          if (!obj[key]){
            strutsString += '&' + pref + '.' + key + '=';
          }else if (typeof obj[key] == 'object'){
            strutsString += this.toStrutsParamString(obj[key], pref + '.' + key);
          }else{
            strutsString += '&' + pref + '.' + key + '=' + obj[key];
          }
        }
      }
    }else{
      strutsString = obj;
    }
    return strutsString.substring(1);
  }
});