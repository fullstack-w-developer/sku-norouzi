const apiRoutes = {
    auth: {
        user: "/auth/me",
        signUp: "/auth/signup",
        signIn: "/auth/signin",
    },
    post:{
        all:"/post?skip=1",
        action:{
            like:"/post/like",
            unlike:"/post/unlike",
            bookmark:"/post/addsave",
            unBookmark:"/post/deletesavepost"
        }
    }
};

export default apiRoutes;
