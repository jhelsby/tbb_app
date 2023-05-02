import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  containerMulti: {
    justifyContent: 'space-evenly',
  },
  containerSingle: {
    justifyContent: 'center',
  },
});
