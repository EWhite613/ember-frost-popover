import $ from 'jquery'
import Ember from 'ember'
import layout from '../templates/components/frost-popover'
import {
  target
} from 'liquid-tether'

function guidGenerator () {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

export default Ember.Component.extend({
  layout,
  visible: false,
  event: 'click',
  exitEvent: null,
  closest: false,
  to: null,
  position: 'bottom',
  index: 0,
  classNameBindings: ['position', 'visible:visible:invisible'],
  targetAttachment: Ember.computed('position', function () {
    let position = this.get('position')
    let result
    switch (position) {
      case 'bottom':
        result = 'bottom center'
        break
      case 'top':
        result = 'top center'
        break
      case 'right':
        result = 'middle right'
        break
      default:
        result = 'middle left'
        break
    }
    return result
  }),
  attachment: Ember.computed('position', function () {
    let position = this.get('position')
    let result
    switch (position) {
      case 'bottom':
        result = 'top center'
        break
      case 'top':
        result = 'bottom center'
        break
      case 'right':
        result = 'middle left'
        break
      default:
        result = 'middle right'
        break
    }
    return result
  }),
  didInsertElement () {
    let transitionService = this.get('container').lookup('service:liquid-fire-transitions')
    let randomID = guidGenerator()
    this.set('to', randomID + this.get('position'))
    transitionService.map(function () {
      this.transition(
        target(randomID + 'left'),
        this.use('tether', ['fade-left', {
          duration: 400,
          easing: [600, 22]
        }])
      )

      this.transition(
        target(randomID + 'right'),
        this.use('tether', ['fade-right', {
          duration: 400,
          easing: [600, 22]
        }])
      )

      this.transition(
        target(randomID + 'top'),
        this.use('tether', ['fade-up', {
          duration: 400,
          easing: [600, 22]
        }])
      )

      this.transition(
        target(randomID + 'bottom'),
        this.use('tether', ['fade-down', {
          duration: 400,
          easing: [600, 22]
        }])
      )
    })
    Ember.run.next(() => {
      const context = this
      if (this.get('closest')) {
        let closest = this.$().closest(this.get('target'))
        closest.on(this.get('event'), function () {
          context.send('togglePopover')
        })
        this.set('target', closest)
      } else {
        $(this.get('target')).on(this.get('event'), function () {
          context.send('togglePopover')
        })
      }
    })
  },
  actions: {
    close () {
      if (this.get('isDestroyed')) {
        return
      }
      this.set('visible', false)
    },
    togglePopover () {
      this.toggleProperty('visible')
    }
  }
})
