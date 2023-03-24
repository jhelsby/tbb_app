import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
  },
  borderLight: {
    borderColor: '#fff'
  },
  borderDark: {
    borderColor: '#2E2E2E'
  },
});