import session from 'express-session';

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: true,
    name: 'cart_session',
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
});