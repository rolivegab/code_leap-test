import {
  Button,
  Container,
  inputLabelClasses,
  outlinedInputClasses,
  TextField,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styles from "./Posts.module.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import styled from "@emotion/styled";
import { deletePost, updatePost } from "../../redux/postListSlice";
const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#777777",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#777777",
    },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#000000",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "#777777",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#000000",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#000000",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  },
});

function Post() {
  const postList = useSelector((state) => state.postList);
  const [postToBeDeleted, setPostToBeDeleted] = useState(false);
  const [postToBeEdited, setPostToBeEdited] = useState();
  const [editPostTitle, setEditPostTitle] = useState("");
  const [editPostContent, setEditPostContent] = useState("");
  const postOwner = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  const selectPostToBeDeleted = (idPost) => {
    setPostToBeDeleted(idPost);
  };

  const confirmDelete = () => {
    setPostToBeDeleted(undefined);
    dispatch(deletePost(postToBeDeleted));
  };

  const cancelDeletion = () => {
    setPostToBeDeleted(undefined);
  };

  const selectPostToBeEdited = (idPost) => {
    setPostToBeEdited(idPost);
  };

  const saveEdit = () => {
    dispatch(
      updatePost({ idPost: postToBeEdited, editPostTitle, editPostContent })
    );
    setPostToBeEdited(undefined);
  };

  return (
    <div>
      <div>
        {postList.map((post) => (
          <form key={post.idPost} className={styles.postsForm}>
            <div className={styles.containerTitle}>
              <div className={styles.containerPostTitle}>
                <h4 className={styles.post_Title}>{post.titlePost}</h4>
              </div>
              {postOwner === post.author ? (
                <div className={styles.containerIcons}>
                  <div className={styles.iconsClass}>
                    <DeleteForeverIcon
                      onClick={() => selectPostToBeDeleted(post)}
                    />
                  </div>
                  <div className={styles.iconsClass}>
                    <EditIcon
                      onClick={() => {
                        selectPostToBeEdited(post.idPost);
                        setEditPostTitle(post.titlePost);
                        setEditPostContent(post.postContent);
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className={styles.containernameAndTime}>
              <div className={styles.containerAuthorName}>
                {<p>@{post.author}</p>}
              </div>
              <div className={styles.timePost}>
                <p>{post.date}</p>
              </div>
            </div>
            <Container>
              <TextareaAutosize
                disabled
                aria-label="minimum height"
                minRows={8}
                style={{
                  width: "100%",
                  background: "#FFFFFF",
                  border: "1px solid #777777",
                  boxSizing: "borderBox",
                  borderRadius: "4px",
                  padding: "10px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "400px",
                  fontSize: "16px",
                  lineHeight: "16px",
                  color: "#000000",
                }}
                value={post.postContent}
              />
            </Container>
          </form>
        ))}
      </div>
      {postToBeDeleted ? (
        <div className={styles.bodyDeleteModal}>
          <div className={styles.deleteModal}>
            <div className={styles.deleteConfirmation}>
              <p>Are you sure you want to delete this item?</p>
            </div>
            <div className={styles.deteleBtnBox}>
              <div className={styles.confirmationBtn}>
                <Button onClick={cancelDeletion}>cancelar</Button>
                <Button onClick={confirmDelete}>ok</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {postToBeEdited && (
        <div className={styles.bodyDeleteModal}>
          <div className={styles.editModal}>
            <div className={styles.editConfirmation}>
              <p>Edit item</p>
            </div>
            {/*
            {postList.map((idPost) => (*/}
            <div>
              <StyledTextField
                fullWidth={true}
                variant="outlined"
                label="Title"
                name="name"
                placeholder="Hello world"
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                placeholder="Content here"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  background: "#FFFFFF",
                  border: "1px solid #777777",
                  boxSizing: "borderBox",
                  borderRadius: "4px",
                  padding: "10px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "400px",
                  fontSize: "16px",
                  lineHeight: "16px",
                  color: "#000000",
                }}
                name="postsContent"
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
              />
            </div>
            {/*))}*/}

            <div className={styles.saveBtn}>
              <Button onClick={saveEdit}>save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
