import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import { findAll, remove } from '../../services/book';
import { useNavigate } from 'react-router-dom';
import ListOfPosts from '../../components/ListOfPosts';

interface post {
  id: string;
  title: string;
  storyline: string;
  url: string;
}

export default function Home() {
  const [posts, setPosts] = useState<post[]>([]);
  const navigate = useNavigate();

  const handleListPost = async () => {

    try {
      const findposts = await findAll();
      setPosts(findposts);
    } catch (error) {
      throw error;
    }
  }

  const handleDelete = async(id: string) => {
    const response = await remove(id);
    console.log(response);
    console.log(response.data);
    console.log(response.status);

    if(response != null && response.status === 204) {
      setPosts(posts.filter(post => post.id !== id));
    }
  }

  const handleUpdate = async(id: string) => {
    navigate(`/update-book/${id}`);
  }

  useEffect(() => {
    handleListPost();
  }, []);
  
  return (
    <Container>
      <ListOfPosts
        key={posts.length}
        posts={posts}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}/>
    </Container>
  );
}