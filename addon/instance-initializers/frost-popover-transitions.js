import popoverTransitions from 'ember-frost-popover/transitions'
export function initialize (appInstance) {
  // appInstance.inject('route', 'foo', 'service:foo');
  const transitionService = appInstance.lookup('service:liquid-fire-transitions')
  transitionService.map(popoverTransitions)
}

export default {
  name: 'frost-popover-transitions',
  initialize
}
