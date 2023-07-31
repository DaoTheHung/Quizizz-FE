import NextAuth from "next-auth/next"
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


export const  authOptions  ={
    providers: [
      FacebookProvider({
        idToken: true,
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    
       
      }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
      ],
      
      
}

export default NextAuth(authOptions)