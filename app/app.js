/**
 * Applications configurations
 */
var careServerUrl = '/care_server/json/';

Ext.apply(Ext.Date, {
  defaultFormat: 'Y-m-d'
})

Ext.application({
  name: 'WebCare',
  /***
   * response status codes.
   */
  STATUS_EXCEPTION :          'exception',
  STATUS_VALIDATION_ERROR :   "validation",
  STATUS_ERROR:               "error",
  STATUS_NOTICE:              "notice",
  STATUS_OK:                  "ok",
  STATUS_HELP:                "help",
  /**
   * @cfg {Object} api
   * remoting api.  should be defined in your own config js.
   */
  api: {
    url: null,
    type: null,
    actions: {}
  },

  requestCount: 0,

  constructor: function(config) {

//    this.initStateProvider();
    Ext.apply(this, config);
    this.superclass.constructor.apply(this, arguments);
  },

  initStateProvider : function() {
    /*
     * set days to be however long you think cookies should last
     */
    var days = '';        // expires when browser closes
    if(days){
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var exptime = "; expires="+date.toGMTString();
    } else {
      var exptime = null;
    }

    // register provider with state manager.
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider', {
      path: '/',
      expires: exptime,
      domain: null,
      secure: false
    }));
  },

  autoCreateViewport: true,
  statusBar: undefined,

  controllers: ['Ecg', 'Customer', 'Diagnosis'],
  refs: [
    {
      ref: 'statusBar',
      selector: '#systemStatusBar'
    }
  ],
  launch: function(){
    window.app = this;
    var app = this;
    var loadingMask = Ext.get('loading-mask');
    loadingMask.fadeOut({duration: 1000});

    Ext.Ajax.on('beforerequest', function( conn, options, eOpts ){
      app.requestCount++;
      app.statusBusy();
    });

    Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts){
      app.requestCount--;
      if (app.requestCount <= 0){
        app.requestCount = 0; // reset to 0. compatible
        app.statusMsg();
      }
    });

    Ext.Ajax.on('requestexception', function(conn, response, options, eOpts){
      app.requestCount--;
      if (app.requestCount <= 0){
        app.requestCount = 0; // reset to 0. compatible
        app.statusErr(response.status + ': ' + response.statusText);
      }
    });

    var loading = Ext.get('loading');
    loading.fadeOut({duration: 1000 });
    this.statusBar = app.getStatusBar();
    Ext.Ajax.request({
      url: careServerUrl + 'system!ping',
      success: function(){
        app.statusMsg('Ready');
      },
      failure: function(){
        app.statusErr('Can not connect to server');
      }
    });

    app.refreshData();
    Ext.defer(app.initEcg, 1, this);
  },
  refreshData: function(){
    var me = this,
      ecgController = me.getEcgController(),
      customerController = me.getCustomerController();

    ecgController.onDateTipsLoad();
    ecgController.onEcgDataLoad();
  },
  initEcg: function(){
    var me = this,
      ecgController = me.getEcgController();

    ecgController.drawEcgBg();
  },
  statusErr: function(text){
    text = text || 'Can not connect to server';
    this.statusBar.setStatus({
      text: text,
      iconCls: 'x-status-error'
    })
  },
  statusMsg: function(text){
    text = text || 'Ready';
    this.statusBar.setStatus({
      text: text,
      iconCls: 'x-status-valid'
    })
  },
  statusBusy: function(text){
    text = text || 'Loading...';
    this.statusBar.setStatus({
      text: text,
      iconCls: 'x-status-busy'
    })
  },
  drawEcgBg: function (canvas){
    var startX = 5, startY = 12;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // context.lineWidth =1;
    context.strokeStyle = '#000000';

    var pxOf5mm = 20;

    var height = 250;
    var width = 150 * pxOf5mm;

    var y = startY;

    var ycount = parseInt(height / pxOf5mm);
    var xcount = parseInt(width / pxOf5mm);

    //alert(pxOf5mm * xcount + startX);

    //画X轴方向
    for(var i = 0; i <= ycount; i++){
      context.beginPath();
      context.lineWidth = 0.5;
      context.moveTo(startX, y);
      context.lineTo(pxOf5mm * xcount + startX ,y);
      context.stroke();

      var y1 = y + 4;
      for(var b = 0; b < 4 && (y + pxOf5mm) <= (startY + height) ; b++){
        context.lineWidth = 0.1;
        context.beginPath();
        context.moveTo(startX , y1);
        context.lineTo(pxOf5mm * xcount + startX ,y1);
        context.stroke();
        y1 = y + 4 + 4 * (b +1);
      }
      y = startY + pxOf5mm * ( i + 1);
    }

    //画Ｙ方向
    var x = startX;
    for(var i = 0; i <= xcount; i++){
      context.beginPath();
      context.lineWidth = 0.5;
      context.moveTo(x, startY);
      context.lineTo(x, pxOf5mm * ycount  + startY);
      context.stroke();

      var x1 = x + 4;
      for(var b = 0; b < 4 && (x + pxOf5mm) <= (startX + width); b++){
        context.lineWidth = 0.1;
        context.beginPath();
        context.moveTo(x1, startY);
        context.lineTo(x1, pxOf5mm * ycount + startY);
        context.stroke();
        x1 = x + 4 + 4 * (b +1);
      }
      x = startX + pxOf5mm * ( i + 1);
    }

    context.strokeStyle = '#007900';
    var drawX = 0;
    for(var n = 0;n <= 30; n++){
      context.fillText(n+'s', drawX, 10);
      drawX += pxOf5mm * 2.5 * 2;
    }
  },
  drawEcgLine: function(canvas, ecgData){
    var startX = 5, startY = 12;
    var context = canvas.getContext('2d');

    context.strokeStyle = '#0000db';
    //画心电图
    context.beginPath();
    context.lineWidth = 1;
    var x = startX;
    context.moveTo(x, 180-ecgData[0][0]);
    for (var i = 1; i <ecgData[0].length; i++){
      x = x + 1;
      context.lineTo(x, 180 - ecgData[0][i]);
    }
    context.stroke();

    context.strokeStyle = '#ff0000';
    //画心电图
    context.beginPath();
    context.lineWidth = 1;
    var x = startX;
    context.moveTo(x, 250 - ecgData[1][0]);
    for (var i = 1; i < ecgData[1].length; i++){
      x = x + 1;
      context.lineTo(x, 250 - ecgData[1][i]);
    }
    context.stroke();

    context.strokeStyle = '#007900';
    //画心电图
    context.beginPath();
    context.lineWidth = 1;
    var x = startX;
    context.moveTo(x, 320 - ecgData[2][0]);
    for (var i = 1; i < ecgData[2].length; i++){
      x = x + 1;
      context.lineTo(x, 320 - ecgData[2][i]);
    }
    context.stroke();
  }
});