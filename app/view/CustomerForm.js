Ext.define('WebCare.view.CustomerForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.customerForm',
  title: 'Customer Info',
  frame: false,
  bodyPadding: '5',
  items:
  {
    xtype: 'container',
    anchor: '100%',
    layout: 'hbox',
    items: [
      {
        xtype: 'container',
        flex: 1,
        layout: 'anchor',
        defaults: {
          anchor: '95%'
        },
        items: [
          {
            xtype: 'displayfield',
            fieldLabel: 'Name',
            name: 'name',
            value: '-'
          }, {
            xtype: 'displayfield',
            fieldLabel: 'ID',
            name: 'iden',
            value: '-'
          }, {
            xtype: 'displayfield',
            fieldLabel: 'Cell phone',
            name: 'cellPhone',
            value: '-'
          }
        ]
      },
      {
        xtype: 'container',
        flex: 1,
        layout: 'anchor',
        defaults: {
          anchor: '95%'
        },
        items: [{
          fieldLabel: 'Annotation',
          xtype: 'trigger',
          name: 'nickname',
          onTriggerClick: function(){
            WebCare.Waterfall.msg('[In Development]', 'update private annotation!');
          },
          value: '-'
        }, {
          xtype: 'displayfield',
          fieldLabel: 'Sex',
          name: 'sex',
          value: '-'
        }, {
          xtype: 'displayfield',
          fieldLabel: 'Age',
          name: 'age',
          value: '-'
        }]
      }
    ]
  }
});