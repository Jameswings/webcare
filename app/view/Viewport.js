Ext.define('WebCare.view.Viewport', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  requires: [
    'WebCare.view.TipsDatePicker',
    'WebCare.view.EcgList',
    'WebCare.view.CustomerView',
    'WebCare.view.EcgDetail',
    'WebCare.view.CustomerForm',
    'WebCare.view.DiagnosisForm',
    'Ext.ux.statusbar.StatusBar'
  ],
  initComponent: function () {
    this.items = [
      {
        region: 'north',
        weight: 10,
        xtype: 'container',
        style: {backgroundImage: '-webkit-linear-gradient(top,#f3f6fc,#cbdaf0)'},
        html: '<h1 style="padding-left: 10px; margin: 0; float:left;"><img height="48" width="48" align="absmiddle" src="images/banner.jpg" /> Web Care </h1><div style="float: right; font-size: 12pt; padding-right: 10px; height: 48px; margin: 18px 0"/><a href="javascript:void(0)" onclick="Ext.Msg.alert(\'System\', \'Go to reporting\')">Reporting</a></div>',
        height: 50,
        layout: {
          type: 'hbox',
          align: 'middle'
        }
      },
      {
        region: 'north',
        weight: 2,
        split : true,
        collapsible: true,
        xtype: 'customerForm'
      },
      {
        region: 'west',
        weight: 9,
        xtype: 'container',
        layout: 'fit',
        width: 250,
        split: true,
        splitterResize: false,
        stateful: true,
        stateId: 'mainnav.west1',
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
                height: 200
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
        weight: 8,
        xtype: 'customerView',
        width: 300,
        stateful: true,
        stateId: 'mainnav.west2'
      },
      {
        region: 'south',
        weight: 10,
        xtype: 'container',
        layout: 'fit',
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
      },
      {
        region: 'east',
        weight: 5,
        collapsible: true,
        xtype: 'diagnosisForm'
      },
      {
        region: 'center',
        weight: 1,
        xtype: 'container',
        layout: 'fit',
        items: {
          xtype: 'ecgDetail'
        }
      }
    ]
    this.callParent();
  }
});