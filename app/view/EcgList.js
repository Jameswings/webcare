Ext.define('WebCare.view.EcgList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.ecgList',
  store: 'EcgInfo',
  title: 'Ecg List',
  columns: [
    {header: "Name", flex: .6, dataIndex: 'customerId'},
    {header: "Date", flex: .4, dataIndex: 'date'}
  ],
  loadMask: true,

  viewConfig: {
    stripeRows: true
  },
  tbar: [
    {
      xtype: 'checkbox',
      boxLabel: 'T',
      listeners: {
        change: function(cmp, newValue, oldValue){

        }
      }
    },
    {
      xtype: 'checkbox',
      boxLabel: 'Unread',
      listeners: {
        change: function(cmp, newValue, oldValue){

        }
      }
    },
    '->',
    {
      xtype: 'triggerfield',
      emptyText : 'ID / Name',
      onTrigger1Click: function(eOpts){
        this.reset();
      },
      onTrigger2Click: function(eOpts){
        Ext.Msg.alert('System Info', 'Search by: ' + this.getValue());
      },
      trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
      trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger'
    }
  ]
});