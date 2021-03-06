import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { isEditAction } from "src/store/actions/interface-action";
import { archiveThunk, removeThunk } from "src/store/thunk/notes-thunk";
import { AppDispatch, Note } from "src/store/types";
const icons = {
  Task: <img src="/img/Task.png" alt="icon" />,
  "Random Thought": <img src="/img/Random.png" alt="icon" />,
  Idea: <img src="/img/Idea.png" alt="icon" />,
};
type RowProp = {
  note: Note;
};
const Row = ({ note }: RowProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  let { list } = useParams();
  return (
    <div className="row">
      <div className="cell">{icons[note.category]}</div>
      <div className="cell">{note.name}</div>
      <div className="cell">{note.created}</div>
      <div className="cell">{note.category}</div>
      <div className="cell">{note.content}</div>
      <div className="cell">{note.dates}</div>
      <div className="cell btnRow">
        <div
          onClick={() => {
            navigate(`/note/${list}/editNote`);
            dispatch({ type: isEditAction, payload: { note } });
            //dispatch({ type: isVisibleAction, payload: { isVisible: true } });
          }}
          className="myBtn edit"
        >
          <img src="/img/edit.png" alt="edit" title="edit" />
        </div>
        <div
          onClick={() => dispatch(archiveThunk({ ...note, archive: !note.archive }))}
          className="myBtn archive"
        >
          <img
            src="/img/archiveBlack.png"
            alt="archive"
            title="add to archive/remove from archive"
          />
        </div>
        <div onClick={() => dispatch(removeThunk(note._id))} className="myBtn delete">
          <img src="/img/binBlack.png" alt="delete" title="delete" />
        </div>
      </div>
    </div>
  );
};

export default Row;
