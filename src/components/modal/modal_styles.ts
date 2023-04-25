import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalBackground: {
    height: '100%',
    width: '100%',
    zIndex: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    paddingTop: '10%',
    backgroundColor: '#00000090',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalContainer: {
    width: '100%',
    height: '85%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalTitleContainer: {
    flex: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalCrossContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalContentContainer: {
    width: '100%',
    height: '80%',
    padding: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  modalContent: {
  },
  modalContentText: {
  }
});