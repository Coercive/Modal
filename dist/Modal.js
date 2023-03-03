(function($){

    function build(Modal) {

        let stack = '';
        if(Modal.params.id) {
            stack += ' id="' + Modal.params.id + '"';
        }
        if(Modal.params.label) {
            stack += ' aria-labelledby="' + Modal.params.label + '"';
        }
        if(null !== Modal.params.hideable) {
            stack += ' hideable="' + (Modal.params.hideable ? 'true' : 'false') + '"';
        }
        if(null !== Modal.params.backdrop) {
            stack += ' data-bs-backdrop="' + Modal.params.backdrop + '"';
        }
        if(null !== Modal.params.keyboard) {
            stack += ' data-bs-keyboard="' + (Modal.params.keyboard ? 'true' : 'false') + '"';
        }

        return '' +
            '<div class="modal fade ' + Modal.params.class + '"' + stack + ' tabindex="-1" role="dialog" >' +
                '<div class="modal-dialog ' + Modal.params.dialogClass + '" role="document">' +
                    '<div class="modal-content">' +
                        buildHeader(Modal) +
                        buildBody(Modal) +
                        buildFooter(Modal) +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    function buildHeader(Modal) {
        if(!Modal.params.topCancel && !Modal.params.title) {
            return '';
        }

        let header =
            '<div class="modal-header">';

        if(Modal.params.topCancel && Modal.params.bootstrap === 3) {
            header +=
                '<button class="close modalTopBtnCancel" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        }

        if(Modal.params.title) {
            header += '<h5 class="modal-title" id="' + Modal.params.label + '">'+ Modal.params.title +'</h5>';
        }

        if(Modal.params.topCancel && Modal.params.bootstrap > 3) {
            header +=
                '<button type="button" class="btn-close modalTopBtnCancel '+ (Modal.params.topCancelClass || '') +'" data-bs-dismiss="modal" aria-label="Close"></button>';
        }

        header += '</div>';

        return header;
    }

    function buildBody(Modal) {
        if(!Modal.params.content) {
            return '';
        }

        return '' +
            '<div class="modal-body">' +
                Modal.params.content +
            '</div>';
    }

    function buildFooter(Modal) {
        if(!Modal.params.confirm && !Modal.params.cancel) {
            return '';
        }

        let footer =
            '<div class="modal-footer">' +
                '<span class="ajax-loader" style="display:none"></span>';

        if (Modal.params.cancel) {
            if(Modal.params.bootstrap === 3) {
                footer +=
                    '<button class="btn btn-default '+ Modal.params.cancelClass +' modalBtnCancel" type="button" data-dismiss="modal">' +
                        Modal.params.cancel +
                    '</button>';
            }
            else if(Modal.params.bootstrap > 3) {
                footer +=
                    '<button class="btn btn-default '+ Modal.params.cancelClass +' modalBtnCancel" type="button" data-bs-dismiss="modal">' +
                        Modal.params.cancel +
                    '</button>';
            }
        }

        if (Modal.params.confirm) {
            footer +=
                '<button class="btn btn-primary '+ Modal.params.confirmClass +' modalBtnConfirm" type="button">' +
                    Modal.params.confirm +
                '</button>';
        }

        footer +=
            '</div>'

        return footer;
    }

    /**
     * Prepare all handlers
     *
     * @param Modal
     * @return void
     */
    function buildHandlers(Modal) {
        buildHandlerShown(Modal);
        buildHandlerHideable(Modal);
        buildHandlerHide(Modal);
        buildHandlerCancel(Modal);
        buildHandlerConfirm(Modal);
        buildHandlerDisable(Modal);
        buildHandlerEnable(Modal);
        buildHandlerOpen(Modal);
        buildHandlerClose(Modal);
        buildHandlerUpdateTitle(Modal);
        buildHandlerUpdateBody(Modal);
    }

    /**
     * FOCUS / On Show
     *
     * @param Modal
     * @return void
     */
    function buildHandlerShown(Modal) {
        Modal.get().on('shown.bs.modal', function () {

            if(Modal.params.focus) {
                Modal.get().find(Modal.params.focus).focus();
            }

            if(Modal.params.onShow) {
                Modal.params.onShow(Modal);
            }

        });
    }

    /**
     * HIDEABLE
     *
     * @param Modal
     * @return void
     */
    function buildHandlerHideable(Modal) {
        Modal.get().on('hide.bs.modal', function(e) {
            if(!Modal.params.hideable) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
            if(Modal.params.onHide) {
                Modal.params.onHide(Modal);
            }
        });
    }

    /**
     * HIDDEN
     *
     * @param Modal
     * @return void
     */
    function buildHandlerHide(Modal) {
        Modal.get().on('hidden.bs.modal', function () {
            if(Modal.params.onHidden) {
                Modal.params.onHidden(Modal);
            }
        });
    }

    /**
     * CANCEL
     *
     * @param Modal
     * @return void
     */
    function buildHandlerCancel(Modal) {
        Modal.get().find('button.modalTopBtnCancel').click(function () {
            if(Modal.params.onCancel) {
                Modal.params.onCancel(Modal);
            }
        });
        Modal.get().find('button.modalBtnCancel').click(function () {
            if(Modal.params.onCancel) {
                Modal.params.onCancel(Modal);
            }
        });
    }

    /**
     * CONFIRM
     *
     * @param Modal
     * @return void
     */
    function buildHandlerConfirm(Modal) {
        Modal.get().find('button.modalBtnConfirm').click(function () {
            if(Modal.params.onConfirm) {
                Modal.params.onConfirm(Modal);
            }
        });
    }

    /**
     * DISABLE
     *
     * @param Modal
     * @return void
     */
    function buildHandlerDisable(Modal) {
        Modal.get().disable = function() {

            let ajax = Modal.get().find('.ajax-loader');
            if(ajax.length) {
                ajax.fadeIn();
            }

            let confirm = Modal.get().find('.modalBtnConfirm');
            if(confirm.length) {
                confirm.attr('disabled', 'disabled');
            }

            let cancel = Modal.get().find('.modalBtnCancel');
            if(cancel.length) {
                cancel.attr('disabled', 'disabled');
            }

            Modal.hideable(false);

            return Modal.get();
        };
    }

    /**
     * DISABLE
     *
     * @param Modal
     * @return void
     */
    function buildHandlerEnable(Modal) {
        Modal.get().enable = function() {

            let ajax = Modal.get().find('.ajax-loader');
            if(ajax.length) {
                ajax.fadeOut();
            }

            let confirm = Modal.get().find('.modalBtnConfirm');
            if(confirm.length) {
                confirm.removeAttr('disabled');
            }

            let cancel = Modal.get().find('.modalBtnCancel');
            if(cancel.length) {
                cancel.removeAttr('disabled');
            }

            Modal.hideable(true);

            return Modal.get();
        };
    }

    /**
     * OPEN
     *
     * @param Modal
     * @return void
     */
    function buildHandlerOpen(Modal) {
        Modal.get().open = function() {
            $('body').append(Modal.get());
            Modal.get().modal('handleUpdate');
            Modal.get().modal('show');
            return Modal.get();
        };
    }

    /**
     * CLOSE
     *
     * @param Modal
     * @return void
     */
    function buildHandlerClose(Modal) {
        Modal.get().close = function() {
            Modal.hideable(true);
            Modal.get().modal('hide');
            return Modal.get();
        };
    }

    /**
     * UPDATE TITLE
     *
     * @param Modal
     * @return void
     */
    function buildHandlerUpdateTitle(Modal) {
        Modal.get().title = function(html) {
            Modal.get().find('.modal-title').html(html);
            Modal.get().modal('handleUpdate');
            return Modal.get();
        };
    }

    /**
     * UPDATE BODY
     *
     * @param Modal
     * @return void
     */
    function buildHandlerUpdateBody(Modal) {
        Modal.get().body = function(html) {
            Modal.get().find('.modal-body').html(html);
            Modal.get().modal('handleUpdate');
            return Modal.get();
        };
    }

    /**
     * MODAL : Generate Bootstrap modal
     *
     * @param options
     * @returns {void}
     * @constructor
     */
    let Modal = function (options) {

        this.params = Object.assign({}, this.defaults, options);

        this.$Modal = $(build(this));
        buildHandlers(this);

        if(this.params.open) {
            this.open();
        }

    };

    /**
     * Returns builded modal
     *
     * @return {jQuery|HTMLElement|*}
     */
    Modal.prototype.get = function () {

        return this.$Modal;

    };

    /**
     * Open modal
     *
     * @return this
     */
    Modal.prototype.open = function () {

        this.$Modal.open();
        return this;

    };

    /**
     * Close modal
     *
     * @return this
     */
    Modal.prototype.close = function () {

        this.$Modal.close();
        return this;

    };

    /**
     * Enable modal
     *
     * @return this
     */
    Modal.prototype.enable = function () {

        this.$Modal.enable();
        return this;

    };

    /**
     * Disable modal
     *
     * @return this
     */
    Modal.prototype.disable = function () {

        this.$Modal.disable();
        return this;

    };

    /**
     * (Dis)Allow close modal
     *
     * @param {boolean} allow
     * @return this
     */
    Modal.prototype.hideable = function (allow) {

        this.params.hideable = !!allow;
        this.$Modal.attr('hideable', !!allow ? 'true' : 'false');
        return this;

    };

    /**
     * Remove modal
     *
     * @return this
     */
    Modal.prototype.remove = function () {

        this.$Modal.remove();
        return this;

    };

    /**
     * Defaults properties
     *
     * @type {{cancel: null, onShow: null, focus: null, onHidden: null, label: string, dialogClass: null, title: null, confirmClass: null, content: null, confirm: null, topCancel: null, onCancel: null, onConfirm: null, cancelClass: null, id: string, onHide: null, topCancelClass: null, class: null}}
     */
    Modal.prototype.defaults = {
        bootstrap: 5,
        open: true,
        hideable : true,
        id: 'bootstrapModal',
        label: 'myModalLabel',
        class: null,
        dialogClass: null,
        title: null,
        content : null,
        topCancel: null,
        topCancelClass: null,
        cancel: null,
        cancelClass: null,
        confirm : null,
        confirmClass : null,
        onHide : null,
        onHidden : null,
        onCancel : null,
        onConfirm : null,
        focus: null,
        onShow: null,
        backdrop: null,
        keyboard: null
    };

    /**
     * Global external access
     *
     * @type {Modal}
     */
    window.Modal = Modal;

})(jQuery);