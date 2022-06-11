export const styles = {
  green50: '#F1F8E9',
  green100: '#DCEDC8',
  green200: '#C5E1A5',
  green300: '#AED581',
  green400: '#9CCC65',
  green500: '#8BC34A',
  green600: '#7CB342',
  green700: '#689F38',
  green800: '#558B2F',
  green900: '#33691E',
  greenA100: '#CCFF90',
  greenA200: '#B2FF59',
  greenA400: '#76FF03',
  greenA700: '#64DD17',
  bootstrapGreen: '#28a745',
  red: '#C62828',
  greyTableRow: '#f2f2f2',
  greyTableBorder: '#e2e6e9',
  shadow: '#888888',
  borderRadius: '5px',
  blueInputFocus: 'rgba(0, 127, 255, 0.25)',
  inputBorderColor: 'rgba(0, 0, 0, 0.15)',
  reactSelectOptionColor: '#383838',
};

export const messages = {
  PB_NOT_SIGNED_IN: 'Please sign in to see your personal bests.',
  PB_EMPTY: 'Nothing to display, start by entering a new personal best above.',
  PB_DEL_SUCCESS: 'Personal best deleted successfully!',

  SD_NOT_SIGNED_IN: 'Please sign in to see your speed data.',
  SD_EMPTY: 'Nothing to display, start by entering a new speed record above.',
  SD_DEL_SUCCESS: 'Speed record deleted successfully!',


  SKILL_NOT_SIGNED_IN: 'Please sign in to see your freestyle skills.',
  NOTLEARNT_SKILLS_EMPTY: 'No skills to learn... Add some above!',
  LEARNT_SKILLS_EMPTY: 'Have not learnt any skills, jiayou!',
  SKILLS_EMPTY: 'Nothing to display, start by adding some skills above.',
  SKILL_DEL_SUCCESS: 'Skill deleted successfully!',
  LEARN_SUCCESS: 'Congratulations on learning a new skill!',
  UNLEARN_SUCCESS: 'Oops gonna have to relearn that!',
  SKILL_UPDATE_SUCCESS: 'Skill updated successfully!',

  IG_NOT_SIGNED_IN: 'Please sign in to see your inspiration posts.',
  IG_EMPTY: 'Nothing to display, start by adding some posts above.',
  IG_DEL_SUCCESS: 'Inspiration post deleted successfully!',
};

export const speedEvents = [
  { value: '1x30sec Running Step', label: '1x30sec Running Step' },
  { value: '1x60sec Running Step', label: '1x60sec Running Step' },
  { value: '1x30sec Double Unders', label: '1x30sec Double Unders' },
  { value: '1x60sec Double Unders', label: '1x60sec Double Unders' },
  { value: '1x180sec Running Step', label: '1x180sec Running Step' },
  { value: '1x240sec Running Step', label: '1x240sec Running Step' },
  { value: 'Consecutive Triple Unders', label: 'Consecutive Triple Unders' },
  { value: '2x30sec Double Unders', label: '2x30sec Double Unders' },
  { value: '4x30sec Speed Relay', label: '4x30sec Speed Relay' },
];

export const timingTrackOptions = [
  { value: 'SRSS-1x30sec', label: 'Single Rope Speed Sprints 1x30sec' },
  { value: 'SRDU-2x30sec', label: 'Single Rope Double Unders 2x30sec' },
  { value: 'SRSE-1x180sec', label: 'Single Rope Speed Endurance 1x180sec' },
  { value: 'SRSR-4x30sec', label: 'Single Rope Speed Relay 4x30sec' },
  { value: 'DDSR-4x30sec', label: 'Double Dutch Speed Relay 4x30sec' },
  { value: 'DDSS-1x60sec', label: 'Double Dutch Speed Sprints 1x60sec' },
];

export const freestyleComponent = {
  SKILLSLIST: 'Skills List',
  IGINSPO: 'Media Inspiration',
};

export const freestyleToggleButtons = [
  freestyleComponent.SKILLSLIST,
  freestyleComponent.IGINSPO,
];

export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;
