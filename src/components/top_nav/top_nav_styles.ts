import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '90%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: '5%',
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
