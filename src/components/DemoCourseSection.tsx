import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const DemoCourseSection = () => {
  const demoCoursesData = [
    {
      id: 1,
      image: './images/demo1.png',
      description: 'Artificial Intelligence (AI) is a branch of computer science focused on creating machines that can perform tasks requiring human-like intelligence. It involves techniques like machine learning and deep learning to enable computers to learn from data, make decisions, recognize patterns, and understand language. AI finds applications in diverse fields, from virtual assistants and self-driving cars to medical diagnosis and language translation. It has the potential to automate tasks, enhance efficiency, and drive innovation, but also raises concerns about ethics, bias, and societal impact.',
    },
    {
      id: 2,
      image: './images/demo2.png',
      description: 'Robotics is a field that combines engineering, science, and technology to create machines, called robots, that can perform tasks autonomously or semi-autonomously. These robots are designed to interact with their environment and carry out actions based on pre-programmed instructions or real-time data analysis.',
    },
    {
      id: 3,
      image: './images/demo3.png',
      description: 'Topology is a branch of mathematics that focuses on the properties of space that are preserved under continuous deformations, such as stretching and bending, but not tearing or gluing. It studies the concepts of continuity, convergence, open and closed sets, compactness, and various types of spaces. Topology is concerned with the properties of space that remain invariant even when the shape of an object is changed through smooth transformations. It has applications in areas like geometry, analysis, and algebraic topology.',
    },
    {
      id: 4,
      image: './images/demo4.png',
      description: 'Medical science is a field dedicated to understanding and improving human health. It encompasses the study of diseases, their causes, prevention, diagnosis, and treatment. Medical researchers explore biology, genetics, physiology, and pharmacology to develop medical interventions, drugs, therapies, and medical technologies. It also includes areas like public health, epidemiology, and healthcare management, all aimed at promoting well-being and extending life.',
    },
    {
      id: 5,
      image: './images/demo5.png',
      description: 'Agricultural science focuses on the study of plants, animals, and ecosystems related to agriculture. It involves improving crop and livestock production, optimizing soil health, pest management, and sustainable farming practices. Agricultural scientists work on increasing crop yields, developing disease-resistant plants, and creating methods to enhance food security and preserve the environment. This field plays a vital role in feeding the worlds growing population and ensuring agricultural sustainability.',
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
              transition: 'transform 2s ease-in-out',
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
