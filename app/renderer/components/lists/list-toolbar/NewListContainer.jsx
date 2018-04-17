import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import { FORM_NEW_LIST } from '../../../constants';

import NewList from './NewList';

const nameOfList = 'newList';

const NewListContainer = ({ listNameValue, nameOfListProp, ...rest }) => (
  <NewList
    listNameValue={listNameValue}
    nameOfList={nameOfListProp}
    {...rest}
  />
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
  reduxForm({
    form: FORM_NEW_LIST,
    destroyOnUnmount: false,
  }),
)(NewListContainer);
