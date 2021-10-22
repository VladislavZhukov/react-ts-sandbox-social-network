import { connect } from "react-redux";
import {
  addPost,
} from "../../../redux/profile-reducer";
import { AppStateT } from "../../../redux/store-redux";
import { PostsDataT } from "../../../types/types";
import MyPosts from "./MyPosts";

type MapStateToPropsT = {
  postsData: Array<PostsDataT>
  newPostText: string | null
}
type MapDispatchPropsT = {
  addPost: (myNewPost: string) => void
}

const mapStateToProps = (state: AppStateT): MapStateToPropsT => {
  return {
    postsData: state.postsPage.postsData,
    newPostText: state.postsPage.newPostText,
  };
};

const mapDispatchToProps: MapDispatchPropsT = {
  addPost
}
const MyPostsContainer = connect<MapStateToPropsT, MapDispatchPropsT, {}, AppStateT>(
  mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
