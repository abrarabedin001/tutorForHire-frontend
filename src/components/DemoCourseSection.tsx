import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const DemoCourseSection = () => {
  const demoCoursesData = [
    {
      id: 1,
      image: './images/course4.jpg',
      description: 'Demo Course 1',
    },
    {
      id: 2,
      image: './images/course4.jpg',
      description: 'Demo Course 2',
    },
    {
      id: 3,
      image: './images/course4.jpg',
      description: 'Demo Course 3',
    },
    {
      id: 4,
      image: './images/course4.jpg',
      description: 'Demo Course 4',
    },
    {
      id: 5,
      image: './images/course4.jpg',
      description: 'Demo Course 5',
    },
  ];

  const [activeCourse, setActiveCourse] = useState(0);

  const handlePrevCourse = () => {
    setActiveCourse((prev) =>
      prev === 0 ? demoCoursesData.length - 1 : prev - 1,
    );
  };

  const handleNextCourse = () => {
    setActiveCourse((prev) =>
      prev === demoCoursesData.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Container>
      <div className="demo-course-section rounded-md p-5">
        <div className="demo-course-header-line">
          <h2 className="text-3xl font-bold">
            Explore Our Featured Demo Courses
          </h2>
          <p>
            Discover exciting demo courses to get a taste of our exceptional
            educational offerings.
          </p>
        </div>
        <div className="demo-course-slider bg-white  p-5 shadow-md">
          <div
            className="demo-course-wrapper "
            style={{
              transform: `translateX(-${activeCourse * 100}%)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {demoCoursesData.map((course, index) => (
              <div
                key={course.id}
                className={`demo-course-item ${
                  index === activeCourse ? 'active' : ''
                }`}
              >
                <img src={course.image} alt="Course" />
                <p>{course.description}</p>
              </div>
            ))}
          </div>
          <div className="demo-course-controls space-x-2">
            <Button
              className="demo-course-prevButton bg-white"
              onClick={handlePrevCourse}
              sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                backgroundColor: 'white',
              }}
            >
              &lt;
            </Button>
            <Button
              className="demo-course-nextButton bg-white"
              onClick={handleNextCourse}
              sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                backgroundColor: 'white',
              }}
            >
              &gt;
            </Button>
          </div>
          <div className="demo-course-dots">
            {demoCoursesData.map((_, index) => (
              <div
                key={index}
                className={`demo-course-dot ${
                  index === activeCourse ? 'active' : ''
                }`}
                onClick={() => {
                  setActiveCourse(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DemoCourseSection;
