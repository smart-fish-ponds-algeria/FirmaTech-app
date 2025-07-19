export const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'good':
      case 'healthy': return '#10B981';
      default: return '#6B7280';
    }
  };