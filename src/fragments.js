export const USER_FRAGEMENT = `
    id
    username
`;

export const COMMNET_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGEMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        caption
        location
        user {
            ${USER_FRAGEMENT}
        }
        comments {
            ${COMMNET_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
    }
`;
