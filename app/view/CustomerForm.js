Ext.define('WebCare.view.CustomerForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.customerForm',
  title: 'Customer Info',
  defaultType: 'textfield',
  frame: true,
  items: [
    {
      fieldLabel: 'Name',
      name: 'name',
      readonly: true,
      value: '-'
    },{
      fieldLabel: 'Nickname',
      name: 'nickname',
      readonly: true,
      value: '-'
    },{
      fieldLabel: 'ID',
      name: 'iden',
      readonly: true,
      value: '-'
    },  {
      fieldLabel: 'Sex',
      name: 'sex',
      readonly: true,
      value: '-'
    }, {
      fieldLabel: 'Age',
      name: 'age',
      readonly: true,
      value: '-'
    }, {
      fieldLabel: 'Cell phone',
      name: 'cellPhone',
      readonly: true,
      value: '-'
    }
  ]
});