# Modal
Simple basic handler for Bootstrap (3 / 4 / 5) Modal

## History

- First version 2015-11-09 for Bootstrap 3
- Second version 2018-06-14 for Bootstrap 4
- Third version 2022-09-30 for Bootstrap 5

## JS requires

- Bootstrap (3 / 4 / 5) with jQuery

## Load
```js
require('./your/path/coercive/modal/dist/Modal.js');

new Modal();
```

## Basic alert
```js
new Modal({
    id: 'MyBasicAlertModal',
    title: 'Hello',
    content: 'This is an alert',
    topCancel: true,
    cancel: 'Close',
});
```

## Basic confirm
```js
new Modal({
    id: 'MyBasicConfirmModal',
    title: 'Hello',
    content: 'This is a confirmation request',
    topCancel: true,
    cancel: 'Cancel',
    confirm: 'Confirm',
    onConfirm: (Popup) => {

        alert('confirmed !');
        Popup.close();

    },
});
```

## Basic form modal
```js
new Modal({
    id: 'MyBasicConfirmModal',
    title: 'Hello',
    content: 'This is a form <form> ... </form>',
    topCancel: true,
    cancel: 'Cancel',
    confirm: 'Confirm',
    onConfirm: (Popup) => {

        //# Example of getting content Form
        let data = Popup.get().find('form').serializeArray();

        //# Example of getting form url
        let action = Popup.get().find('form').attr('action');

        //# Example of sending data
        $.ajax({
            method: 'POST',
            url: action,
            dataType: 'json',
            data: data
        }).done((json) => {

            //# Close current modal
            Popup.close();

            //# Need a confirm message ?
            new Modal({
                title: 'Hello',
                content: 'Your form has been sent',
                topCancel: true,
                cancel: 'Ok',
            });
            
        })

    },
});
```

## Options

### Compatibility
Some features do not behave the same from one version of Bootstrap to another. By default version 5 is loaded.
```js
new Modal({
    bootstrap: 3
});
```

### Auto open
The modal opens by default, but you can disable it.
```js
new Modal({
    open: false
});
```

### Hideable
The modal is hideable by default, but you can disable it.
```js
new Modal({
    hideable: false
});
```
You can also use behavior methods in the evolution of your script.
```js
let Popup = new Modal();

Popup.disable();

Popup.enable();
```

### Inject html
```js
let Popup = new Modal();

Popup.get().body(html);
```

### Add custom class or dialog class
```js
new Modal({
    class: 'my-custom-modal',
    dialogClass: 'modal-lg',
    confirmClass: 'example-custom-class',
    cancelClass: 'example-custom-class',
    topCancelClass: 'example-custom-class',
})
```

### Some events handler
```js
new Modal({
    onHide: (Popup) => {
        // do something
    },
    onHidden: (Popup) => {
        // do something
    },
    onShow: (Popup) => {
        // do something
    },
    onHide: (Popup) => {
        // do something
    },
    onCancel: (Popup) => {
        // do something
    },
    onConfirm: (Popup) => {
        // do something
    }
})
```

### Lock keyboard action
```js
new Modal({
    backdrop: 'static',
    keyboard: false,
})
```