;(function($, document, window, undefined) {
  var _createHtml = 'createHtml';
  
  var Tabs = function (settings, selector) {
    this.defaults = {
      tabName: 'tabs-item',
      tabPaneName: 'tab-pane',
      close: 'close-icon'
    };
    this.settings = settings
    this.selector = selector;
    this.tab = this.selector.find('.' + this.defaults.tabName);
    this.panel = this.selector.find('.' + this.defaults.tabPaneName);
    this.tabs = this.selector.find('.' + this.settings.tabs);
    this.content = this.selector.find('.' + this.settings.content);
    this.defaultPage = this.settings.defaultPage;
    this.close = this.selector.find('.' + this.defaults.close);
    this.init();
  };
  
  Tabs.prototype = {
    init: function () {
      this._tabLength();
      this.tabsClickToggle();
      this.closeTab();
      this.addTab();
      this.initBody();
    },
    _tabLength () {
      var tab = this.selector.find('.' + this.defaults.tabName); 
      var isTab = tab.length > 0 ? true : false;
      if (!isTab) {
        this.selector.hide();
        this.defaultPage.show();
      } else {
        if (this.selector.css('display') === 'block') {
          return;
        }
        this.selector.show();
        this.defaultPage.hide();
        return;
      }
    },
    _createHtml (tabName, content, id) {
      var tabHtml = '<a class="tabs-item" href="#" tab=' + id + '>' + tabName + '<i class="close-icon fa fa-times"></i></a>';
      var panelHtml = '<div class="tab-pane tab-iframe-container">' +
                        '<iframe class="J_iframe" name="iframe0" width="100%" height="100%" src=' +content + ' frameborder="0" seamless></iframe>' + 
                      '</div>';
      this.tabs.append(tabHtml);
      this.content.append(panelHtml);
    },

    tabsClickToggle: function () {
      var _this = this;
      $(document).delegate('.' + this.defaults.tabName, 'click', function (e) {
        e.stopPropagation();

        var _index = $(this).index();
        var _panel = $(this).parent().parent().find('.' + _this.defaults.tabPaneName)

        _this._tabSelected($(this));
        _this._panelSelected(_panel, _index);
      });
    },

    _tabSelected (me) {
      me.addClass(this.settings.activeClass).siblings().removeClass(this.settings.activeClass);
    },

    _panelSelected (me, index) {
      me.eq(index).show().siblings().hide();
    },

    closeTab () {
      var _this = this;
      $(document).delegate('.' + this.defaults.close, 'click', function (e) {
        e.stopPropagation();
        var tabCurrent = $(this).parent();
        var tabPaneltabCurrent = _this.selector.find('.' + _this.defaults.tabPaneName);
        var _index = tabCurrent.index();

        tabCurrent.remove();
        tabPaneltabCurrent.eq(_index).remove();

        var tab = _this.selector.find('.' + _this.defaults.tabName);
        var tabPaneltab = _this.selector.find('.' + _this.defaults.tabPaneName);
        var length = tab.length;

        if (tabCurrent.hasClass(_this.settings.activeClass)) {
          _this._tabSelected(tab.eq(length - 1));
          _this._panelSelected(tabPaneltab, length - 1);
        }
        _this._tabLength();
      })
    },

    addTab (me) {
      var _this = this;
      $(document).delegate('.' + this.settings.menuCurrent, 'click', function (e) {
        e.stopPropagation();

        var _url = $(this).attr('url');
        if (_url == null || _url === '') {
          return;
        }
        var tab = _this.selector.find('.' + _this.defaults.tabName);
        var tabPanel = _this.selector.find('.' + _this.defaults.tabPaneName);
        var _id = $(this).attr('id');
        var isTabData= _this._isTab(_id);

        if (isTabData.is) {
          _this._tabSelected(tab.eq(isTabData.index));
          _this._panelSelected(tabPanel, isTabData.index);
          return;
        } else {
          var _length = _this.tabs.find('.tabs-item').length;
          if (_length >= _this.settings.max) {
            tab.eq(0).remove();
            tabPanel.eq(0).remove();
          }
          var _name = $(this).text();

          _this._createHtml(_name, _url, _id);
          var _lengthCurrent = _this.tabs.find('.tabs-item').length;
          var tabCurrent = _this.selector.find('.' + _this.defaults.tabName);
          var tabPanelCurrent = _this.selector.find('.' + _this.defaults.tabPaneName);

          _this._tabSelected(tabCurrent.eq(_lengthCurrent - 1));
          _this._panelSelected (tabPanelCurrent, _lengthCurrent - 1);
        }
        _this._tabLength();
      });
    },
    _isTab (id) {
      var tab = this.selector.find('.' + this.defaults.tabName);
      for (var i = 0; i < tab.length; i++) {
        if (tab[i].getAttribute('tab') === id) {
          return {is: true, index: i};
        }
      }
      return {is: false};
    },

    opentabByOtherUrl () {
      var _this = this;
      this.settings.otherUrlClick.on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var _url = $(this).attr('url');
        var _id = $(this).attr('id');
        var _name = $(this).attr('name');
         _this._createdTabs(_url, _name, _id);
      });
    }
  };

  Tabs.prototype.trigger = function (name) {
    var args = Array.prototype.slice.call(arguments, 1);
 
    this.selector.trigger($.Event(name), args);
  }

  Tabs.prototype.initBody = function () {
    
  }

  Tabs.EVENTS = {
    onCreatedTab: 'onCreatedTab'
  };

  $.fn.Tabs = function (options) {
    var options = options || {};
    var args = Array.prototype.slice.call(arguments, 1);
    var returnValue;

    if (typeof options === 'object') {
      return this.each(function () {
        var settings = $.extend({}, $.fn.Tabs.defaults, options);
        tabs = $(this).data('Tabs');
        
        if (!tabs) {
          tabs = new Tabs(settings, $(this));
          $(this).data('Tabs', tabs);
        }
      });
    } else if (typeof arguments[0] === 'string') {
      this.each(function () {
        tabs = $(this).data('Tabs');
        console.log('tabs', tabs[options])
        if (!tabs) {
          throw new Error('tab not used');
        }

        // returnValue = tabs[options].apply(tabs, args)
        // console.log('returnValue', returnValue);
      });
      console.log(this)
      return this;
    }
          
      // if (typeof settings === 'string') {
      //   if ($.inArray(options, allowedMethods) < 0) {
      //     throw new Error('Unknown method: ' + option);
      //   }

      //   if (!tabs) {
      //     return
      //   }

      //   value = data[option].apply(data, args);
      // }

      

  };
  $.fn.Tabs.defaults =  {
    activeClass: 'active',
    content: 'tabs-content',
    tabs: 'tabs',
    max: 5,
    menuCurrent: 'metismenu a',
    defaultPage: $('.default-iframe'),
    otherUrlClick: $('.other-url')
  };

})(jQuery, document, window);