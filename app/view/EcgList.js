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
    startCollapsed: true,
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
//    this.columns = [
//
//    ];

    this.callParent();

    this.groupingFeature = this.view.getFeature('ecgGrouping');
//    this.groupingFeature.enable();
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
    {
      xtype: 'checkbox',
      boxLabel: 'T'
    },
    '-',
    {
      xtype: 'checkbox',
      boxLabel: 'Un'
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