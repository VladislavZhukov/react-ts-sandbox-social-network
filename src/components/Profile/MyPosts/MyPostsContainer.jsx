import { connect } from "react-redux";
import {
  addPost,
} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const mapStateToProps = (state) => {
  return {
    postsData: state.postsPage.postsData,
    newPostText: state.postsPage.newPostText,
  };
};

const mapDispatchToProps = {
  addPost,
};
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
