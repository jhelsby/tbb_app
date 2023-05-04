import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginVertical: 10,
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
  infoContainer: {
    width: '90%',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
    marginVertical: 5,
    paddingHorizontal: '5%',
  },
  scrollView: {
    width: '100%',
    gap: 10,
    paddingBottom: 200,
  },
});
