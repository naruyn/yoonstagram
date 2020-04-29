import { prisma } from "../../../generated/prisma-client";

export default {
	User: {
		posts: ({ id }) => prisma.user({ id }).posts(),
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`;
		},
		isFollowing: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			try {
				return prisma.$exists.user({
					AND: [{ id: user.id }, { following_some: { id: parentId } }]
				});
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		isSelf: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			return user.id === parentId;
		}
	}
};
