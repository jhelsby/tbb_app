import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#EBF1FF',
    overflow: 'hidden',
  },
  bigCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '150%',
    aspectRatio: 1,
    borderRadius: 10000000,
    overflow: 'hidden',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    aspectRatio: 1,
    borderRadius: 10000000,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
