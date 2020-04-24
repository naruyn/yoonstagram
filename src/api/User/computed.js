import { prisma } from "../../../generated/prisma-client";

export default {
	User: {
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`;
		},
		amIFollowing: async (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				return await prisma.$exists.user({
					AND: [{ id: user.id }, { following_some: { id: parentId } }]
				});
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		itsMe: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			return user.id === parentId;
		}
	}
};
