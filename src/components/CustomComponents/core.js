import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const green500 = '#8BC34A';
const bootstrapGreen = '#28a745';

export const JumpalButton = styled(Button)({
  background: bootstrapGreen,
  color: 'white',
  padding: '0.5rem 1rem',
  margin: '1rem',
  '&:hover': {
    background: green500
  }
});

export default {JumpalButton};