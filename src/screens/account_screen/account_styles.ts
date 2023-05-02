import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
    gap: 10,
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
    paddingHorizontal: '5%',
  },
  svgContainer: {
    marginHorizontal: '5%',
    flex: 1,
    height: 400,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    marginBottom: 20,
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
    width: '90%',
    paddingTop: 15,
    paddingHorizontal: 15,
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
