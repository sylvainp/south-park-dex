import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useStoreActions, useStoreState} from '../core/store/store';
import {cartman, kenny, kyle, stan, Theme} from '../core/themes/theme';

const availableTheme: {theme: Theme; image: any; title: string}[] = [
  {
    theme: cartman,
    image: require('../../assets/images/Eric_Cartman.png'),
    title: 'Eric Cartman',
  },
  {
    theme: stan,
    image: require('../../assets/images/Stan.png'),
    title: 'Stan Marsh',
  },
  {
    theme: kyle,
    image: require('../../assets/images/Kyle.png'),
    title: 'Kyle Broflovski',
  },
  {
    theme: kenny,
    image: require('../../assets/images/KennyMcCormick.png'),
    title: 'Kenny McCormick',
  },
];

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  row: {
    height: 60,
    fontSize: 42,
  },
  caroussel_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  caroussel_image: {
    height: (4 * width) / 6,
    width: width / 2,
    resizeMode: 'contain',
  },

  caroussel_text: {
    fontSize: 32,
    padding: 8,
  },
});

const renderItem = ({item}: any) => {
  return (
    <View style={styles.caroussel_container}>
      <Image style={styles.caroussel_image} source={item.image} />
      <Text style={styles.caroussel_text}>{item.title}</Text>
    </View>
  );
};

const defaultCarouselIndex = (currentTheme: Theme): number => {
  switch (currentTheme.id) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 2;
    default:
      return 3;
  }
};
const ThemeSwitcherPage = () => {
  const currentTheme: Theme = useStoreState(state => state.theme);
  const updateTheme = useStoreActions(action => action.updateTheme);

  return (
    <View style={{flex: 1, backgroundColor: currentTheme.background}}>
      <Carousel
        loop
        width={width}
        autoPlay={false}
        defaultIndex={defaultCarouselIndex(currentTheme)}
        data={availableTheme}
        onSnapToItem={index => updateTheme(availableTheme[index].theme)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ThemeSwitcherPage;
