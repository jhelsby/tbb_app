import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingRight: 15,
    maxHeight: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    marginHorizontal: '5%',
  },
  highlight: {
    minWidth: 30,
  },
  highlightGood: {
    backgroundColor: '#00b894',
  },
  highlightBad: {
    backgroundColor: '#d63031',
  },
  imgContainer: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  chevronContainer: {
    boxSizing: 'border-box',
    width: 30,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});