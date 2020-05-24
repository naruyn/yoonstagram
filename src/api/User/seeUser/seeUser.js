import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
	Query: {
		seeUser: async (_, args, { request }) => {
			isAuthenticated(request);
			const { username } = args;
			return prisma.user({ username });
		}
	}
};
