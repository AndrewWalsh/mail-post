import React from 'react';
import { Mutation } from 'react-apollo';

import { MUTATION_UPDATE_SETTINGS } from '../../graphql';

import SettingsContainer from './SettingsContainer';

const SettingsMutation = () => (
  <Mutation mutation={MUTATION_UPDATE_SETTINGS}>
    {(MUTATION_UPDATE_SETTINGS_PROP, { loading }) => (
      <SettingsContainer
        MUTATION_UPDATE_SETTINGS_PROP={MUTATION_UPDATE_SETTINGS_PROP}
        disabled={loading}
      />
    )}
  </Mutation>
);

export default SettingsMutation;
