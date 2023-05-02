import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalClose: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalContent: {
    width: '94%',
    height: '50%',
    marginTop: '102%',
    marginHorizontal: '3%',
    paddingHorizontal: '5%',
    zindex: 1,
  },
  modalFlatlistContiner: {
    flex: 1,
    marginVertical: '10%',
    justifyContent: 'flex-start',
  },
  modalTitleText: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    height: 60,
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
