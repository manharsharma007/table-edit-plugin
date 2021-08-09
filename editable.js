;(function ( $, window, document, undefined ) {

    var pluginName = 'editable',
        defaults = {
            url: 'http://localhost',
            method: 'GET',
            attributeClass: 'editable-col'
        };

    // The actual plugin constructor
    function Plugin( element, options, callback ) {
        $self = this;
        $self.element = element;

        $self.options = $.extend( {}, defaults, options) ;
        $self._name = pluginName;
        $self.callback = callback;
        $self.selectedElement = {};

        $self.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
        init: function() {
            back = $($self.element).find('.editable-back');
            front = $($self.element).children('.editable-front');
            back.hide();

            $(document).mouseup(function (e) {

                var container = $self._getValue('element');
                if (container !== null && !$(container).is(e.target) && $(container).has(e.target).length === 0) {
                    front = $self._getValue('front');
                    back = $self._getValue('back');
                    bind = $self._getValue('bind');

                    front.show();
                    back.hide();
                    front.text(bind.val());

                    $self._doSubmit();

                    $self._nullValues();
                }

                return;
            });

            // Add column
            $($self.element).on('click', '.'+$self.options.attributeClass, function () {
                $self._toggleShow(this);
            });
        },

        _nullValues: function() {
            $self.selectedElement = {};
        },

        _setValue: function(key, value) {
            $self.selectedElement[key] = value;
        },

        _getValue: function(key) {
            if($self.selectedElement.hasOwnProperty(key)) {
                return $self.selectedElement[key];
            }
            else {
                return null;
            }
        },

        _toggleShow: function (el) {
            if($self._getValue('element') !== el) {
                front = $(el).children('.editable-front');
                back = $(el).children('.editable-back');

                bind = $(back).children('.editable-bind');

                $self._setValue('front', front);
                $self._setValue('back', back);
                $self._setValue('bind', bind);
                $self._setValue('element', el);

                front.hide();
                back.show();
            }
        },

        _doSubmit: function () {
            if($self._getValue('element') !== null) {
                parent = $self._getValue('element');
                el = $self._getValue('bind');
                name = $(el).attr('name');
                index = $(el).attr('data-index');
                value = el.val();

                param = Object.assign({}, { name : value, id : index }, $self.options.baseParams);
                var callbacks = $.Callbacks();
                $.get( $self.options.url, param).always( function(data){
                    callbacks.add( $self.callback );
                    callbacks.fire( data );
                });
            }
        },
    } );
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options, callback ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options, callback));
            }
        });
    }

})( jQuery, window, document );
