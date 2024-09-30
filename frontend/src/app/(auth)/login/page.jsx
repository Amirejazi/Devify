'use client'
import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./login.css";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter, useSearchParams} from "next/navigation";
import {successToast} from "@/utils/toast";
import Link from "next/link";
import clientRequest from "@/services/clientRequest";

export default function Login() {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        mode: 'onChange'
    });
    const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(true);
    const {login} = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams();
    const authStatus = searchParams.get('auth');

    console.log(authStatus)
    const loginUser = async (data) => {
        const userInfo = {
            identifier: data.username,
            password: data.password,
        };

        try {
            const res = await clientRequest.post('auth/login', userInfo);
            successToast('خوش آمدید 😍');
            setTimeout(function(){
                window.location.href = '/';
            }, 1000)
        } catch (err) {
            console.log(err);
            toast.error('همچین کاربری وجود ندارد');
        }
    };

    useEffect(() => {
        if(authStatus === 'invalid'){
            clientRequest.post('auth/delete-auth-cookies', {})
        }
    }, [])

    return (
        <>
            <section className="login-register">
                <div className="login">
                    <span className="login__title">ورود به حساب کاربری</span>
                    <span className="login__subtitle">
                        خوشحالیم دوباره میبینیمت دوست عزیز :)
                    </span>
                    <div className="login__new-member">
                        <span className="login__new-member-text">کاربر جدید هستید؟</span>
                        <Link className="login__new-member-link" href="/register">
                            ثبت نام
                        </Link>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit(loginUser)}>
                        <div className="login-form__username">
                            <input
                                className="login-form__username-input"
                                type="text"
                                placeholder="نام کاربری یا آدرس ایمیل"
                                {...register("username", {
                                    required: "نام کاربری الزامی است",
                                    minLength: { value: 4, message: "حداقل 4 کاراکتر" },
                                    maxLength: { value: 20, message: "حداکثر 20 کاراکتر" },
                                })}
                            />
                            <i className="login-form__username-icon fa fa-user"></i>
                            {errors.username && <p className="error-message">{errors.username.message}</p>}
                        </div>
                        <div className="login-form__password">
                            <input
                                className="login-form__password-input"
                                type="password"
                                placeholder="رمز عبور"
                                {...register("password", {
                                    required: "رمز عبور الزامی است",
                                    minLength: { value: 3, message: "حداقل 3 کاراکتر" },
                                    maxLength: { value: 18, message: "حداکثر 18 کاراکتر" },
                                })}
                            />
                            <i className="login-form__password-icon fa fa-lock-open"></i>
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                        <br />
                        <div className="login-form__password">
                            {/*<ReCAPTCHA*/}
                            {/*    sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'*/}
                            {/*    onChange={() => setIsRecaptchaVerified(true)}*/}
                            {/*/>*/}
                        </div>
                        <button
                            className={`login-form__btn ${(isValid && isRecaptchaVerified) ? '' : 'btn-disable'}`}
                            type="submit"
                            disabled={!isValid || !isRecaptchaVerified || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                                    <span className="login-form__btn-text">در حال ارسال ...</span>
                                </>
                            ) : (
                                <>
                                    <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
                                    <span className="login-form__btn-text">ورود</span>
                                </>
                            )}
                        </button>
                        <div className="login-form__password-setting">
                            <label className="login-form__password-remember">
                                <input className="login-form__password-checkbox" type="checkbox" />
                                <span className="login-form__password-text">مرا به خاطر داشته باش</span>
                            </label>
                            <label className="login-form__password-forget">
                                <a className="login-form__password-forget-link" href="#">
                                    رمز عبور را فراموش کرده‌اید؟
                                </a>
                            </label>
                        </div>
                    </form>
                    <div className="login__des">
                        <span className="login__des-title">سلام کاربر محترم:</span>
                        <ul className="login__des-list">
                            <li className="login__des-item">
                                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده کنید.
                            </li>
                            <li className="login__des-item">ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.</li>
                            <li className="login__des-item">لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
