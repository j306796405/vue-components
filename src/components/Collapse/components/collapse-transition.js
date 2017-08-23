import {addClass, removeClass} from '@/utils/dom'

class Transition {
  beforeEnter(el) {
    addClass(el, 'collapse-transition')

    el.style.height = 0
  }

  enter(el) {
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px'
    } else {
      el.style.height = ''
    }
    el.style.overflow = 'hidden'
  }

  afterEnter(el) {
    removeClass(el, 'collapse-transition')
    el.style.height = ''
  }

  beforeLeave(el) {
    el.style.height = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
  }

  leave(el) {
    if (el.scrollHeight !== 0) {
      addClass(el, 'collapse-transition')
      el.style.height = 0
    }
  }

  afterLeave(el) {
    removeClass(el, 'collapse-transition')
  }
}

export default {
  name: 'VmCollapseTransition',
  functional: true,
  render (createElement, context) {
    const transition = new Transition()
    const data = {
      on: {
        'before-enter': transition.beforeEnter,
        'enter': transition.enter,
        'after-enter': transition.afterEnter,
        'before-leave': transition.beforeLeave,
        'leave': transition.leave,
        'after-leave': transition.afterLeave
      }
    }

    return createElement('transition', data, context.children)
  }
}
