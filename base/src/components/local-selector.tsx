import React from 'react';
import { Autocomplete, TextField } from '@material-ui/core';
import { I18nChunkMap, LANGUAGE_MAP } from '~src/common/const';


const LocalSelector: React.FC = () => {
  const handleLocalChange = async (value: LANGUAGE_MAP) => {
    await intl.setLocal(value);
  };

  return (
    <div>
      <Autocomplete
        defaultValue={LANGUAGE_MAP.zh}
        style={{ width: 200 }}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label='Locale' fullWidth />
        )}
        onChange={async (e, v) => {
          await handleLocalChange(v as LANGUAGE_MAP);
        }}
        options={Object.keys(I18nChunkMap)} />
    </div>
  );
};

export default LocalSelector;
