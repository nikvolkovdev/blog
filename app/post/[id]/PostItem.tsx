import React from 'react';
import { ArticleBlock, ArticleBlockType, Post } from '/prisma/seed';
import { ArticleImageBlockComponent } from '/app/post/[id]/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '/app/post/[id]/ArticleTextBlockComponent';

const ArticleItem = (post: Post) => {
    const renderBlock = (block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent
                        key={block.id}
                        block={block}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent
                        key={block.id}
                        block={block}
                    />
                );
            default:
                return null;
        }
    };

    return <div>{post?.blocks.map(renderBlock)}</div>;
};

export default ArticleItem;
