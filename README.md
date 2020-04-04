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
2. Uncomment and modify (as needed) the component's relevant variables in `scss/custom.scss`. You can find these easily by searching the module name, since they are prefixed accordingly, e.g. `$breadcrumb-`
4. Uncomment the `@import` line for that module so it gets included
5. Add _docblock_ style comment with `@section` and `@example`

```css
@import "../node_modules/bootstrap/scss/buttons";
/**
 * @section Buttons
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
```

## Custom Module Workflow

1. Create a new scss file `scss/new-module-name.scss`
2. Add an `@import scss/new-module-name.scss`
3. Add _docblock_ style comment with `@section` and `@example` INSIDE your module file
