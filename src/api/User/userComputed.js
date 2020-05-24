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
		},
		followingCount: ({ id }) => {
			return prisma
				.usersConnection({ where: { followers_some: { id } } })
				.aggregate()
				.count();
		},
		followersCount: ({ id }) => {
			return prisma
				.usersConnection({ where: { following_some: { id } } })
				.aggregate()
				.count();
		},
		postsCount: ({ id }) => {
			return prisma
				.postsConnection({ where: { user: { id } } })
				.aggregate()
				.count();
		}
	}
};
