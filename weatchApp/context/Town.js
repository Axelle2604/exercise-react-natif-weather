import React from 'react';

const town = {
  town: 'Paris',
  units: 'metric',
  toggleUnits: () => null,
};

export const TownContext = React.createContext(town);
