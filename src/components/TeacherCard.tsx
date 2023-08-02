import { Card } from '@mui/material';

const TeacherCard = ({
  className,
  TeacherProfile,
}: {
  className: string;
  TeacherProfile: any;
}) => {
  return (
    <Card className={className}>
      <div className="teacher-card__img">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="teacher"
        />
      </div>
      <div className="teacher-card__info p-5">
        <h3 className="font-bold text-black">{TeacherProfile.user.name}</h3>
        <p className="mt-3 text-black">Email:</p>
        <p className="text-black">{TeacherProfile.user.email}</p>
        <p className="mt-3 text-black">Subjects</p>
        <p className="text-black">{TeacherProfile.bio}</p>
      </div>
    </Card>
  );
};
export default TeacherCard;
