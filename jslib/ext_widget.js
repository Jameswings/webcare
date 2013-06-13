Ext.onReady(function(){
  Ext.define('WebCare.Waterfall',{
    singleton: true,
    requires: ['Ext.DomHelper', 'Ext.String'],

    msgCt: undefined,
    errCt: undefined,

    constructor: function(){
      this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
      this.errCt = Ext.DomHelper.insertFirst(document.body, {id:'err-div'}, true);
    },

    createBox: function (t, s){
      return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },

    msg: function(title, format){
      var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
      var m = Ext.DomHelper.append(this.msgCt, this.createBox(title, s), true);
      m.hide();
      m.slideIn('t').ghost("t", { delay: 1500, remove: true});
    },
    err: function(title, format){
      var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
      var m = Ext.DomHelper.append(this.errCt, this.createBox(title, s), true);
      m.hide();
      m.slideIn('t').ghost("t", { delay: 2000, remove: true});
    }
  });
});

