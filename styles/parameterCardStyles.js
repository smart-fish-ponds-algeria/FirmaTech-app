import { StyleSheet } from 'react-native';

export const parameterCardStyles = StyleSheet.create({
  parameterCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  parameterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  parameterIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  parameterTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});
