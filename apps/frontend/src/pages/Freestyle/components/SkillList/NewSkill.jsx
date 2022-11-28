import React from "react";
import { TextField } from "@mui/material";
import { JumpalFormControl } from "../../../../components/JumpalCommon.tsx";
import useNewSkillController from "./useNewSkillController";
import JumpalModal from "../../../../components/JumpalModal";

export default function NewSkill() {
  const [
    open,
    toggleNewSkill,
    handleSkillNameChange,
    handleProgressChange,
    handleUrlChange,
    submitEntry,
  ] = useNewSkillController();

  return (
    <JumpalModal
      isOpen={open}
      openButtonText="Add New Skill"
      onToggle={toggleNewSkill}
      title="New Freestyle Skill"
      onSubmit={submitEntry}
    >
      <JumpalFormControl>
        <TextField
          label="Skill Name"
          placeholder="Enter Skill Name"
          onChange={handleSkillNameChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
      </JumpalFormControl>
      <JumpalFormControl>
        <TextField
          label="Progress"
          placeholder="Describe your progress"
          onChange={handleProgressChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </JumpalFormControl>
      <JumpalFormControl>
        <TextField
          label="URL"
          placeholder="Enter url to video of skill"
          onChange={handleUrlChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </JumpalFormControl>
    </JumpalModal>
  );
}
