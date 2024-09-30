'use client'
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Accordion from 'react-bootstrap/Accordion';
import moment from 'moment-jalaali';
import apiRequest from "@/services/apiRequest";
import CourseDetail from "@/components/CourseDetail/CourseDetail";
import CommentTextArea from "@/components/CommentTextArea/CommentTextArea";
import './CourseInfo.css'

async function CourseInfo({ params }) {
    const { slug } = params;
    const res = await apiRequest.get(`courses/${slug}`);
    const courseDetails = res.data;
    const { comments, sessions, category } = courseDetails;

    return (
        <>
            <Breadcrumb
                links={[
                    { id: 1, title: 'خانه', to: '/' },
                    { id: 2, title: category.title, to: `/category/${category.slug}` },
                    { id: 3, title: courseDetails.name, to: `/course-info/${courseDetails.slug}` }
                ]}
            />
            <section className="course-info">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <a href="#" className="course-info__link">
                                {category.title}
                            </a>
                            <h1 className="course-info__title">
                                {courseDetails.name}
                            </h1>
                            <p className="course-info__text">
                                {courseDetails.description}
                            </p>
                            <div className="course-info__social-media">
                                <a href="#" className="course-info__social-media-item">
                                    <i className="fab fa-telegram-plane course-info__icon"></i>
                                </a>
                                <a href="#" className="course-info__social-media-item">
                                    <i className="fab fa-twitter course-info__icon"></i>
                                </a>
                                <a href="#" className="course-info__social-media-item">
                                    <i className="fab fa-facebook-f course-info__icon"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-6">
                            <video
                                src=""
                                poster={`http://localhost:8080${courseDetails.cover}`}
                                className="course-info__video"
                                controls
                            ></video>
                        </div>
                    </div>
                </div>
            </section>
            <main className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <div className="course">
                                <div className="course-boxes">
                                    <div className="row">
                                        <CourseDetail
                                            title='وضعیت دوره:'
                                            text={courseDetails.is_complete ? 'به اتمام رسیده' : 'در حال برگزاری'}
                                            icon='graduation-cap'
                                        />
                                        <CourseDetail
                                            title=' زمان شروع دوره :'
                                            text={moment(courseDetails.created_date).format('jYYYY/jMM/jDD')}
                                            icon='clock'
                                        />
                                        <CourseDetail
                                            title='آخرین بروزرسانی:'
                                            text={moment(courseDetails.last_updated).format('jYYYY/jMM/jDD')}
                                            icon='calendar-alt'
                                        />
                                        <CourseDetail
                                            title='روش پشتیبانی'
                                            text='آنلاین'
                                            icon='user-alt'
                                        />
                                        <CourseDetail
                                            title='پیش نیاز:'
                                            text='HTML CSS'
                                            icon='info-circle'
                                        />
                                        <CourseDetail
                                            title=' نوع مشاهده:'
                                            text=' ضبط شده / آنلاین'
                                            icon='play'
                                        />
                                    </div>
                                </div>
                                {/* Course Progress, Introduction, and other sections... */}
                                <div className="introduction__topic">
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>معرفی دوره</Accordion.Header>
                                            <Accordion.Body className='introduction__accordion-body'>
                                                {sessions.map((session, index) => (
                                                    <React.Fragment key={session.id}>
                                                        <div className="introduction__accordion-right">
                                                            <span className="introduction__accordion-count">{index + 1}</span>
                                                            <i className="fab fa-youtube introduction__accordion-icon"></i>
                                                            <a href="#" className="introduction__accordion-link">{session.title}</a>
                                                        </div>
                                                        <div className="introduction__accordion-left">
                                                            <span className="introduction__accordion-time">
                                                                {session.time}
                                                            </span>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                                <CommentTextArea comments={comments} courseName={slug} />
                            </div>
                        </div>
                        <div className="col-4">
                            {/* Course info sidebar */}
                            <div className="courses-info">
                                <div className="course-info">
                                    <div className="course-info__register">
                                        {courseDetails.isUserRegisteredToThisCourse ? (
                                            <span className="course-info__register-title">
                                                <i className="fas fa-graduation-cap course-info__register-icon"></i>
                                                دانشجوی دوره هستید
                                            </span>
                                        ) : (
                                            <span className="course-info__register-title">
                                                ثبت‌نام در دوره
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Other course info sections... */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CourseInfo;