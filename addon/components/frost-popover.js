import $ from 'jquery'
import Ember from 'ember'
import layout from '../templates/components/frost-popover'

export default Ember.Component.extend({
  layout,
  visible: false,
  event: 'click',
  exitEvent: null,
  closest: false,
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
