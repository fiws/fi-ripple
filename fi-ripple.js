import './fi-ripple.css';

// default max ripple size
const MAX_SIZE = 300;

// px helper
const px = n => n.toString() + 'px';

// offsetX polyfill
const getOffset = (event, container) => {
  if (!event.target) return event;
  let target = event.target;
  if (event.offsetX !== undefined) {
    return { x: event.offsetX, y: event.offsetY };
  }
  // poor mans "pointer-events: none" polyfill
  const targetOk = target.isSameNode(container);

  while (!target.isSameNode(container)) {
    target = target.parentElement;
  }

  const offset = { x: 0, y: 0 };
  while(target.offsetParent) {
    offset.x += target.offsetLeft;
    offset.y += target.offsetTop;
    target = target.offsetParent;
  }

  offset.x = event.pageX - offset.x;
  offset.y = event.pageY - offset.y;

  return offset;
}

const calcRadius = (c, maxSize) => {
  return (Math.min(Math.max(c.offsetHeight, c.offsetWidth), maxSize) - 2) * 0.85;
}


export class FiRipple {
  constructor(el, opts = {}) {
    // default settings
    this.container = el;
    // prepare ripple container
    this.updateContainer();
    el.addEventListener('mousedown', this.spawnRipple.bind(this), { passive: true });
  }
  spawnRipple(event) {
    const container = this.container;
    const { x, y } = getOffset(event, container);
    const radius = calcRadius(container, event.maxSize || MAX_SIZE);

    // create the ripple & prepare it
    const ripple = document.createElement('div');
    ripple.className = 'fi-ripple';

    // calc the ripple size
    Object.assign(ripple.style, {
      transform: 'scale(0) translateZ(0)',
      width: px(radius * 2),
      height: px(radius * 2),
      left: px(x - radius),
      top: px(y - radius),
      backgroundColor: event.color || this.backgroundColor,
    });

    // Append child when the browser expects it
    window.requestAnimationFrame(() => {
      container.appendChild(ripple);

      // wait some time, so that the transition actually triggers
      window.requestAnimationFrame(() => {
        ripple.style.transform = `scale(1) translateZ(0)`;
      });
    });

    // programatic trigger
    if (event instanceof MouseEvent !== true) {
      if (event.persistent !== true) this.removeRipple(ripple);
      return ripple;
    }

    // the next mouseup event should remove the ripple again
    window.addEventListener('mouseup', this.removeRipple.bind(this, ripple), {
      passive: true,
      once: true,
    });


    return ripple;
  }
  removeRipple(ripple) {
    if (!ripple) return;

    // fade out ripple after some time
    setTimeout(() => ripple.style.opacity = 0, 150);

    // remove ripple after transition is done
    setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.container.removeChild(ripple);
      });
    }, 500);
  }
  updateContainer() {
    this.container.classList.add('fi-ripple-container');
    setTimeout(() => {
      this.backgroundColor = window.getComputedStyle(this.container).color;
    }, 0);
  }
  destroy() {
    // TODO: do we need to remove the class? (causes weird ripple positioning)
    // this.container.classList.remove('fi-ripple-container');
    this.container.removeEventListener('mousedown', this.spawnRipple);
  }
}

export default {
  name: 'fi-ripple',
  bind(el, binding, vnode) {
    el._fiRipple = new FiRipple(el);
  },
  update(el) {
    el._fiRipple.updateContainer();
  },
  unbind(el) {
    el._fiRipple.destroy();
  },
}
