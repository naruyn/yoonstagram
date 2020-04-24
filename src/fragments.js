export const COMMNET_FRAGMENT = `
    fragment CommentParts on Comment { 
        id
        text
        user { 
            username 
        }
    }
`;
