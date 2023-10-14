import { styled } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const SubHeading = styled(Typography)`
  @media print {
    font-size: 1.25rem;
    margin-bottom: 10pt;
  }
`;

export default SubHeading;
