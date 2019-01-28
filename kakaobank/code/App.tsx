import { Data, animate, Override, Animatable } from 'framer'
window.log = console.log
import { sleep } from './utils'

const data = Data({
  redHeartScale: Animatable(1),
  redHeartVisible: false,
  blankHeartScale: Animatable(1),
  blankHeartVisible: true,

  whiteHeartScale: Animatable(1),
  whiteHeartVisible: false,
})

export const RedHeart: Override = () => {
  return {
    scale: data.redHeartScale,
    visible: data.redHeartVisible,
  }
}

export const BlankHeart: Override = () => {
  return {
    scale: data.blankHeartScale,
    visible: data.blankHeartVisible,
  }
}

export const WhiteHeart: Override = () => {
  return {
    scale: data.whiteHeartScale,
    visible: data.whiteHeartVisible,
  }
}

var isHearted = false

export const HeartButton: Override = () => {
  return {
    onTap() {
      if (!isHearted) {
        data.blankHeartVisible = false
        data.redHeartVisible = true
        // animate
        data.redHeartScale.set(0.8)
        animate.spring(data.redHeartScale, 1)
        isHearted = true
      } else {
        data.blankHeartVisible = true
        data.redHeartVisible = false

        // animate
        data.blankHeartScale.set(0.9)
        animate.ease(data.blankHeartScale, 1, {
          duration: 0.2,
        })
        isHearted = false
      }
    },
  }
}

var tabCount = 0
var expireLock = false

var tabTimes = []

export const Video: Override = () => {
  return {
    async onTap(e) {
      tabTimes.push(e.time)
      var gap = tabTimes[tabTimes.length - 1] - tabTimes[tabTimes.length - 2]

      log('gap', gap)

      if (gap < 300) {
        log('it is a double tab!')

        if (!isHearted) {
          data.blankHeartVisible = false
          data.redHeartVisible = true
          // animate
          data.redHeartScale.set(0.8)
          animate.spring(data.redHeartScale, 1)
          isHearted = true
        }

        // WhiteHeart
        data.whiteHeartVisible = true
        data.whiteHeartScale.set(0.6)
        await animate.spring(data.whiteHeartScale, 1).finished
        animate.ease(data.whiteHeartScale, 0, {
          duration: 0.1,
        })
      }
    },
  }
}
