Ext.define('WebCare.view.EcgList', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.ecgList',
  store: 'EcgInfo',
  title: 'Ecg List',
  features: [{
    ftype: 'grouping',
    groupHeaderTpl: ['Name: {[values.children[0].get("cuName")]} ({children.length} Item{[values.children.length > 1 ? "s" : ""]}, {children:this.getUnread} unread)',
      {
        getUnread: function(records){
          var unread = 0;

          Ext.each(records, function(item){
            if (item.get('read') === false){
              unread++ ;
            }
          });

          return unread;
        }
      }
    ],
    hideGroupedHeader: false,
    enableGroupingMenu: false,
    startCollapsed: false,
    id: 'ecgGrouping'
  }],
  columns: [
    {header: "Name", dataIndex: 'cuName', hidden: true, hideable: false},
    {header: "Type", flex: .3, dataIndex: '', groupable: false, hideable: false,
      renderer: function(value){
        return 'ECG';
      }
    },
    {header: "Time", flex: .7, dataIndex: 'creationTime', groupable: false, hideable: false,
      renderer: function(value){
        return Ext.util.Format.date(value, 'm-d H:i:s');
      }
    }
  ],
  viewConfig: {
    //Return CSS class to apply to rows depending upon data values
    getRowClass: function(record, index) {
      var read = record.get('read');
      return read ? 'read': 'unread';
    }
  },
  initComponent: function(){
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
  loadMask: true,

  viewConfig: {
    stripeRows: true
  },
  tools: [
    {
      type: 'plus',
      tooltip: 'Monitor Users',
      toolButton: 'addCustomer'
    }
  ],
  tbar: [
//    {
//      xtype: 'checkbox',
//      annotation: 'today',
//      boxLabel: 'T'
//    },
//    '-',
    {
      xtype: 'checkbox',
      annotation: 'unread',
      boxLabel: 'Unread'
    },
    '->',
    {
      xtype: 'trigger',
      annotation: 'q',
      emptyText : 'ID / Name',
      onTrigger1Click: function(eOpts){
        this.up('ecgList').fireEvent('searchTriggerClick', [0]);
      },
      onTrigger2Click: function(eOpts){
        this.up('ecgList').fireEvent('searchTriggerClick', [1]);
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
  },
  getTBarValues: function(){
    var me = this,
      result = {};
    result['unread'] = me.down('toolbar > checkbox[annotation=unread]').getValue();
    result['q'] = me.down('toolbar > trigger[annotation=q]').getValue();

    return result;
  }
});