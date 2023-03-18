import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  circleContainer: {
    position: "absolute",
    width: '100%',
    top: -20,
  },
  circle: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: -1,
  },
  circleActive: {
    height: 80,
  },
  circleInactive: {
    height: 0,
  },
  svgContainer: {
    paddingBottom: 10,
  },
});