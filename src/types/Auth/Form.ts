export type SignUpFormData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    repPassword: string;
    student_number: string;
};

export type SignInFormData = {
    student_number: string;
    password: string;
};
