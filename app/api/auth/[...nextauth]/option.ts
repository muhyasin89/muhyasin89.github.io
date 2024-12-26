import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your github username"
                },
                password: { label: "Password", type: "password", placeholder: "your github pasword" }
            },
            async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                const res = await fetch(process.env.BACKEND_API+"/your/endpoint", {
                  method: 'POST',
                  body: JSON.stringify(credentials),
                  headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
          
                // If no error and we have user data, return it
                if (res.ok && user) {
                  return user
                }
                // Return null if user data could not be retrieved
                return null          
            
            }
          })
    ],
 
    
}