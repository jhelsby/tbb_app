import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: '5%',
  },
  svgContainer: {
    marginTop: 10,
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    width: '90%',
    padding: 15,
    marginHorizontal: '5%',
  },
  detailsText: {
    fontSize: 20,
    width: '100%',
    textAlign: 'left',
    marginVertical: 5,
    paddingHorizontal: '5%',
  },
  buttonPanel: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
    height: '20%',
    width: '90%',
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});