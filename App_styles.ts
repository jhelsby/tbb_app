import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EBF1FF',
    paddingBottom: 80,
  },
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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