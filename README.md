# fi-ripple

Tiny (>4 KiB gzipped) no-dependencies ripple effect for plain js or vue.

## Usage

Install with `npm install fi-ripple`.

You will also need to install `dom4` if you want IE 10/11 support.

The ripple inherits the color from css. To change it, modify the `color` css property on the container.

### With Vue

```js
// dom4 is only needed for IE (10+) support – import it once
import 'dom4';
import Ripple from 'fi-ripple';

export default {
  directives: {
    Ripple,
  },
}
```

Now you can use the directive in your component template:

```html
<button v-ripple>Click me</button>
```

### With plain JS

```js
// import the Ripple constructor
import { FiRipple } from 'fi-ripple';

const rippleContainer = document.getElementById('test');
// listen for clicks inside the given container
new FiRipple(rippleContainer);
```
