'use client'

import { useForm } from "react-hook-form";
import {useAuth} from "@/contexts/AuthContext";
import Link from "next/link";
import './register.css'
import {useRouter} from "next/navigation";
import {errorToast, successToast} from "@/utils/toast";
import clientRequest from "@/services/clientRequest";

export default function Register() {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: 'onChange',
    });
    const {login} = useAuth()

    const router = useRouter()

    const registerNewUser = async (data) => {
        const newUser = {
            name: data.fullname,
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            confirmPassword: data.password,
        };

        try {
            const res = await clientRequest.post('auth/register', newUser);
            successToast('با موفقیت ثبت نام شدید :)');
            setTimeout(function(){
                window.location.href = '/';
            }, 1000)
        } catch (err) {
            if (err.response?.status === 400) {
                Object.keys(err.response.data).forEach((key) => {
                    const errors = err.response.data[key];
                    if (Array.isArray(errors)) {
                        errors.forEach((error) => {
                            errorToast(error);
                        });
                    }
                });
            }
        }
    };

    return (
        <>
            <section className="login-register">
                <div className="login register-form">
                    <span className="login__title">ساخت حساب کاربری</span>
                    <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                        <Link className="login__new-member-link" href="/login">
                            وارد شوید
                        </Link>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit(registerNewUser)}>
                        <div className="login-form__username">
                            <input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                {...register("fullname", {
                                    required: "نام و نام خانوادگی الزامی است",
                                    minLength: { value: 4, message: "حداقل 4 کاراکتر" },
                                    maxLength: { value: 20, message: "حداکثر 20 کاراکتر" },
                                })}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                            {errors.fullname && <p className="error-message">{errors.fullname.message}</p>}
                        </div>
                        <div className="login-form__username">
                            <input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام کاربری"
                                {...register("username", {
                                    required: "نام کاربری الزامی است",
                                    minLength: { value: 4, message: "حداقل 4 کاراکتر" },
                                    maxLength: { value: 20, message: "حداکثر 20 کاراکتر" },
                                })}
                            />
                            <i className="login-form__username-icon fa fa-id-card"></i>
                            {errors.username && <p className="error-message">{errors.username.message}</p>}
                        </div>
                        <div className="login-form__username">
                            <input
                                className="login-form__username-input"
                                type="text"
                                placeholder="شماره موبایل"
                                {...register("phone", {
                                    required: "شماره موبایل الزامی است",
                                    minLength: { value: 4, message: "حداقل 4 کاراکتر" },
                                    maxLength: { value: 20, message: "حداکثر 20 کاراکتر" },
                                })}
                            />
                            <i className="login-form__username-icon fa fa-phone"></i>
                            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                        </div>
                        <div className="login-form__password">
                            <input
                                className="login-form__password-input"
                                type="email"
                                placeholder="آدرس ایمیل"
                                {...register("email", {
                                    required: "ایمیل الزامی است",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "فرمت ایمیل نادرست است",
                                    },
                                })}
                            />
                            <i className="login-form__password-icon fa fa-envelope"></i>
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                        <div className="login-form__password">
                            <input
                                className="login-form__password-input"
                                type="password"
                                placeholder="رمز عبور"
                                {...register("password", {
                                    required: "رمز عبور الزامی است",
                                    minLength: { value: 3, message: "حداقل 3 کاراکتر" },
                                    maxLength: { value: 20, message: "حداکثر 20 کاراکتر" },
                                })}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                        <button
                            className={`login-form__btn ${isValid && !isSubmitting ? '' : 'btn-disable'}`}
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="login-form__btn-icon fa fa-user-plus"></i>
                                    <span className="login-form__btn-text">در حال ارسال ...</span>
                                </>
                            ) : (
                                <>
                                    <i className="login-form__btn-icon fa fa-user-plus"></i>
                                    <span className="login-form__btn-text">عضویت</span>
                                </>
                            )}
                        </button>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                                استفاده کنید.
                            </li>
                            <li className="login__des-item">
                                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                            </li>
                            <li className="login__des-item">
                            لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
