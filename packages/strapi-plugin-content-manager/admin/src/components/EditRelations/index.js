/**
 *
 * EditRelations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Components.
import SelectOne from 'components/SelectOne';
import SelectMany from 'components/SelectMany';
import auth from 'utils/auth';

import styles from './styles.scss';

function EditRelations(props) {
  return (
    <div className={styles.editFormRelations}>
      {props.displayedRelations.map(relationName => {
        const relation = get(props.schema, ['relations', relationName], {});

        if(['oneWay', 'oneToOne', 'manyToOne', 'oneToManyMorph', 'oneToOneMorph'].includes(relation.nature)) {

          // If there is a relation with users in creation apply the default user
          if (relation.alias === 'user' && props.isCreating && typeof props.record.user === 'undefined')
            props.changeData({
              target: {
                name: 'record.user',
                value: auth.getUserInfo()
              }
            });

          return (
            <SelectOne
              currentModelName={props.currentModelName}
              addRelatedElement={props.addRelatedElement}
              isCreating={props.isCreating}
              key={relationName}
              record={props.record}
              relation={relation}
              schema={props.schema}
              setRecordAttribute={props.changeData}
              location={props.location}
              onRedirect={props.onRedirect}
            />
          );
        } 
        
        return (
          <SelectMany
            currentModelName={props.currentModelName}
            addRelatedElement={props.addRelatedElement}
            isCreating={props.isCreating}
            key={relationName}
            isDraggingSibling={props.isDraggingSibling}
            location={props.location}
            moveAttr={props.moveAttr}
            moveAttrEnd={props.moveAttrEnd}
            onAddRelationalItem={props.onAddRelationalItem}
            onRedirect={props.onRedirect}
            onRemoveRelationItem={props.onRemoveRelationItem}
            record={props.record}
            relation={relation}
            schema={props.schema}
          />
        );
      })}
    </div>
  );
}

EditRelations.defaultProps = {
  displayedRelations: [],
  isDraggingSibling: false,
  moveAttr: () => {},
  moveAttrEnd: () => {},
  record: {},
  schema: {},
};

EditRelations.propTypes = {
  changeData: PropTypes.func.isRequired,
  currentModelName: PropTypes.string.isRequired,
  displayedRelations: PropTypes.array,
  isDraggingSibling: PropTypes.bool,
  location: PropTypes.object.isRequired,
  moveAttr: PropTypes.func,
  moveAttrEnd: PropTypes.func,
  onAddRelationalItem: PropTypes.func.isRequired,
  onRedirect: PropTypes.func.isRequired,
  onRemoveRelationItem: PropTypes.func.isRequired,
  record: PropTypes.object,
  schema: PropTypes.object,
};

export default EditRelations;
