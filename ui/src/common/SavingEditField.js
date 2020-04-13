import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faSave } from '@fortawesome/free-solid-svg-icons';

import './SavingEditField.scss';

function SavingEditField({type, value, onSave}) {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(value);

  function onEdit() {
    setEditValue(value);
    setEditMode(true);
  }

  function onCancel() {
    setEditMode(false);
  }

  function onSaveTriggered() {
    if (onSave) {
      onSave(editValue);
    } else {
      console.error('Saving Edit Field has no onSave function');
    }
    setEditMode(false);
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      onSaveTriggered();
    }

    if (e.key === 'Escape') {
      onCancel();
    }
  }

  if (editMode) {
    return (
      <div className='field saving-edit-field'>
        <input
          className='input editable'
          type={type}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDownCapture={onKey}
        />
        <button
          className='button'
          type='button'
          onClick={onCancel}>
          <FontAwesomeIcon icon={faUndo}/>
        </button>
        <button
          className='button is-info'
          type='button'
          onClick={onSaveTriggered}>
          <FontAwesomeIcon icon={faSave}/>
        </button>
      </div>
    );
  }

  return (
    <div className='field saving-edit-field'>
      <input
        className='input uneditable'
        type={type}
        value={value}
        onClick={onEdit}
        onSelect={onEdit}
        readOnly
      />
    </div>);
}

export default SavingEditField;
