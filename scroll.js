  var {
    OverlayScrollbars,
    ScrollbarsHidingPlugin, 
    SizeObserverPlugin, 
    ClickScrollPlugin 
  } = OverlayScrollbarsGlobal;
  var {
    OverlayScrollbars,
    ScrollbarsHidingPlugin, 
    SizeObserverPlugin, 
    ClickScrollPlugin 
  } = OverlayScrollbarsGlobal;

const osInstance = OverlayScrollbars(document.querySelector('body'), {
        paddingAbsolute: false,
        showNativeOverlaidScrollbars: false,
        update: {
            elementEvents: [
                ['img', 'load']
            ],
            debounce: [0, 33],
            attributes: null,
            ignoreMutation: null,
        },
        overflow: {
            x: 'scroll',
            y: 'scroll',
        },
        scrollbars: {
            theme: 'os-theme-dark',
            visibility: 'auto',
            autoHide: 'leave',
            autoHideDelay: 13000,
            dragScroll: true,
            clickScroll: false,
            pointers: [
              'mouse', 
              'touch', 
              'pen'
            ],
        },
    },

  {
    initialized(osInstance) {
        console.log("OverlayScrollbars initialized");
    }
  }
);
