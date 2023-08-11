import * as React from 'react';

import { styled } from '@mui/material/styles';
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  type IconButtonProps,
  Rating,
} from '@mui/material';

import { useCookies } from 'react-cookie';
import StudentAnswerGrid from './StudentAnswerGrid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StudentExpand = ({ el }: { el: any }) => {
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className="bg-blue-300 p-5">
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <StudentAnswerGrid answers={el.Answer}></StudentAnswerGrid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default StudentExpand;
