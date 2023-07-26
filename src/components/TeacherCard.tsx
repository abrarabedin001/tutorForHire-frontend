import { Card } from '@mui/material';

const TeacherCard = ({ className }: { className: string }) => {
  return (
    <Card className={className}>
      <div className="teacher-card__img">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="teacher"
        />
      </div>
      <div className="teacher-card__info">
        <h3>Teacher Name</h3>
        <p>Teacher Description</p>
      </div>
    </Card>
  );
};
export default TeacherCard;