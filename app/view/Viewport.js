Ext.define('WebCare.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  requires: [
    'WebCare.view.TipsDatePicker'
  ],
  initComponent: function () {
    this.items = [
      {
        region: 'north',
        xtype: 'container',
        style: {backgroundImage: '-webkit-linear-gradient(top,#f3f6fc,#cbdaf0)'},
        html: '<h1 style="padding-left: 10px">Banner</h1>',
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
        stateId: 'mainnav.west',
        weight: 10,
        items: [
          {
            xtype:'container',
            width: '250',
            layout: {
              type: 'vbox',
//            pack: 'center',
              align : 'stretch',
              pack  : 'start'
            },
            items: [
              {
                xtype: 'tipsdatepicker',
                handler: function(picker, date) {
                  Ext.Msg.alert('System Info', 'Search for day: ' + date);
                }
              }
            ]
          }
        ]
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