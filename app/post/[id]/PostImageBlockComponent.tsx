import { ArticleImageBlock } from '@/prisma/seed';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={className}>
            <img
                src={block.src}
                alt={block?.title}
            />
            {block.title && <h5></h5>}
        </div>
    );
};
