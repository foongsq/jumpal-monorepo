import { styled } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
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