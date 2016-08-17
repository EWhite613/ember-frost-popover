// import { animate, Promise } from "liquid-fire";
import { target } from 'liquid-tether'

export default function () {
  this.transition(
    target('left'),
    this.use('tether', ['fade-left', { duration: 400, easing: [600, 22] }])
  )
}
