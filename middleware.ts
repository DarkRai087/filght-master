import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "http://localhost:3000",
        // signIn: "https://filght.vercel.app/",
        // signIn: "https://bados.vercel.app/",
    }
});

export const config = {
    matcher: [
        // "/home",
        // "/sales",
        // "/driver"
    ]
};