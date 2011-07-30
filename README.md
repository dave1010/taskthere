# To Do There

A simple location-based to do list manager. Currently beta quality.

Demo: http://dave1010.github.com/to-do-there/

Pull requests / patches welcome.

© 2011 David Hulbert. MIT license. No warranty.

## Features

* Create "places" based on geolocations
  - New places get the current geolocation
  - See a list of places
  - Manually switch between active places
  - Add/edit/delete places
  - Option to automatically switch places based on geolocation
  - Last known geolocation is saved
* Add tasks to places
  - Delete tasks
  - See a list of tasks associated with a place
* Fast
* Doesn't need Internet connection

## To Do

* Geolocation
  - Update an existing place to the current geolocation
  - Controls for geolocation (update interval)
  - Show geolocation info (maybe on hover)
* General
  - HTML5 application cache manifest (make it offline)
  - Remove jQuery dependency
  - Tests (probably QUnit)
* Build
  - Package as W3C widget (`make widget`)
  - Maemo desktop widget
  - Chrome extension
  - Opera widget
  - Android wiget?
  - Firefox extension?
  - Safari extension?

## Ideas

* Tasks
  - Undo delete task
  - Optional due date / start date for tasks
  - Optional tags / hierachy for tasks (use # or /)
* Places
  - Grouping places (e.g. so places called "Superstore" have the same tasks)
  - Show a dynamic / static Google map
  - Update an existing place to the current geolocation
* Basic syncing
  - "Sync" changes the URL hash, which you can copy/paste/email how you want (maybe a huge QR code)

## Design Goals

* UX
  - UI should be easy to understand
  - Should be quick to add tasks
  - Should be very quick to delete tasks (use case: shopping list)
  - Should look ok
* Technology
  - Should be a single page HTML document
  - Work offline & without any server-side technology
  - Should be usable as a mobile / desktop widget

## Non-goals

* Login or server-side syncing between devices
* IE support
* Kitchen sink (editing / ordering tasks)

## About

### Development tools

* Coded with Sublime Text 2 for Linux and nano on the Nokia N900
* MicroB (Firefox 3.5 browser) on Nokia N900 and Firefox 5 on a laptop

### Building

* Type `make` to build (uses GNU make).
* Type `make serve` to run Python webserver (`python -m SimpleHTTPServer`) in build directoy.
