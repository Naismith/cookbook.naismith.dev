import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const SubHeading = styled(Typography)`
  font-size: 2.5rem;
  margin-bottom: 0.5em;

  @media print {
    font-size: 1.25rem;
    margin-bottom: 10pt;
  }
`;

export default SubHeading;
