import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { styles } from '../constants.js';

export const JumpalButton = styled(Button)({
  'background': styles.bootstrapGreen,
  'color': 'white',
  'padding': '0.5rem 1rem',
  'margin': '1rem',
  '&:hover': {
    background: styles.green500,
  },
});
