Ext.define('WebCare.model.CustomerInfo', {
  extend: 'Ext.data.Model',
  fields: [
    'id', 'name', 'iden', 'nickName', 'cellPhone', 'phone',
    {name: 'type', type: 'int'},
    {name: 'sex', type: 'int'},
    {name: 'age', type: 'int'},
    {name: 'status', type: 'int'},
    {name: 'creationTime', type: 'date'}
  ],
  proxy: {
    url: 'json/empty.json',
    type: 'ajax',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});