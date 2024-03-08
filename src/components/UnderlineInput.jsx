import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

// interface UnderlineInputProps extends TextInputProps {
//   ref: any;
// }

function UnderlineInput({...props}, ref) {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={{borderColor: '#080808', borderWidth: 1}}
    />
  );
}

export default React.forwardRef(UnderlineInput);
