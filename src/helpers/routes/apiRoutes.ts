const apiRoutes = {
    auth: {
        user: "/auth/me",
        signUp: "/auth/signup",
        signIn: "/auth/signin",
    },
    post: {
        add:"/post/add",
        all: "/post?skip=1",
        my_project: "/myproject",
        action: {
            like: "/post/like",
            unlike: "/post/unlike",
            bookmark: "/post/addsave",
            unBookmark: "/post/deletesavepost",
            comment: "/post/addcomment",
        },

    },
    user: {
        allUser: "/user/all",
    },
    masters: {
        get_master: "/masters"
    },
    technology: { all: "/list/technology" },
    sheare: {
        sheareAll: "/sheare",
        add: "/sheare/add",
        id: "/sheare/id",
    },
};

export default apiRoutes;
