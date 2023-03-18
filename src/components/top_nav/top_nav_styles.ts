import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '90%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 1,
    marginHorizontal: '5%',
    marginTop: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: '#f2b3b3',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});