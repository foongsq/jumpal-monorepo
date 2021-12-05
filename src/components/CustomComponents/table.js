import { styled } from '@mui/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { styles } from './constants.js';


const StyledTableContainer = styled(TableContainer) ({
  borderRadius: '10px',
  marginTop: '1rem',
  boxShadow: `10px 10px 10px ${styles.shadow}`
});

// For table headers:
// - Apply green background color
// - Bold, horizontally center text, change text color to white
// - Add grey border
const StyledHeaderTableCell = styled(TableCell) ({
    background: styles.bootstrapGreen,
    fontWeight: 'bold',
    color: 'white',
    border: '1px solid',
    borderColor: styles.greyTableBorder,
    padding: '0.75rem',
});

// Add grey border
const StyledTableCell = styled(TableCell) ({
  border: '1px solid',
  borderColor: styles.greyTableBorder,
  padding: '0.75rem',
});

// Alternate white and grey rows
const StyledTableRow = styled(TableRow) ({
  '&:nth-of-type(odd)': {
    background: styles.greyTableRow,
  },
});

export {StyledHeaderTableCell, StyledTableCell, StyledTableRow, StyledTableContainer}