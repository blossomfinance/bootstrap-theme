# Blossom Bootstrap Theme

Blossom base branded theme for Bootstrap 4

## Getting Started

### Prerequisite

[Install NVM](https://www.codementor.io/@mercurial/how-to-install-node-js-on-macos-sierra-mphz41ekk)

### Installation

- Clone repo: `git clone git@github.com:blossomfinance/bootstrap-theme.git`
- `cd bootstrap-theme`
- `nvm install` this installs the correct Node.js version
- `nvm use` (maybe not necessary?)
- `npm install` this installs the dependencies

## View Style Guide

Launch the styleguide with live-reload enabled:

```
npm start
```

Your changes to the `.scss` will automatically reload the browser.

## Theming Bootstrap Workflow

1. [Review Bootstrap 4 Docs](https://getbootstrap.com/docs/4.4/) to identify components needed / relevant to include
2. Create a new stylesheet for that module under `scss/[module-name].scss` (example: `scss/buttons.scss`)
3. Import the bootstrap module at the top of the files `@import @import "../node_modules/bootstrap/scss/[module-name]";` (example: `@import @import "../node_modules/bootstrap/scss/buttons.scss";`)
4. Modify (as needed) the component's relevant variables in `scss/variables.scss`. You can find these easily by searching the module name, since they are prefixed accordingly, e.g. `$btn-`
5. Add _docblock_ examples in the stylesheet with at least `@page` `@section` and `@example`

```css
@import "../node_modules/bootstrap/scss/buttons";
/**
 * Example
 *
 * Default button styles
 *
 * @page Buttons
 * @section
 *
 * @example
 * <button type="button" class="btn btn-primary">Primary</button>
 * <button type="button" class="btn btn-secondary">Secondary</button>
 * <button type="button" class="btn btn-success">Success</button>
 * <button type="button" class="btn btn-danger">Danger</button>
 * <button type="button" class="btn btn-warning">Warning</button>
 * <button type="button" class="btn btn-info">Info</button>
 * <button type="button" class="btn btn-light">Light</button>
 * <button type="button" class="btn btn-dark">Dark</button>
 * <button type="button" class="btn btn-link">Link</button>
 */

 /**
  * Outline buttons
  *
  * In need of a button, but not the hefty background colors they bring?
  * Replace the default modifier classes with the `.btn-outline-*` ones
  * to remove all background images and colors on any button.
  *
  * @section
  * @page Buttons
  *
  * @example
  * <button type="button" class="btn btn-outline-primary">Primary</button>
  * <button type="button" class="btn btn-outline-secondary">Secondary</button>
  * <button type="button" class="btn btn-outline-success">Success</button>
  * <button type="button" class="btn btn-outline-danger">Danger</button>
  * <button type="button" class="btn btn-outline-warning">Warning</button>
  * <button type="button" class="btn btn-outline-info">Info</button>
  * <button type="button" class="btn btn-outline-light">Light</button>
  * <button type="button" class="btn btn-outline-dark">Dark</button>
  */
```

## Custom Module Workflow

1. Create a new scss file `scss/new-module-name.scss`
2. As you build, add _docblock_ style comment with `@section` and `@example` INSIDE your module file.
3. Don't forget to inport by adding `@import scss/new-module-name.scss` in the `scss/custom.scss`
