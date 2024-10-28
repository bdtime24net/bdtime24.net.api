import session from "express-session";


export default (req: any, res: any, next: any) => {
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        name: 'sid',
        proxy: true
    })(req, res, next);
}