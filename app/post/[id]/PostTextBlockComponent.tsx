import { ArticleTextBlock } from '@/prisma/seed';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={className}>
            {block.title && <h4>{block.title}</h4>}
            {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    );
};
