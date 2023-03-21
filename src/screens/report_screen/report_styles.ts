import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EBF1FF',
  },
  scrollView: {
    width: '100%',
    gap: 10,
    paddingBottom: 200,
  },
  body: {
    width: '100%',
    height: '100%',
    gap: 10,
    paddingTop: 100,
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
  form: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 10,
    marginBottom: 110,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    overflow: 'hidden',
  },
  textContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  multitextContainer: {
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginVertical: 5,
    paddingHorizontal: '5%',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  smallInput: {
    height: 40,
  },
  largeInput: {
    height: 200,
  },
  buttonContainer: {
    marginTop: 20,
    height: 50,
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