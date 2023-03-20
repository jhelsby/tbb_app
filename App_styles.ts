import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 60,
    zIndex: 2,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: 60,
  },
  circleContainer: {
    position: "absolute",
    width: '100%',
    bottom: 0,
  },
  circle: {
    borderRadius: 1000,
  },
  circleActive: {
    width: '100%',
    height: 80,
  },
  circleInactive: {
    width: 1,
    height: 1,
  },
  svgContainer: {
    paddingBottom: 10,
  },
});