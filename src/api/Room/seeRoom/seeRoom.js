import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
	Query: {
		seeRoom: async (_, args, { request }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			const canSee = prisma.$exists.room({
				AND: [
					{
						participants_some: {
							id: user.id
						}
					},
					{
						id
					}
				]
			});

			if (canSee) {
				return prisma.room({ id });
			} else {
				throw Error("You can't see this room!");
			}
		}
	}
};
