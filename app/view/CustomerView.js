Ext.define('WebCare.view.CustomerView', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.customerView',
  title: 'Customer List',
  columns: [
    {header: "Name", flex: .6, dataIndex: 'nickName'},
    {header: "Sex", flex: .4, dataIndex: 'sexStr'},
    {header: "Age", flex: .4, dataIndex: 'age'},
    {
      xtype: 'checkcolumn',
      header: "Monitored",
      flex: .4,
      dataIndex: 'monitored'
    }
  ],
  store: 'CustomerInfo',
  viewConfig: {
    stripeRows: true
  },
//  title: 'Customer List',
  hideCollapseTool: true,
  loadMask: true,
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