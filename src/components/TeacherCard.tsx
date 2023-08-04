import { Card } from '@mui/material';
import App from './imageupload'
const TeacherCard = ({
  className,
  TeacherProfile,
}: {
  className: string;
  TeacherProfile: any;
}) => {
  return (
    <Card className={className} sx={{ width: 500, height: 800 }}>
      <div className="teacher-card__img">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="teacher"
        />
        <App/>
      </div>
      <div className="teacher-card__info p-5">
        <h3 className="font-bold text-black">
          <p
            className="mt-3 text-black"
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            {TeacherProfile.user.name}
          </p>
        </h3>
        <p
          className="mt-3 text-black"
          style={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Email:
        </p>
        <p className="text-black">{TeacherProfile.user.email}</p>
        <p
          className="mt-3 text-black"
          style={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Subject:
        </p>
        <p className="text-black">{TeacherProfile.bio}</p>
        <p
          className="mt-3 text-black"
          style={{ fontWeight: 'bold', fontSize: '16px' }}
        >
          Phone:
        </p>
        <p className="text-black">{TeacherProfile.Phone}</p>
      </div>
    </Card>
  );
};
export default TeacherCard;
