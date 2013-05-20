Ext.define('WebCare.view.CustomerList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.customerList',
  store: 'CustomerInfo',
  title: 'Customer List',
  columns: [
    {header: "Name", flex: .6, dataIndex: 'nickName'},
    {header: "Sex", flex: .4, dataIndex: 'sex'},
    {header: "Age", flex: .4, dataIndex: 'age'},
    {header: "Monitored", flex: .4, dataIndex: 'status'}
  ],
  loadMask: true,

  viewConfig: {
    stripeRows: true
  },
  tbar: [
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
    Ext.apply(this, {
      collapsed: true,
      splitterResize: false,
      collapsible: true,
      collapseMode: 'mini',
      animCollapse: true
    });
    this.callParent();
  }
});