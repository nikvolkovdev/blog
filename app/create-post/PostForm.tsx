'use client';
import React, { useState } from 'react';

type PostType = 'TECH' | 'TRAVEL' | 'OTHERS';

interface PostImageSendBlock {
    type: 'IMAGE';
    imageFile: File;
    title?: string;
}

interface PostTextSendBlock {
    type: 'TEXT';
    paragraphs: string[];
    title?: string;
}

export type PostSendBlock = PostImageSendBlock | PostTextSendBlock;

interface PostState {
    title: string;
    author: string;
    imageFile: File | null;
    snippet: string;
    views: number;
    category: PostType[];
    blocks: PostSendBlock[];
}

const initialPostState: PostState = {
    title: '',
    author: '',
    imageFile: null,
    snippet: '',
    views: 0,
    category: [],
    blocks: [],
};

const CreatePost = () => {
    const [post, setPost] = useState<PostState>(initialPostState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleBlockChange = (index, field, value) => {
        setPost((prevPost) => {
            const updatedBlocks = [...prevPost.blocks];
            const block = updatedBlocks[index];

            if (block.type === 'IMAGE') {
                updatedBlocks[index] = {
                    ...block,
                    [field]: value,
                };
            } else if (block.type === 'TEXT') {
                updatedBlocks[index] = {
                    ...block,
                    [field]: value,
                };
            }

            return {
                ...prevPost,
                blocks: updatedBlocks,
            };
        });
    };

    const addBlock = (blockType: 'TEXT' | 'IMAGE') => {
        if (blockType === 'TEXT') {
            setPost((prevPost: PostState) => ({
                ...prevPost,
                blocks: [
                    ...prevPost.blocks,
                    {
                        id: Math.random().toString(),
                        type: 'TEXT',
                        paragraphs: [],
                    },
                ],
            }));
        } else if (blockType === 'IMAGE') {
            setPost((prevPost: PostState) => ({
                ...prevPost,
                blocks: [
                    ...prevPost.blocks,
                    {
                        type: 'IMAGE',
                        imageFile: null,
                        title: '',
                    },
                ],
            }));
        }
    };

    const removeBlock = (index) => {
        setPost((prevPost) => ({
            ...prevPost,
            blocks: prevPost.blocks.filter((_, i) => i !== index),
        }));
    };

    const addParagraph = (blockIndex) => {
        setPost((prevPost) => {
            const updatedBlocks = [...prevPost.blocks];
            updatedBlocks[blockIndex].paragraphs.push('');
            return { ...prevPost, blocks: updatedBlocks };
        });
    };

    const handleParagraphChange = (blockIndex, paragraphIndex, value) => {
        setPost((prevPost) => {
            const updatedBlocks = [...prevPost.blocks];
            updatedBlocks[blockIndex].paragraphs[paragraphIndex] = value;
            return {
                ...prevPost,
                blocks: updatedBlocks,
            };
        });
    };

    const handleImageChange = (blockIndex, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (blockIndex === -1) {
                    // Изменение основного изображения
                    setPost((prevPost: PostState) => ({
                        ...prevPost,
                        imageFile: file,
                    }));
                } else {
                    // Изменение изображения блока
                    setPost((prevPost: PostState) => {
                        const updatedBlocks = [...prevPost.blocks];
                        const block = updatedBlocks[blockIndex];

                        if (block.type === 'IMAGE') {
                            updatedBlocks[blockIndex] = {
                                ...block,
                                imageFile: file,
                            };
                        }

                        return {
                            ...prevPost,
                            blocks: updatedBlocks,
                        };
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправка формы
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4"
        >
            <div className="mb-4">
                <label
                    htmlFor="id"
                    className="block text-gray-700 font-bold mb-2"
                >
                    ID
                </label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={post.id}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="title"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="author"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Image
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageChange(-1, e)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="snippet"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Snippet
                </label>
                <input
                    type="text"
                    id="snippet"
                    name="snippet"
                    value={post.snippet}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="views"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Views
                </label>
                <input
                    type="number"
                    id="views"
                    name="views"
                    value={post.views}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="createdAt"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Created At
                </label>
                <input
                    type="text"
                    id="createdAt"
                    name="createdAt"
                    value={post.createdAt}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="category"
                    className="block text-gray-700 font-bold mb-2"
                >
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={post.category}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Select category</option>
                    <option value="TECH">Tech</option>
                    <option value="TRAVEL">Travel</option>
                    <option value="OTHERS">Others</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Blocks</label>
                {post.blocks.map((block, index) => (
                    <div
                        key={block.id}
                        className="mb-4"
                    >
                        {block.type === 'TEXT' && (
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Text Block Title</label>
                                <input
                                    type="text"
                                    value={block.title || ''}
                                    onChange={(e) => handleBlockChange(index, 'title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <label className="block text-gray-700 font-bold mb-2">Text Block Paragraphs</label>
                                {block.paragraphs.map((paragraph, paragraphIndex) => (
                                    <input
                                        key={paragraphIndex}
                                        type="text"
                                        value={paragraph}
                                        onChange={(e) => handleParagraphChange(index, paragraphIndex, e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addParagraph(index)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Add Paragraph
                                </button>
                            </div>
                        )}
                        {block.type === 'IMAGE' && (
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Image Block Title</label>
                                <input
                                    type="text"
                                    value={block.title || ''}
                                    onChange={(e) => handleBlockChange(index, 'title', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input
                                    type="file"
                                    onChange={(e) => handleImageChange(index, e)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => removeBlock(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Remove Block
                        </button>
                    </div>
                ))}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={() => addBlock('TEXT')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Text Block
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock('IMAGE')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                    >
                        Add Image Block
                    </button>
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
