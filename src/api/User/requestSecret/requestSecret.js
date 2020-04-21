import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_, agrs) => {
            const { email } = agrs;
            const loginSecret = generateSecret();
            
            try {
                await prisma.updateUser({data: { loginSecret }, where: { email }});
                sendSecretMail(email, loginSecret);
                return true;
                
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
}