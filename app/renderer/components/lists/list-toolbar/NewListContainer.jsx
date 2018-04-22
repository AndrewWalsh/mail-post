import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { graphql, Mutation } from 'react-apollo';

import {
  MutationCreateListCsv,
  QueryGetAllLists,
  FORM_NEW_LIST,
} from '../../../constants';

import NewListWrapper from './NewListWrapper';

const nameOfList = 'newList';

const NewListContainer = ({ listNameValue, nameOfListProp, ...rest }) => (
  <Mutation mutation={MutationCreateListCsv}>
    {(mutationCreateListCsv, { loading }) => (
      <NewListWrapper
        disabled={loading}
        mutationCreateListCsv={mutationCreateListCsv}
        listNameValue={listNameValue}
        nameOfList={nameOfListProp}
        {...rest}
      />
    )}
  </Mutation>
);

NewListContainer.propTypes = {
  listNameValue: PropTypes.string.isRequired,
  nameOfListProp: PropTypes.string,
};

NewListContainer.defaultProps = {
  nameOfListProp: nameOfList,
};

const selectForm = formValueSelector(FORM_NEW_LIST);

const mapStateToProps = state => ({
  listNameValue: selectForm(state, nameOfList) || '',
});

export default compose(
  connect(mapStateToProps),
  graphql(QueryGetAllLists, { options: { fetchPolicy: 'cache-and-network' } }),
  reduxForm({
    form: FORM_NEW_LIST,
    destroyOnUnmount: false,
  }),
)(NewListContainer);