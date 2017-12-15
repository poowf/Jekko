# Jekko

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

Jekko is an AdonisJS Helper Package which helps you mark currently active items in your navigation.

It takes inspiration from the [Ekko](https://github.com/laravelista/Ekko) packaage for Laravel hence Jekko.

## Installation

From the command line:

```bash
npm install --save poowf/jekko
```


You will need to include the service provider in start/app.js

```javascript
const providers = [
  ...,
  '@poowf/jekko/providers/JekkoProvider'
]
```

And also include it in the globalMiddleware in start/kernel.js

```javascript
const globalMiddleware = [
  ...,
  'Poowf/Middleware/Jekko'
]
```

## Overview

To mark a menu item active in [Bootstrap](http://getbootstrap.com/components/#navbar), you need to add a `active` CSS class to the `<li>` tag:

```html
<ul class="nav navbar-nav">
    <li class="active"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>
```

With Jekko your code will look like this:

```html
<ul class="nav navbar-nav">
    <li class="{{ isActiveURL('/') }}"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>
```

What if you are not using Bootstrap, but some other framework or a custom design? Instead of returning `active` CSS class, you can make Ekko return any string you want:

```html
<ul class="nav navbar-nav">
    <li class="{{ isActiveURL('/', 'highlight') }}"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>
```

You can also use it in templating if you need to display some content depending on which page you are in your layout view:

```html
@if(isActiveRoute('home') != '')
    <p>Something that is only visible on the `home` route.</p>
@endif
```

## API

### isActiveRoute

Compares given route name with current route name.

```javascript
isActiveRoute($routeName, $output = "active")
```

**Examples:**

If the current route is `home`, function `isActiveRoute('home')` would return *string* `active`.

### isActiveURL

Compares given URL path with current URL path.

```javascript
isActiveURL($url, $output = "active")
```

**Examples:**

If the current URL path is `/about`, function `isActiveURL('/about')` would return *string* `active`.

### isActiveMatch

Detects if the given string is found in the current URL.

```javascript
isActiveMatch($string, $output = "active")
```

**Examples:**

If the current URL path is `/about` or `/insideout`, function `isActiveMatch('out')` would return *string* `active`.

### areActiveRoutes

Compares given array of route names with current route name.

```javascript
areActiveRoutes(array $routeNames, $output = "active")
```

**Examples:**

If the current route is `product.index` or `product.show`, function `areActiveRoutes(['product.index', 'product.show'])` would return *string* `active`.

### areActiveURLs

Compares given array of URL paths with current URL path.

```javascript
areActiveURLs(array $urls, $output = "active")
```

**Examples:**

If the current URL path is `/product` or `/product/create`, function `areActiveURLs(['/product', '/product/create'])` would return *string* `active`.

## License

The MIT License (MIT)

Copyright (c) 2017 Poowf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/@poowf/jekko.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@poowf/jekko

[travis-image]: https://img.shields.io/travis/poowf/Jekko/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/poowf/Jekko

[npm-downloads]: https://img.shields.io/npm/dm/@poowf/jekko.svg?style=flat-square