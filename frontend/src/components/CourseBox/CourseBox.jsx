'use client'
import React, { useState } from 'react'
import './CourseBox.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from "next/link";

function CourseBox(props) {
    const [isShowImg, setIsShowImg] = useState(false)

    return (
        <div className="col-4">
            <div className="course-box">
                <Link href={`/courses/${props.slug}`}>
                    {!isShowImg && (
                        <Skeleton
                            className="course-box__loader"
                        />
                    )}
                    <img
                        style={isShowImg ? { display: 'block' } : { display: 'none' }}
                        src={'http://localhost:8080' + props.cover}
                        alt="Course img"
                        className="course-box__img"
                        onLoad={() => setIsShowImg(true)}
                    />
                </Link>
                <div className="course-box__main">
                    <Link href={`/courses/${props.slug}`} className="course-box__title">{props.name}</Link>

                    <div className="course-box__rating-teacher">
                        <div className="course-box__teacher">
                            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" className="course-box__teacher-link">{props.creator}</a>
                        </div>
                        <div className="course-box__rating">
                            <img src="/images/svgs/star.svg" alt="rating" className="course-box__star" />
                            <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                            <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                            <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                            <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" />
                        </div>
                    </div>

                    <div className="course-box__status">
                        <div className="course-box__users">
                            <i className="fas fa-users course-box__users-icon"></i>
                            <span className="course-box__users-text">500</span>
                        </div>
                        <span className="course-box__price">
                            {props.price === 0 ? 'رایگان' : props.price.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="course-box__footer">
                    <Link href={`/courses/${props.slug}`} className="course-box__footer-link">
                        مشاهده اطلاعات
                        <i className="fas fa-arrow-left course-box__footer-icon"></i>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default CourseBox