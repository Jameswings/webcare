Ext.define('WebCare.model.EcgInfo', {
  extend: 'Ext.data.Model',
  fields: ['id', 'doctorId', 'ecgId', 'customerId', 'cuName', 'cuNickname', 'cuSexStr', 'cuIden', 'cuCellPhone', 'cuPhone', 'annotation',
    {name: 'type', type: 'int'},
    {name: 'status', type: 'int'},
    {name: 'cuSex', type: 'int'},
    {name: 'cuAge', type: 'int'},
    {name: 'creationTime', type: 'date'},
    {name: 'cuCreationTime', type: 'date'},
    {name: 'read', type: 'bool'}
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