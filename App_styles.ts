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
    justifyContent: "flex-end",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    position: "absolute",
  },
  svgContainer: {
    paddingBottom: 10,
  },
  iconActive: {
    color: "#d95448",
  },
  iconInactive: {
    color: "#D9C9C7",
  },
});