Ext.define('WebCare.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  requires: [
    'WebCare.view.TipsDatePicker',
    'WebCare.view.EcgList',
    'WebCare.view.CustomerList',
    'Ext.ux.statusbar.StatusBar'
  ],
  initComponent: function () {
    this.items = [
      {
        region: 'north',
        xtype: 'container',
        style: {backgroundImage: '-webkit-linear-gradient(top,#f3f6fc,#cbdaf0)'},
        html: '<h1 style="padding-left: 10px; margin: 0"><img height="48" width="48" src="images/banner.jpg" />Web Care</h1>',
        height: 50,
        layout: {
          type: 'hbox',
          align: 'middle'
        }
      },
      {
        region: 'west',
        xtype: 'container',
        layout: 'fit',
        width: 250,
        split: true,
        splitterResize: false,
        stateful: true,
        stateId: 'mainnav.west10',
        weight: 10,
        items: [
          {
            xtype:'container',
            width: 250,
            height: '',
            layout: {
              type: 'vbox',
//            pack: 'center',
              align : 'stretch',
              pack  : 'start'
            },
            items: [
              {
                xtype: 'tipsdatepicker',
                width: 250,
                height: 200,
                handler: function(picker, date) {
                  Ext.Msg.alert('System Info', 'Search for day: ' + date);
                }
              },
              {
                xtype: 'ecgList',
                width: 250,
                flex: 1
              }
            ]
          }
        ]
      },
      {
        region: 'west',
        xtype: 'customerList',
        width: 300,
        stateful: true,
        stateId: 'mainnav.west9',
        weight: 9
      },
      {
        region: 'south',
        xtype: 'container',
        layout: 'fit',
        weight: 20,
        height: 28,
        border: false,
        items: {
          id: 'systemStatusBar',
          xtype: 'statusbar',
          defaultText: 'Default status',
//        statusAlign: 'right', // the magic config
          text: 'Connecting to server...',
          iconCls: 'x-status-busy',
          items: [{
            text: 'About us'
          }]
        }
      }
    ]
//    this.items = {
//      dockedItems: [{
//        dock: 'top',
//        xtype: 'toolbar',
//        height: 80,
//        items: [{
//          xtype: 'newstation',
//          width: 150
//        }, {
//          xtype: 'songcontrols',
//          flex: 1
//        }, {
//          xtype: 'component',
//          html: 'Pandora<br>Internet Radio'
//        }]
//      }],
//      layout: {
//        type: 'hbox',
//        align: 'stretch'
//      },
//      items: [{
//        width: 250,
//        xtype: 'panel',
//        id: 'west-region',
//        layout: {
//          type: 'vbox',
//          align: 'stretch'
//        },
//        items: [{
//          xtype: 'stationslist',
//          flex: 1
//        }, {
//          html: 'Ad',
//          height: 250,
//          xtype: 'panel'
//        }]
//      }, {
//        xtype: 'container',
//        flex: 1,
//        layout: {
//          type: 'vbox',
//          align: 'stretch'
//        },
//        items: [{
//          xtype: 'recentlyplayedscroller',
//          height: 250
//        }, {
//          xtype: 'songinfo',
//          flex: 1
//        }]
//      }]
//    };

    this.callParent();
  }
});