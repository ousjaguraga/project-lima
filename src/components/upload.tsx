import React, { ChangeEventHandler, LegacyRef } from 'react';

interface UploadProperties {
  changeHandler: ChangeEventHandler;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function Upload(props: UploadProperties) {
  //const inputRef = React.useRef(null);
  return (
    <input
      type="file"
      accept="image/*"
      onChange={props.changeHandler}
      hidden={true}
      ref={props.inputRef}
    />
  );
}
