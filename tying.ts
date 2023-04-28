export type typeCreateAccount = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};
export type typeSignInAccount = {
    student_number: string;
    password: string;
};
export type typeForgetPassAccount = {
    email: string;
};
export type changePassAccount = {
    password: string;
};

export type userType = {
    user: {
        email: string;
        user_name: string;
        first_name: string;
        last_name: string;
        isVerified: boolean;
        isSignup: boolean;
    };
};

export type typeUser = {
    createdAt: string;
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    profile: {
        url: string;
        id: string;
    };
    role: string;
    status: string;
    student_number: string;
    updatedAt: string;
    _id: string;
    key?: React.Key;
};

export type typePost = {
    comments: [];
    createdAt: string;
    description: string;
    technologies: [string];
    file: {
        url: string;
        type: string;
        id?: string | any;
    };
    liked: [];
    masterId: string;
    status: string;
    title: string;
    updatedAt: string;
    userId: string;
    zip: {
        url: string;
        id?: string | any;
    };
    _id: string;
    saves: [];
    user: typeUser;
};

export type typePropsTechnology = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    itemstechnology?: {
        _id: string;
        name: string;
    }[];
    setItemstechnology?: React.Dispatch<
        React.SetStateAction<
            {
                name: string;
                _id: string;
            }[]
        >
    >;
    info?: any;
    setinfo?: React.Dispatch<React.SetStateAction<{}>>;
};
