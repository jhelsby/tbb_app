import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
  },
  page: {
    paddingBottom: 80,
    height: '100%',
    width: '100%',
    paddingTop: '5%',
  },
  lightPage: {
    backgroundColor: '#EBF1FF',
  },
  darkPage: {
    backgroundColor: '#1E1E1E',
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
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#2E2E2E',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  tabBar: {
    height: 60,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
  },
});