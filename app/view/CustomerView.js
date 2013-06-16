Ext.define('WebCare.view.CustomerView', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.customerView',
  title: 'Customer List',
  columns: [
    {header: "Name", flex: .6, dataIndex: 'name'},
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
  initComponent: function(){
    Ext.apply(this, {
      collapsed: true,
      splitterResize: false,
      collapsible: true,
      collapseMode: 'mini',
      animCollapse: true
    });
    this.callParent();

    this.addEvents(
      /**
       * @event searchTriggerClick
       * Fires when the search triggers are clicked
       * @param {Number} index of trigger
       */
      'searchTriggerClick'
    );
  },
  tbar: [
    {
      xtype: 'checkbox',
      annotation: 'monitored',
      boxLabel: 'Monitored'
    },
    '->',
    {
      xtype: 'triggerfield',
      emptyText : 'Name',
      annotation: 'q',
      emptyText : 'ID / Name',
      onTrigger1Click: function(eOpts){
        this.up('customerView').fireEvent('searchTriggerClick', [0]);
      },
      onTrigger2Click: function(eOpts){
        this.up('customerView').fireEvent('searchTriggerClick', [1]);
      },
      trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
      trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger'
    }
  ],
  clearSearchField: function(){
    this.down('toolbar > trigger').reset();
  },
  getSearchFieldValue: function(){
    return this.down('toolbar > trigger').getValue();
  }
});