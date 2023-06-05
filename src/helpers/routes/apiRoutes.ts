const apiRoutes = {
    auth: {
        user: "/auth/me",
        signUp: "/auth/signup",
        signIn: "/auth/signin",
    },
    post: {
        add: "/post/add",
        all: "/post?skip=1",
        post_waitong_master: "/masters/waitpost",
        editPost_by_master: "/masters/verifypost",
        my_project: "/myproject",
        save_post: "/post/savepost",
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
    technology: { all: "/list/technology", add: "/list/technology/add", delete: "/list/technology/delete", update: "/list/technology/update" },
    sheare: {
        sheareAll: "/sheare",
        add: "/sheare/add",
        id: "/sheare/id",
    },
};

export default apiRoutes;
