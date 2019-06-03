import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_, agrs) => {
            const { email } = agrs;
            const loginSecret = generateSecret();
            console.log(loginSecret, email);
            try {
                await prisma.updateUser({data: { loginSecret }, where: { email }});
                return true;
                
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
}