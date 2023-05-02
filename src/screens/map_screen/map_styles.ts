import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    borderColor: '',
    borderWidth: 2,
  },
  cardContainer: {
    position: 'absolute',
    width: '80%',
    right: 0,
    bottom: 90,
    overflow: 'hidden',
  infoContainer: {
    position: 'absolute',
    top: 30,
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
    marginVertical: 5,
    paddingHorizontal: '5%',
  },
});