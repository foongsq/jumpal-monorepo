import styled from '@emotion/styled';
import { TableCell, TableRow, TableContainer } from '@mui/material';
import { styles } from '../constants.js';

export const JumpalTableContainer = styled(TableContainer)({
  borderRadius: '10px',
  marginTop: '1rem',
  boxShadow: `10px 10px 10px ${styles.shadow}`,
});

// For table headers:
// - Apply green background color
// - Bold, horizontally center text, change text color to white
// - Add grey border
export const JumpalHeaderTableCell = styled(TableCell)({
  background: styles.bootstrapGreen,
  fontWeight: 'bold',
  color: 'white',
  border: '1px solid',
  borderColor: styles.greyTableBorder,
  padding: '0.75rem',
});

// Add grey border
export const JumpalTableCell = styled(TableCell)({
  border: '1px solid',
  borderColor: styles.greyTableBorder,
  padding: '0.75rem',
});

// Alternate white and grey rows
export const JumpalTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    background: styles.greyTableRow,
  },
});

export const JumpalTableDeleteButton = styled.button`
  border: none;
  background-color: inherit;
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: var(--red);
  }
`;
