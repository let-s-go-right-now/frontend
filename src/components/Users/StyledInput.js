// components/StyledInput.js
import React, { forwardRef } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

const BaseInput = styled(TextInput)`
    font-size: 14px;
    font-family: 'SUIT-Medium';
    max-width: 289px;
`;

const StyledInput = forwardRef((props, ref) => <BaseInput ref={ref} {...props} />);
export default StyledInput;
