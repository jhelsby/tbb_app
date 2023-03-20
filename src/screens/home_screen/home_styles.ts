import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '20%',
    width: '100%',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    shadowColor: '#000',
  },
  headerPlain: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '45%',
    width: '100%',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
  buttonPanel: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
    height: '25%',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  active: {
    backgroundColor: '#d95448',
  },
  inactive: {
    backgroundColor: '#f2b3b3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});