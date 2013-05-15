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

  constructor: function(config) {

    this.initStateProvider();
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

  models: [],
  stores: [],
  controllers: [],
  launch: function(){
    var loadingMask = Ext.get('loading-mask');
    loadingMask.fadeOut({duration: 1000});

    var loading = Ext.get('loading');
    loading.fadeOut({duration: 1000 });
  }
});