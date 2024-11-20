"use client"

import { useActionState, useEffect, useState } from "react"

export function SignUpForm() {
    const [error, action] = useActionState(signUp, undefined);
    const {errors, validateField } = useFormValidate<TSignUpFormError>(SignUpSchema);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        validateField(name, value);
    }

    useEffect(() => {
        if(error?.errorMessage) {
            renderToStaticMarkup.error(error.errorMessage);
        }
    },[error]);

    return (
        <FormCard
            title="회원가입"
            footer={{ label:"이미 계정이 있으신가요?", href: "/login"}}
        >
            <form action={action} className="space-y-6">
                
            </form>
        </FormCard>
    )
}