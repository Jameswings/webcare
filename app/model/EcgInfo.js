Ext.define('WebCare.model.EcgInfo', {
  extend: 'Ext.data.Model',
  fields: ['id', 'doctorId', 'ecgId', 'customerId',
    {name: 'type', type: 'int'},
    {name: 'status', type: 'int'},
    'annotation',
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