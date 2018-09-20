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

import styles from './styles.scss';

function EditRelations(props) {
  console.log("EDITRELATION PROPS, ", props);

  return (
    <div className={styles.editFormRelations}>
      {props.displayedRelations.map(relationName => {
        const relation = get(props.schema, ['relations', relationName], {});


        if(['oneWay', 'oneToOne', 'manyToOne', 'oneToManyMorph', 'oneToOneMorph'].includes(relation.nature)) {
          const target = {
            name: `record.${relation.alias}`,
            value: props.location.relData,
            type: 'select'
          };

          if(typeof target.value !== "undefined" && props.location.relTarget === relation.alias) {
            props.changeData({ target });
          }

          return (
            <SelectOne
              currentModelName={props.currentModelName}
              key={relationName}
              isCreating={props.isCreating}
              record={props.record}
              relation={relation}
              schema={props.schema}
              setRecordAttribute={props.changeData}
              location={props.location}
              onRedirect={props.onRedirect}
              addRelatedElement={props.addRelatedElement}
            />
          );

        }

        const target = {
          name: `record.${relation.alias}`,
          value: props.location.relData,
          type: 'select'
        };

        if(typeof target.value !== "undefined" && props.location.relTarget === relation.alias) {
          props.changeData({ target });
        }

        return (
          <SelectMany
            currentModelName={props.currentModelName}
            key={relationName}
            isDraggingSibling={props.isDraggingSibling}
            isCreating={props.isCreating}
            location={props.location}
            moveAttr={props.moveAttr}
            moveAttrEnd={props.moveAttrEnd}
            onAddRelationalItem={props.onAddRelationalItem}
            onRedirect={props.onRedirect}
            onRemoveRelationItem={props.onRemoveRelationItem}
            addRelatedElement={props.addRelatedElement}
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
