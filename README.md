# JQuery Helper Constructor for Responsive Design

## Installation

```bash
$ bower install jquery.responsive
```

## Usage

```javascript
// Dispatcher instance with default breakpoint set
var dispatcher = $.responsive();
dispatcher.on('resize', function() {
    // Do something...
});
```

## Example

CSS pseudo elements set for different resolutions

```css
body:after {
    display: block;
    content: "mobile";
    font-size: 0;
}

@media (min-width: 768px) {
    body:after {
        display: block;
        content: "tablet"
    }
}

@media (min-width: 992px) {
    body:after {
        display: block;
        content: "desktop"
    }
}

@media (min-width: 1200px) {
    body:after {
        display: block;
        content: "largeDesktop"
    }
}
```

```javascript
// Initializing dispatcher with media queries set
var dispatcher = $.responsive({
  breakpoints: {
      mobile: 'mobile',
      tablet: 'tablet',
      desktop: 'desktop',
      largeDesktop: 'largeDesktop'
  }
});

// Triggers 'change' event each time breakpoint changed
dispatcher.on('change', function() {
    alert('Break point changed');
});

// Conditional event handling via available handlers

var $button1 = $('#button1');
var $button2 = $('#button2');
var $button3 = $('#button2');

var customFn = function (currentView) {
    alert('View: ' + currentView);
};

// Execute function for particular breakpoints in the array
$button1.on('click', function() {
    dispatcher.if(['mobile', 'desktop'], customFn, ['mobile or desktop']);
});

// Execute function for particular breakpoints excepting those which are in the array
$button2.on('click', function() {
    dispatcher.not(['mobile', 'desktop'], customFn, ['Not mobile or desktop']);
});

// Execute function for the single breakpoint which was generated on creation of instance according to the specified configuration breakpoints names
$button3.on('click', function() {
    dispatcher.ifMobile(customFn, ['mobile']);
});

// Getting current state for static dispatcher
alert(dispatcher.getBreakpoint());

// Getting current state for dynamic dispatcher
alert(dispatcher.state);
```

## License

MIT: http://rem.mit-license.org

