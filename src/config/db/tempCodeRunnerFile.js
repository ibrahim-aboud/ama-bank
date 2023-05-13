 connection.end((error) => {
    if (error) {
      console.error('Error disconnecting from the MySQL server:', error);
      return;
    }
    console.log('Disconnected from MySQL server.');
  });