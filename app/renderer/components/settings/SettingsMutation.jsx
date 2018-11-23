import React from 'react';
import { Mutation } from 'react-apollo';

import { MUTATION_UPDATE_SETTINGS } from '../../graphql';

import SettingsContainer from './SettingsContainer';

const SettingsMutation = () => (
  <Mutation mutation={MUTATION_UPDATE_SETTINGS}>
    {MUTATION_UPDATE_SETTINGS_PROP => (
      <SettingsContainer
        MUTATION_UPDATE_SETTINGS={MUTATION_UPDATE_SETTINGS_PROP}
      />
    )}
  </Mutation>
);

export default SettingsMutation;
