import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
	Mutation: {
		toggleFollow: async (_, args, { request }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			try {
				const existingFollow = await prisma.$exists.user({
					AND: [
						{
							id: user.id
						},
						{
							following_some: {
								id: id
							}
						}
					]
				});
				console.log(id, user.id);
				console.log(existingFollow);
				if (existingFollow) {
					await prisma.updateUser({
						where: {
							id: user.id
						},
						data: {
							following: {
								disconnect: {
									id
								}
							}
						}
					});
				} else {
					await prisma.updateUser({
						where: {
							id: user.id
						},
						data: {
							following: {
								connect: {
									id
								}
							}
						}
					});
				}
				return true;
			} catch (error) {
				return false;
			}
		}
	}
};
