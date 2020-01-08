import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'

import SafeAreaView from '../components/SafeAreaView'
import OnboardingSlide from '../components/OnboardingSlide'

import { colors } from '../util/style'

import logoSrc from '../assets/ololo-logo.png'

const PAGE_INDICATOR_SIZE = 8
const CURRENT_PAGE_INDICATOR_SIZE = 12
const PAGE_INDICATOR_HIT_SLOP = 12

const slidesData = [
  {
    title: 'Посещай классные ивенты',
    subTitle: 'Смотри афишу и записывайся на мероприятия в Ololohaus'
  },
  {
    title: 'Знакомься с людьми',
    subTitle: 'Быстро и легко обменивайся контактами с посетителями мероприятий'
  },
  {
    title: 'Оставляй фидбек',
    subTitle: 'Ставь оценки мероприятиям, пиши нам, помогай нам стать лучше!'
  }
]

export default function OnboardingScreen() {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const scrollViewRef = React.useRef()
  const { width: screenWidth } = Dimensions.get('window')
  const isOnLastPage = currentSlideIndex === slidesData.length - 1
  const isSkipEnabled = !isOnLastPage

  function handleScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x

    if (offsetX >= 0) {
      setCurrentSlideIndex(Math.round(offsetX / screenWidth))
    }
  }

  function handlePageIndicatorPress(index) {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * screenWidth })
    }
  }

  function handleSkipPress() {
    console.log('Skip!')
  }

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scroll}
        horizontal
        snapToAlignment="start"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={150}
        onScroll={handleScroll}
      >
        {slidesData.map((item, index) => (
          <OnboardingSlide key={index.toString()} {...item} />
        ))}
      </ScrollView>
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.logo}>
          <Image source={logoSrc} />
        </View>
        <View style={styles.footer} pointerEvents="auto">
          <TouchableOpacity
            onPress={handleSkipPress}
            hitSlop={{
              top: PAGE_INDICATOR_HIT_SLOP,
              left: PAGE_INDICATOR_HIT_SLOP,
              bottom: PAGE_INDICATOR_HIT_SLOP,
              right: PAGE_INDICATOR_HIT_SLOP
            }}
            style={[
              styles.navButton,
              { width: screenWidth / 3 },
              !isSkipEnabled && styles.navButtonDisabled
            ]}
            disabled={!isSkipEnabled}
          >
            <Text style={[styles.navButtonText, styles.navButtonSkipText]}>
              Пропустить
            </Text>
          </TouchableOpacity>

          <View style={styles.pager}>
            {slidesData.map((_, index) => (
              <TouchableWithoutFeedback
                key={index.toString()}
                onPress={() => handlePageIndicatorPress(index)}
              >
                <View
                  style={[
                    styles.page,
                    index === currentSlideIndex && styles.pageCurrent
                  ]}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.navButton, { width: screenWidth / 3 }]}
          >
            <Text style={[styles.navButtonText, styles.navButtonContinueText]}>
              {isOnLastPage ? 'Начать' : 'Далее'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: colors.blue
  },
  container: {
    flex: 1,

    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 47,
    alignItems: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  navButton: {
    paddingVertical: 30,
    paddingHorizontal: 25
  },
  navButtonDisabled: {
    opacity: 0
  },
  navButtonText: {
    fontSize: 12
  },
  navButtonSkipText: {
    color: colors.white
  },
  navButtonContinueText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: colors.yellow
  },
  pager: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  page: {
    position: 'relative',
    zIndex: 10,

    width: PAGE_INDICATOR_SIZE,
    height: PAGE_INDICATOR_SIZE,
    borderRadius: PAGE_INDICATOR_SIZE / 2,
    marginHorizontal: 6,

    backgroundColor: '#5999F1'
  },
  pageCurrent: {
    width: CURRENT_PAGE_INDICATOR_SIZE,
    height: CURRENT_PAGE_INDICATOR_SIZE,
    borderRadius: CURRENT_PAGE_INDICATOR_SIZE / 2,

    backgroundColor: colors.yellow
  },
  scroll: {
    ...StyleSheet.absoluteFillObject
  }
})