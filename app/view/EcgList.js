Ext.define('WebCare.view.EcgList', {
  extend: 'Ext.grid.Panel',
  store: 'EcgInfo',
  title: 'Ecg List',
  columns: [
    {header: "Name", flex: .6, dataIndex: 'customer_id'},
    {header: "Date", flex: .4, dataIndex: 'date'}
  ],
  loadMask: true,

  viewConfig: {
    stripeRows: true
  },
  tbar: [
    {
      text: 'New User',
      handler: showContactForm
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
  ],
  initComponent: function(){

  }
});