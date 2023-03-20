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
    backgroundColor: "#fff",
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