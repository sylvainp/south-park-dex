import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CharactersEntity from '../../domain/entities/characters.entity';
// import ArrowRight from '../../../assets/images/arrow-right.svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronRight,
  faMars,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';
import {Theme} from '../themes/theme';
import {useStoreState} from '../store/store';
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 100,
    margin: 4,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
  },

  title: {
    justifyContent: 'flex-start',
    fontSize: 32,
  },

  gender: {
    fex: 8,
    justifyContent: 'flex-start',
    marginHorizontal: 12,
  },

  content_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export interface CharactersListProps {
  datas: CharactersEntity[];
}

const themedRowStyle = (currentTheme: Theme): ViewStyle => {
  return {
    backgroundColor: currentTheme.primary,
    borderColor: currentTheme.second,
  };
};

const themedTitleStyle = (currentTheme: Theme): TextStyle => {
  return {color: currentTheme.title};
};

const themedListStyle = (currentTheme: Theme): ViewStyle => {
  return {backgroundColor: currentTheme.background};
};

const CharacterItem = ({item}: any, currentTheme: Theme) => {
  return (
    <View style={{...styles.row, ...themedRowStyle(currentTheme)}}>
      <View style={styles.content_container}>
        <Text style={{...styles.title, ...themedTitleStyle(currentTheme)}}>
          {item.name}
        </Text>
        {item.sex === 'Male' && (
          <FontAwesomeIcon
            style={styles.gender}
            icon={faMars}
            size={30}
            color={'blue'}
          />
        )}
        {item.sex === 'Female' && (
          <FontAwesomeIcon
            style={styles.gender}
            icon={faVenus}
            size={30}
            color={'violet'}
          />
        )}
      </View>
      <FontAwesomeIcon
        style={styles.arrow}
        icon={faChevronRight}
        size={20}
        color={currentTheme.title}
      />
    </View>
  );
};
const CharactersList: React.FC<CharactersListProps> = ({datas}) => {
  const currentTheme = useStoreState(state => state.theme);
  return (
    <FlatList
      style={{...themedListStyle(currentTheme)}}
      data={datas}
      renderItem={item => CharacterItem(item, currentTheme)}
    />
  );
};

export default CharactersList;
