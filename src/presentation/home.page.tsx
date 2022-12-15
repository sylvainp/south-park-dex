import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CharactersList from '../core/components/characters.list';
import {useStoreState} from '../core/store/store';
import useCharacters from '../domain/usecases/characters.hook';
const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',
  },
});
const HomePage = () => {
  const currentTheme = useStoreState(state => state.theme);
  const {isLoading, listAllCharacters, allCharacters, error} = useCharacters();
  useEffect(() => {
    listAllCharacters();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: currentTheme.background}}>
      <StatusBar />
      <View style={styles.root}>
        {isLoading && <ActivityIndicator />}
        {allCharacters && <CharactersList datas={allCharacters} />}
        {error && <Text>{JSON.stringify(error)}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
