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
var $button3 = $('#button3');

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

// Execute function for the single breakpoint which was generated on creation of the instance
// according to the specified configuration breakpoints names
$button3.on('click', function() {
    dispatcher.ifMobile(customFn, ['mobile']);
});

// Getting current state for static dispatcher
alert(dispatcher.getBreakpoint());

// Getting current state for dynamic dispatcher
alert(dispatcher.state);
```

## Options

#### Defaults

This options will be used by default.

```javascript
var DEFAULT_SETTINGS = {
    breakpoints: [
        {
            name: 'mobile',
            value: 0
        },
        {
            name: 'tablet',
            value: 768
        },
        {
            name: 'desktop',
            value: 992
        },
        {
            name: 'largeDesktop',
            value: 1200
        }
    ],
    resize: true,
    proxy: null,
    interval: 100,
    indicator: document.body
};
```
#### Options Table

<table>
    <tr>
        <th>Key</th>
        <th>Type</th>
        <th>Default</th>
        <th>Required</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>breakpoints</td>
        <td>Array of objects, Object</td>
        <td>
        [
            {
                name: 'mobile',
                value: 0
            },
            {
                name: 'tablet',
                value: 768
            },
            {
                name: 'desktop',
                value: 992
            },
            {
                name: 'largeDesktop',
                value: 1200
            }
        ]
        </td>
        <td>No</td>
        <td>Specifies a set of available breakpoints (states)</td>
    </tr>
    <tr>
        <td>resize</td>
        <td>Boolean</td>
        <td>true</td>
        <td>No</td>
        <td>Specifies id dispatcher will trigger events on resize (dynamic or static dispatcher)</td>
    </tr>
    <tr>
        <td>proxy</td>
        <td>Function</td>
        <td>null</td>
        <td>No</td>
        <td>Specifies proxy function, such as deBounce or throttle</td>
    </tr>
    <tr>
        <td>interval</td>
        <td>Number</td>
        <td>100</td>
        <td>No</td>
        <td>Specifies interval for proxy function</td>
    </tr>
    <tr>
        <td>indicator</td>
        <td>DOM element</td>
        <td>document.body</td>
        <td>Yes, when using media queries</td>
        <td>Specifies element with CSS preset of after pseudo-elements for different resolutions</td>
    </tr>
</table>

## License

MIT: http://rem.mit-license.org

