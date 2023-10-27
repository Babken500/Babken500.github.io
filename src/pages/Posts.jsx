import React, { useEffect, useState,useRef } from "react";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount} from "../utils/pages";
import MyButton from "../components/UI/Button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


const Posts = function () {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages]=useState(0);
  const [limit,setLimit]=useState(10);
  const [page,setPage]=useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.query.sort, filter.query,);  
  
  const [fetchPosts,isPostsLoading,postError]=useFetching(async(limit,page)=>{
      const response = await PostService.getAll(limit,page);
      setPosts(response.data);
      const totalCount=response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount,limit));
  });

  useEffect(() => {
    fetchPosts(limit,page); 
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
 
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage=(page)=>{
    setPage(page)
    fetchPosts(limit,page)
    
  }

  return (
    <div className="App">      
      <MyButton onClick={() => setModal(true)} style={{ marginTop: 20 }}>Add Post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError &&
        <h1>Error ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display:"flex", justifyContent:"center",marginTop:50}}><Loader/></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post board"/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
      {/* <Posts/> */}
    </div>
  );
};

export default Posts;
