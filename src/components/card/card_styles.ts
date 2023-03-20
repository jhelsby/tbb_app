import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingRight: 15,
    maxHeight: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 15,
    marginHorizontal: '5%',
  },
  pressed: {
    transform: [
      { translateY: 5},
      { scale: 0.95 }
    ],
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
    flexWrap: 'wrap',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    height: 50
  },
  chevronContainer: {
    boxSizing: 'border-box',
    width: 30,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});