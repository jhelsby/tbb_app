import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EBF1FF',
    paddingTop: '10%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginVertical: 10,
    paddingHorizontal: '5%',
  },
  scrollView: {
    width: '100%',
    gap: 10,
    paddingBottom: 200,
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
});