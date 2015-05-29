# popMessenger
## A light-weight pop-up message service
### v0.1.0

## Dependencies:
  - angular.js
  - ngAnimate 1.3.15

## Setup:
  1. Add 'PopMessenger' as a dependency in your module.
  2. Add the 'pop' service as a dependency in your controller.

## To Use:
 Insert the <pop-message> tag into your HTML, configured as desired.
 To display a message, call 'pop(msg)'.

 If you would like to change the styles of your messages dynamically
 the config attributes will evaluate whatever bindings you supply them.

## Config:
The <pop-message> directive can be configured through the following attributes:

**pos**: position in the window where you want messages to display.
Accepts:
- 'top-left'
- 'top-right'
- 'bottom-left'
- 'bottom-right'

Default: bottom-right

**show**: the time in ms you want messages to display.

Default: 3000

**anim**: the style of enter/leave animation.
Accepts:
- 'vslide': slide/fade in an out vertically
- 'fade': only fade in and out

Default: vslide

**bg**: the background color of the message box.  Accepts CSS Color Names and rgb:
rgb(100, 100, 100), lightblue.

Default: lightgray

**txt-col**: the color of the message text.  Accepts the same parameters as bg.

Default: black

**alpha**: the opacity of the message box and message text.  Accepts 0 through 1:
30% = 0.3, 100% = 1, 80% = 0.8
Default: 0.5

[Demo](http://plnkr.co/edit/3GH3Iznr3JDeLqGna9DB?p=preview)
