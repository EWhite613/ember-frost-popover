// import { animate, Promise } from "liquid-fire";
import { target } from 'liquid-tether'

export default function () {
  this.transition(
    target('left'),
    this.use('tether', ['fade-left', { duration: 400, easing: [600, 22] }])
  )

  this.transition(
    target('right'),
    this.use('tether', ['fade-right', { duration: 400, easing: [600, 22] }])
  )

  this.transition(
    target('top'),
    this.use('tether', ['fade-up', { duration: 400, easing: [600, 22] }])
  )

  this.transition(
    target('bottom'),
    this.use('tether', ['fade-down', { duration: 400, easing: [600, 22] }])
  )
}
