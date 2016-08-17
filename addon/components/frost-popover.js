import $ from 'jquery'
import Ember from 'ember'
import layout from '../templates/components/frost-popover'
const ESC = 27

export default Ember.Component.extend({
  layout,
  visible: false,
  event: 'click',
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
      $(this.get('target')).on(this.get('event'), function () {
        context.send('togglePopover')
      })
    })
  },
  actions: {
    close () {
      if (this.get('isDestroyed')) { return }
      this.set('visible', false)
    },
    togglePopover () {
      this.toggleProperty('visible')
    }
  }
})
