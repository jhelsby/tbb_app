import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EBF1FF',
    paddingBottom: 80,
    height: '100%',
    width: '100%',
    paddingTop: '5%',
  },
  tile: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBar: {
    height:70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
  },
});