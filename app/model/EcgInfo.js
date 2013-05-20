Ext.define('WebCare.model.EcgInfo', {
  extend: 'Ext.data.Model',
  fields: ['id', 'doctor_id', 'ecg_id', 'customer_id',
    {name: 'type', type: 'int'},
    {name: 'status', type: 'int'},
    'annotation',
    {name: 'creation_time', type: 'date'}
  ],
  proxy: {
    url: 'ecg!getEcgList',
    reader: {
      type: 'json',
      root: 'value'
    }
  }
});