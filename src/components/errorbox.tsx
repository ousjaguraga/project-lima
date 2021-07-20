interface ErrorBoxProperties {
  errorMessage: string | undefined;
}

import React from 'react';

export default function ErrorBox(props: ErrorBoxProperties) {
  return <div className="error">{props.errorMessage}</div>;
}
